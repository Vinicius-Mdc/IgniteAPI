import { registroUsuario } from '../controllers/Usuario/RegistroUsuario.js'
import { autenticacaoUsuario } from '../controllers/Usuario/AutenticacaoUsuario.js'
import { Router } from 'express'
import {
  EMAIL_REDEFINIR_SENHA,
  LOGIN,
  REGISTRO,
  validacao,
} from '../validations/usuario.validation.js'
import { redefinicaoDeSenha } from '../controllers/Usuario/RedefinirSenha.js'
import { enviarEmailRedefinicaoDeSenha } from '../controllers/Usuario/EnviarEmailRedefinirSenha.js'

const router = Router()

router.post('/registro', validacao(REGISTRO), registroUsuario)
router.post('/login', validacao(LOGIN), autenticacaoUsuario)
router.post(
  '/enviarEmailRedefinirSenha',
  validacao(EMAIL_REDEFINIR_SENHA),
  enviarEmailRedefinicaoDeSenha
)
router.post('/redefinirSenha', redefinicaoDeSenha)
export default router
