 const response= (_success, _message, _payload = {}, _redirectUri = "")=>{
    return {
        success: _success,
        message: _message,
        payload: _payload,
        redurectUri: _redirectUri
    }
}
module.exports={response}

