class appError {

    constructor(message,statusCode = 400){
        this.message = message,
        this.statusCode = statusCode
    }

}


module.exports = appError