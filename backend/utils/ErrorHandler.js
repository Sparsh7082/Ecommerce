// extends means take the properties from the parent
// constructor calls very first
// super method used for constructor of parent class

class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor)  // gives the console error
    }
}

module.exports = ErrorHandler