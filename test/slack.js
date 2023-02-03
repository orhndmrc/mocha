const axios = require('axios').default
//const result = require('../test-results.json')
const color = require('chalk');
const expect = require('chai').expect

const fail = color.red;
const test = color.blue
//const result = color.yellow
const pass = color.green;
    
describe('Slack API', () => {
    
    it('should send see test result in test rail - C3', async()=>{
        await browser.url('https://goggle.com')
    })

    it('should work around - C4', async()=>{
        expect(1+1).to.eq(2)
    })

    it('Subtraction', async()=>{
        expect(1-3).to.eq(-2)
    })

    
describe('Suite 2', () => {
    
    it('Parse data', async()=>{
        //console.log(testInfo())
    })

    it.skip('Addition', async()=>{
        expect(1+1).to.eq(5)
    })

    it('Subtraction', async()=>{
        expect(1-3).to.eq(5)
    })


});
})
