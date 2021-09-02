const url = "http://localhost:5000/"

const tokenVerified = async (req, res, next) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { token: req.headers["Authorization"] }
        }
        const resp = await fetch(`${url}/tokens/authenticate`, options)
        if (resp.status !== 200) {
            throw new Error()
        }
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}

module.exports = {tokenVerified};