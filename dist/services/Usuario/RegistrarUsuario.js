import { Usuario } from '../../entities/Usuario.js';
import db from '../../database/dataSource.js';
import { genSaltSync, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../middlewares/ApiError.js';
export default async (nome, email, senha) => {
    const repo = db.getRepository(Usuario);
    if (await repo.findOneBy({
        email,
    })) {
        throw new ApiError(400, 'Email já cadastrado');
    }
    const usuario = new Usuario(nome, email, await hash(senha, genSaltSync(10)));
    await repo.insert(usuario);
    const token = jwt.sign({ nome, id: usuario.id }, process.env.JWT_SECRET, {
        expiresIn: '720h',
    });
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token,
    };
};
