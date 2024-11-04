import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'


export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/api/v1', userRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', orderRouter)
