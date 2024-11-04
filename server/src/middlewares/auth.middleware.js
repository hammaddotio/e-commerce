import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const tokenCheck = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) return res.status(400).send({ message: 'access token not found' })

        const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded_token._id
        next()
    } catch (err) {
        res.status(500).send({
            message: `token validation failed`,
            success: false,
            error: err.message
        })
    }
}

export const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        if (!user) return res.status(400).send({ message: 'unauthorized user' })
        if (!user.role) return res.status(400).send({ message: 'only admin can access this route' })
        next()
    } catch (err) {
        res.status(500).send({
            message: `token validation failed`,
            success: false,
            error: err.message
        })
    }
}