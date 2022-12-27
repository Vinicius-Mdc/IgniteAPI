import { registroUsuario } from '../controllers/Usuario/RegistroUsuario'
import { autenticacaoUsuario } from '../controllers/Usuario/AutenticacaoUsuario'
import { Router } from 'express'
import {
  EMAIL_REDEFINIR_SENHA,
  LOGIN,
  REGISTRO,
  validacao,
} from '../validations/usuario.validation'
import { redefinicaoDeSenha } from '../controllers/Usuario/RedefinirSenha'
import { enviarEmailRedefinicaoDeSenha } from '../controllers/Usuario/EnviarEmailRedefinirSenha'

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
