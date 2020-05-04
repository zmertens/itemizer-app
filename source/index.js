/**
 * A simple item list tracking tool
 */

 const itemizerApp = require('./itemizer-app')

 itemizerApp('Stuff').then((result) => {
     console.log(`result: ${result}`)
 }).catch((err) => {
     console.error(err)
 })