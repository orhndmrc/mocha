const axios = require('axios').default
const result = require('./test-results.json')
import SlackReporter from "@moroo/wdio-slack-reporter";

exports.config = {
  runner: 'local',
  path: '/',
  capabilities: [
    {
      // Set maxInstances to 1 if screen recordings are enabled:
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        // Disable headless mode if screen recordings are enabled:
        args: ['--disable-gpu', '--window-size=1920,1080', '--disable-extensions',
          '--proxy-bypass-list=*', '--start-maximized', '--disable-dev-shm-usage', '--no-sandbox',
          '--ignore-certificate-errors', '--disable-background-networking'],
        prefs: {
          'download.default_directory': global.downloadDir
        }
      }
    }
  ],
  logLevel: 'error',
  reporters: ['spec', ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }],
    ['json', {
      outputDir: './',
      outputFileFormat: function () {
        return `test-results.json`
      }
    }], 
    ['mochawesome',{
      outputDir: './',
      outputFileFormat: function(opts) { 
          return `mochawesome.json`
      }
    }]
  ],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    require: [],
    bail: 0
  },
  services: [
    ['chromedriver']
  ],
  specs: ['./test/*.js'],
  maximizeWindow: true,
  screenshots: {
    saveOnFail: true
  },
  videos: {
    enabled: false,
    resolution: '1440x900',
    startDelay: 500,
    stopDelay: 500

  },
  baseUrl: 'https://demoqa.com/books',
  waitforTimeout: 10000,
  
//   onComplete: async function () {
//    // await browser.pause(5000)
//     let testInfo = function () {
//       let arr = []
//       let list = {}
//       let arr2 = []
//       for (let suite of result.suites) {
//         //console.log(suite.tests)
//         for (let test of suite.tests) {
//           if (test.state === 'passed') {
//             arr.push(` ${test.name} - :white_check_mark: `)

//           }
//           else if (test.state === 'failed') {
//             arr.push(`${test.name} - :x: `)

//           }
//           else if (test.state === 'skipped') {
//             arr.push(`${test.name} : :double_vertical_bar: `)

//           }



//         }
//         list = { Suite: suite.name, Test: arr }

//         arr2.push(list)
//         arr = []



//       }
//       return arr2

//     }
//     //${JSON.stringify(testInfo(), null, 3)}\n
//     let text = ` :rocket: Integration Test Result -UI
//     \n:white_check_mark:Passed: ${result.state.passed}
//     \n:x:Fail: ${result.state.failed}\n:double_vertical_bar:Skipped: ${result.state.skipped}
//     \nFollow the link to see the execution details : <https://github.com/biobright/webdriverio-test/actions>
//     \n:checkered_flag:`
//     try {
//       await axios.post('https://hooks.slack.com/services/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',
//         {
//           text: text
//         }
//       )
//     }
//     catch (err) {
//       console.log(err.response.message)
//     }
//     //await SlackReporter.send({title: 'hi'})
//   }
 }

