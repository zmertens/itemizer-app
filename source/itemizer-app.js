
const itemizerApp = async (str) => {
    return new Promise((resolve, reject) => {
        if ((Math.random() * (10 - 5) + 5) % 2 > 2) {
            return reject("we have problems, mr robinson")
        }
        resolve(str + '\r\nwaffles')
    })
}

module.exports = itemizerApp