import { User } from "../models/user.model.js"

export const generateTokens = async (userId) => {
    const user = await User.findOne({ _id: userId })

    const access_token = await user.generateAccessToken()
    user.access_token = access_token
    await user.save()

    return { access_token }

}