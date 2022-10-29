const auth = require('../auht')

const validateRole = (req, res, next) => {
    if (!auth.admin) {
        res.json({
            msg: "Non Authorized"
        })
    } else {
        next()
    }
}

module.exports = validateRole;