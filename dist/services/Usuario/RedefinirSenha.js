import { Usuario } from '../../entities/Usuario.js';
import db from '../../database/dataSource.js';
import jwt from 'jsonwebtoken';
import { genSaltSync, hash } from 'bcrypt';
import { ApiError } from '../../middlewares/ApiError.js';
export default async (token, senha) => {
    const repo = db.getRepository(Usuario);
    const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    if (typeof decodedToken !== 'string') {
        const usuario = await repo.findOneBy({
            id: decodedToken.id,
        });
        if (usuario?.tokenRedefinirSenha !== token) {
            throw new ApiError(401, 'Token inválido ou expirado');
        }
        if (usuario) {
            repo.save({
                ...usuario,
                senha: await hash(senha, genSaltSync(10)),
                tokenRedefinirSenha: null,
            });
        }
    }
    return {
        mensagem: 'Senha atualizada com sucesso',
    };
};
