import 'reflect-metadata'
import './database/dataSource.js'
import 'dotenv/config'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import userRouter from './routes/usuario.js'

const app = express()

app.use(cors())
app.disable('x-powered-by')
app.use(express.json())

app.use('/usuario', userRouter)

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.sql) {
    res.status(500).json({ error: 'Algo deu errado.' })
  } else {
    res.status(err.code || 500).json({ message: err.message })
  }
})
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT || 3000}`)
})
