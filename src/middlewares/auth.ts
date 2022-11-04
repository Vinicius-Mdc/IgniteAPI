import { NextFunction, Request, Response } from 'express'
import { decode, JwtPayload } from 'jsonwebtoken'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token?.toString()
    if (!token) {
      res.status(401).send({ message: 'Nenhum token encontrado' })
      return
    }
    const decodedToken = decode(token) as JwtPayload
    if (decodedToken) {
      res.locals.uid = decodedToken.uid
      next()
    }
  } catch (e) {
    return res
      .status(401)
      .send({ message: 'Não foi possível decodificar o token' })
  }
}
