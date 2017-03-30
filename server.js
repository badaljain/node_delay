/*
The below method takes message and secs as params and returns a promise after desired seconds
*/
const result = []

const formatMessage = (msg, secs) => {
	return msg + ' by ' + secs + ' secs'
}

const delayMessage = (msg, secs) => {
	return new Promise((resolve, reject) => {
		const message = formatMessage(msg, secs)
		setTimeout(() => { resolve(message) }, secs*1000)
	})
}

//Async method returns the execution back to executeMethod once awaiting starts
const doubleDelay = async (msg1, delay1, msg2, delay2) => {
	//Waits for the displayMessage to complete before proceeding
	return await delayMessage(msg1, delay1)
	.then(data=>{
		result.push(data)
		return delayMessage(msg2, delay2)
		.then(data2 => {
			result.push(data2)
			return result
		})
	})
}

//Dimple display method
const display = (msg) => {
	console.log(msg)
}

//The test method that executed according to requirements
const execute = () => {
	display('Execution starts')

	//After the promise id returned, the message is displayed to the console
	// Waits here for 2 seconds
	delayMessage("Promise resolved", 2).then(result=>display(result))

	//Displays the firs and second message in sequence, as we are awaiting on the delayMessage to finish
	
	doubleDelay('First Message', 5, 'Second Message', 2).then(result=>display(result))
	//This is displayed after the execution starts as the delayMessage returns a promise
	// and the execution returns to the execute method
	display('Execution end - (not actually)')
}

execute()

module.exports = {
  delayMessage: delayMessage,
  doubleDelay: doubleDelay,
  formatMessage: formatMessage
}