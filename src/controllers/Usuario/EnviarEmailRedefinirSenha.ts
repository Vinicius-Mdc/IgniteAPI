import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../../middlewares/ApiError'
import enviarEmailRedefinirSenha from '../../services/Usuario/EnviarEmailRedefinirSenha'

export const enviarEmailRedefinicaoDeSenha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(ApiError.badRequest(errors.array()[0].msg))
    return
  }
  const { email } = req.body
  try {
    const resposta = await enviarEmailRedefinirSenha(email)
    res.json(resposta)
  } catch (e) {
    console.log(e)
    next(e)
  }
}
