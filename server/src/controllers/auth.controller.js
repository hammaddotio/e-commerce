import { generateTokens } from '../utils/jwt.js';
import { User } from './../models/user.model.js';
import NodeCache from 'node-cache'

const nodeCache = new NodeCache()


export const userRegister = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'Invalid request body' })

        const { username, email, password } = req.body

        if (!username) return res.status(400).json({ message: 'username is require' })
        if (!email) return res.status(400).json({ message: 'email is require' })
        if (!password) return res.status(400).json({ message: 'password is require' })

        const existUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existUser) return res.status(400).json({ message: 'user already exist plz login' })

        const user = await User.create({ username, email, password })

        return res.status(201).json({ message: 'user register successfully', user, success: true })
    } catch (err) {
        res.status(500).json({
            message: `user registration fail`,
            success: false,
            error: err.message
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).json({ message: 'invalid user details' })

        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ message: 'user not found' })

        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if (!isPasswordCorrect) return res.status(400).json({ message: 'invalid user details' })

        const { access_token } = await generateTokens(user._id)

        return res.status(200).json(
            {
                message: 'user login successfully',
                user: { _id: user._id, username: user.username, email: user.email, role: user.role },
                success: true,
                access_token
            }
        )
    } catch (err) {
        res.status(500).json({
            message: `user login fail`,
            success: false,
            error: err.message
        })
    }
}

export const userUpdate = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'Invalid request body' })

        const { username, email, role, address } = req.body
        const { id } = req.params

        const user = await User.findOneAndUpdate(
            { _id: id },
            { username, email, role, address },
            { new: true }
        )
        nodeCache.del('users')

        return res.status(201).json({ message: 'user updated successfully', user, success: true })
    } catch (err) {
        res.status(500).json({
            message: `user update failed`,
            success: false,
            error: err.message
        })
    }
}

export const userProfileUpdate = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'Invalid request body' })

        const { username, email, role, password, address } = req.body
        const id = req.userId
        const userFind = await User.findById(id)

        // const isPasswordCorrect = await userFind.isPasswordCorrect(password)
        // if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid user details' })

        if (password) {
            userFind.password = password
            userFind.save({ validateBeforeSave: false })
        }

        const user = await User.findByIdAndUpdate(
            id,
            { username, email, role, address },
            { new: true }
        )

        nodeCache.del('users')

        return res.status(201).json({
            message: 'user updated successfully',
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                address: user.address
            },
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: `user update failed`,
            success: false,
            error: err.message
        })
    }
}

export const userProfile = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
            .select('-password -__v -access_token -updatedAt -createdAt')
        res.status(200).json({
            user,
            message: 'successfully',
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: `route reserved`,
            success: false,
            error: err.message
        })
    }
}

export const checkUser = async (req, res) => {
    nodeCache.del('user')
    res.status(200).json({ ok: true })
}

export const checkAdmin = async (req, res) => {
    nodeCache.del('users')
    res.status(200).json({ ok: true })
}

export const forgetPassword = async (req, res) => {
    try {
        nodeCache.del('users')
        res.status(200).json({
            user: req.user,
            message: 'successfully',
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: `route reserved`,
            success: false,
            error: err.message
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) return res.status(404).json({ message: 'users not found' })

        if (nodeCache.has('users')) {
            return res.status(200).json({
                success: true,
                message: 'users getting successfully',
                users: JSON.parse(nodeCache.get('users'))
            })
        }

        nodeCache.set('users', JSON.stringify(users))
        res.status(200).json({
            success: true,
            message: 'users getting successfully',
            users
        })
    } catch (err) {
        res.status(500).json({
            message: 'users getting  failed',
            success: false,
            error: err.message
        })
    }
}

export const singleUser = async (req, res) => {
    try {
        const { name } = req.params
        const user = await User.findOne({ username: name })
        if (!user) return res.status(404).json({ message: 'user not found' })

        return res.status(200).json({
            success: true,
            message: 'user getting successfully',
            user
        })
    } catch (err) {
        res.status(500).json({
            message: 'user getting  failed',
            success: false,
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const userExist = await User.findOne({ _id: id })
        if (!userExist) return res.status(404).json({ message: 'user not found' })

        nodeCache.del('users')

        const user = await User.findByIdAndUpdate(
            { _id: userExist._id },
            { is_active: false },
            { new: true }
        )

        res.status(200).json({
            message: `${user.username} is deleted successfully `,
            success: true,
            user
        })

    } catch (err) {
        res.status(500).json({
            message: 'user deleting failed',
            success: false,
            error: err.message
        })
    }
}