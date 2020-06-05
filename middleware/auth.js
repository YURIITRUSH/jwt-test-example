const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    if (!req.header('Authorization')) {
        return res.status(403).send({ error: 'Premissions denied' })
    }
    const token = req.header('Authorization').replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_KEY, async (err , data) => {
        if (err) {
            return res.status(401).send();
        }
        try {
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    })
    
}
module.exports = auth