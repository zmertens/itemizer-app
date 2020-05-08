/**
 * A simple item list tracking tool
 */

 const itemizerApp = require('./itemizer-app')

const port = process.env.PORT

itemizerApp.listen(port, () => {
    console.debug(`Server is running on port: ${port}`)
})