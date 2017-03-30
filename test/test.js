const server = require('../server.js')
const assert = require('assert');


describe('delayMessage()', ()=>{
	it ('should return a promise with desired message', async () => {
		const message = 'my message'
		const delay = 1
		const resultMsg = server.formatMessage(message, delay)
		console.time('execution time')
		await server.delayMessage(message, delay).then((result) => {
            assert.equal(result,resultMsg);
            console.timeEnd('execution time')
	    })
	})
})

describe('doubleDelay()', ()=> {
	it('should check if the messages returned are in order', async () => {
		const msg1 = 'First Message'
		//delay 1 is secs
		const delay1 = 1
		const msg2 = 'Secong Message'
		//delay 2 in secs
		const delay2 = .5

		const resultArr = [server.formatMessage(msg1, delay1), server.formatMessage(msg2, delay2)]
		console.time('execution time')
		await server.doubleDelay(msg1, delay1, msg2, delay2).then((result) => {
            assert.equal(result[0],resultArr[0])
            assert.equal(result[1],resultArr[1])
            console.timeEnd('execution time')
	    })
	})
})