import { Usuario } from '../../entities/Usuario'
import db from '../../database/dataSource'
import { verify } from 'jsonwebtoken'
import { genSaltSync, hash } from 'bcrypt'
import { ApiError } from '../../middlewares/ApiError'

type RespostaSolicitacaoUsuario = {
  mensagem: string
}

export default async (
  token: string,
  senha: string
): Promise<RespostaSolicitacaoUsuario | Error> => {
  const repo = db.getRepository(Usuario)
  const decodedToken = verify(token, process.env.RESET_PASSWORD_SECRET)
  if (typeof decodedToken !== 'string') {
    const usuario = await repo.findOneBy({
      id: decodedToken.id,
    })
    if (usuario?.tokenRedefinirSenha !== token) {
      throw new ApiError(401, 'Token inválido ou expirado')
    }
    if (usuario) {
      repo.save({
        ...usuario,
        senha: await hash(senha, genSaltSync(10)),
        tokenRedefinirSenha: null,
      })
    }
  }

  return {
    mensagem: 'Senha atualizada com sucesso',
  }
}
