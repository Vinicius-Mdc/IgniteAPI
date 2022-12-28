import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../../middlewares/ApiError.js'
import AutenticarUsuario from '../../services/Usuario/AutenticarUsuario.js'

export const autenticacaoUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(ApiError.badRequest(errors.array()[0].msg))
    return
  }
  const { email, senha } = req.body
  try {
    const resposta = await AutenticarUsuario(email, senha)
    res.json(resposta)
  } catch (e) {
    next(e)
  }
}
