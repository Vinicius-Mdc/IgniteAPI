import { Usuario } from '../../entities/Usuario.js';
import db from '../../database/dataSource.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../middlewares/ApiError.js';
import { createTransport } from 'nodemailer';
export default async (email) => {
    const repo = db.getRepository(Usuario);
    const usuario = await repo.findOneBy({
        email,
    });
    if (usuario) {
        const token = jwt.sign({ id: usuario.id }, process.env.RESET_PASSWORD_SECRET, {
            expiresIn: '1h',
        });
        console.log(token.length);
        const a = await repo.save({
            id: usuario.id,
            tokenRedefinirSenha: token,
        });
        console.log(a);
        if (!process.env.API_PASSWORD || !process.env.API_EMAIL) {
            throw ApiError.internal('Erro ao configurar email do sistema');
        }
        const transportador = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.API_EMAIL,
                pass: process.env.API_PASSWORD,
            },
        });
        if (!process.env.CLIENT_LINK) {
            throw ApiError.internal('Erro ao obter link do cliente');
        }
        const result = await transportador.sendMail({
            from: process.env.API_EMAIL,
            to: email,
            subject: 'Redefinição de senha do Ignite Lab',
            html: `
      <p>Você solicitou a redefinição de senha do nosso site, para prosseguir clique no link abaixo:</p>
      <br>
      <a href="http://${process.env.CLIENT_LINK}/redefinirSenha?token=${token}">Clique aqui</a>
  `,
        });
        if (result.accepted.length > 0) {
            return {
                mensagem: 'Email foi enviado, favor verifique seu email.',
            };
        }
        else {
            throw ApiError.internal('Não foi possível enviar o email');
        }
    }
    else {
        throw new ApiError(400, 'Email não cadastrado');
    }
};
