import { Usuario } from '../../entities/Usuario.js'
import db from '../../database/dataSource.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ApiError } from '../../middlewares/ApiError.js'

type RespostaAutenticacaoUsuario = {
  id: string
  nome: string
  email: string
  token: string
}

export default async (
  email: string,
  senha: string
): Promise<RespostaAutenticacaoUsuario | Error> => {
  const repo = db.getRepository(Usuario)
  const usuario = await repo.findOneBy({
    email,
  })
  if (usuario) {
    if (!(await compare(senha, usuario.senha))) {
      throw new ApiError(400, 'Senha incorreta')
    }
    const token = jwt.sign(
      { nome: usuario.nome, id: usuario.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '720h',
      }
    )
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token,
    }
  } else {
    throw new ApiError(400, 'Email não cadastrado')
  }
}
