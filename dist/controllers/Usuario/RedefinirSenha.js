import { validationResult } from 'express-validator';
import { ApiError } from '../../middlewares/ApiError.js';
import redefinirSenha from '../../services/Usuario/RedefinirSenha.js';
export const redefinicaoDeSenha = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.badRequest(errors.array()[0].msg));
        return;
    }
    const { token, senha } = req.body;
    try {
        const resposta = await redefinirSenha(token, senha);
        res.json(resposta);
    }
    catch (e) {
        console.log(e);
        next(e);
    }
};
