import { body } from 'express-validator'

export const LOGIN = 'login'
export const REGISTRO = 'registro'
export const EMAIL_REDEFINIR_SENHA = 'emailRedefinirSenha'
export const REDEFINIR_SENHA = 'redefinirSenha'

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 20

export const validacao = (method: string) => {
  switch (method) {
    case LOGIN:
      return [
        body('email', 'Email inválido').exists().isEmail(),
        body('senha', 'Senha inválida').exists().isLength({
          min: MIN_PASSWORD_LENGTH,
          max: MAX_PASSWORD_LENGTH,
        }),
      ]
    case REGISTRO:
      return [
        body('nome', 'Nome inválido').exists().notEmpty(),
        body('email', 'Email inválido').exists().isEmail(),
        body('senha', 'Senha inválida').exists().isLength({
          min: MIN_PASSWORD_LENGTH,
          max: MAX_PASSWORD_LENGTH,
        }),
      ]
    case EMAIL_REDEFINIR_SENHA:
      return [body('email', 'Email inválido').exists().isEmail()]
    case REDEFINIR_SENHA:
      return [
        body('token', 'Token inválido').exists(),
        body('senha', 'Senha inválida').exists().isLength({
          min: MIN_PASSWORD_LENGTH,
          max: MAX_PASSWORD_LENGTH,
        }),
      ]
    default:
      return []
  }
}
