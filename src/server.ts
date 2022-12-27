import 'reflect-metadata'
import './database/dataSource'
import 'dotenv/config'
import * as express from 'express'
import userRouter from './routes/usuario'

const app = express()

app.use(require('cors')())
app.disable('x-powered-by')
app.use(express.json())

app.use('/usuario', userRouter)

// eslint-disable-next-line no-unused-vars
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err.sql) {
      res.status(500).json({ error: 'Algo deu errado.' })
    } else {
      res.status(err.code).json({ message: err.message })
    }
  }
)
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT || 3000}`)
})
