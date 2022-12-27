import { registroUsuario } from '../controllers/Usuario/RegistroUsuario'
import { autenticacaoUsuario } from '../controllers/Usuario/AutenticacaoUsuario'
import { Router } from 'express'
import { LOGIN, REGISTRO, validacao } from '../validations/usuario.validation'

const router = Router()

router.post('/registro', validacao(REGISTRO), registroUsuario)
router.post('/login', validacao(LOGIN), autenticacaoUsuario)

export default router
