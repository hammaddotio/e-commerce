import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        return await connect(process.env.DB_URL);
    } catch (err) {
        console.log(`DB Connection Err: ${err.message}`)
    }
}