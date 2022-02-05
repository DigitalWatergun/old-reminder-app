import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token === null ) {
        return res.sendStatus(401).send("No token found.")
    } 

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403);
            if (err.message.includes("expire")) {
                return res.send("Your access token has expired")
            } else {
                return res.send(err.message)
            }
        } else {
            req.user = user
            next()
        }
    })
}

export { authenticateToken }