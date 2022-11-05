const User = require('../model/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    console.log(`authorization: ${authorization}`)

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else request.token = null

    next()
}

const userExtractor = async (request, response, next) => {
    console.log("is token presnet", request.token)

    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
        if (!decodedToken.id){
            return response.status(401).json({ error: 'token missing or invalid'})
          }
      
        request.user = await User.findById(decodedToken.id)
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({
            error: 'Unauthorized'
        })
    }
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}