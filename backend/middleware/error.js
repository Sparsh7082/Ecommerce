const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    if(err.name === "CastError"){
        const message = `resource not found with this id`;
        err = new ErrorHandler(message, 400)
    }

    if(err.code === 11000){
        const message = 'Duplicate key'
        err = new ErrorHandler(message,400)
    }

    if(err.name === 'JsonWebTokenError'){
        const message = 'your url is invalid'
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

// CastError = when we are sending id (1234) but the mongoose accept uuid then because of mismatch it will give the cast error