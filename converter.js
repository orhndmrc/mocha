
const webdriverIOJson = require('./output/test-results.json')
const fs = require('fs');
let duration = 0
let tests = []
let pending = []
let failures = []
let passes = []
for (let suite of webdriverIOJson.suites) {
  duration+=suite.duration
  for (let test of suite.tests) {
    let testObj, pendingObj, failureObj,passObj
    if(test.state == 'skipped'){
      pendingObj = {
        "title": test.name,
        "fullTitle": suite.name+" "+test.name,
        "file": webdriverIOJson.specs[0],
        "currentRetry": 0,
        "err": {}
      }
      pending.push(pendingObj)
    }
    if(test.state == 'failed'){
      failureObj =  {
        "title": test.name,
        "fullTitle": suite.name+" "+test.name,
        "file": webdriverIOJson.specs[0],
        "duration": test.duration,
        "currentRetry": 0,
        "err": {
          "message": test.error,
          "showDiff": true,
          "actual": "",
          "expected": "",
          "stack": test.standardError
        }
      }
      failures.push(failureObj)
    }
    if(test.state == 'passed'){
      passObj =  {
        "title": test.name,
        "fullTitle": suite.name+" "+test.name,
        "file": webdriverIOJson.specs[0],
        "duration": test.duration,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
      passes.push(passObj)
    }
    if(test.error){
      testObj =  {
        "title": test.name,
        "fullTitle": suite.name+" "+test.name,
        "file": webdriverIOJson.specs[0],
        "duration": test.duration,
        "currentRetry": 0,
        "speed": "fast",
        "err": {
          "message": test.error,
          "showDiff": true,
          "actual": "",
          "expected": "",
          "stack": test.standardError
        }
      }
      tests.push(testObj)
    }
    else{
      testObj =  {
        "title": test.name,
        "fullTitle": suite.name+" "+test.name,
        "file": webdriverIOJson.specs[0],
        "duration": test.duration,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
      tests.push(testObj)
    }
  }
}

let template = {
    "stats": {
      "suites": webdriverIOJson.suites.length,
      "tests": webdriverIOJson.state.failed + webdriverIOJson.state.passed + webdriverIOJson.state.skipped,
      "passes": webdriverIOJson.state.passed,
      "pending": webdriverIOJson.state.skipped,
      "failures": webdriverIOJson.state.failed,
      "start": webdriverIOJson.start,
      "end": webdriverIOJson.end,
      "duration": duration
    },
    "tests": tests,
    "pending": pending,
    "failures": failures,
    "passes": passes
  }

  const jsonString = JSON.stringify(template)
fs.writeFile('convert.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})