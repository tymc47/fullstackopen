require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl = process.env.MONGODB_URL

module.exports = {
    PORT,
    mongoUrl
}