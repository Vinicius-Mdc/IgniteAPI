import { validationResult } from 'express-validator';
import { ApiError } from '../../middlewares/ApiError.js';
import enviarEmailRedefinirSenha from '../../services/Usuario/EnviarEmailRedefinirSenha.js';
export const enviarEmailRedefinicaoDeSenha = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.badRequest(errors.array()[0].msg));
        return;
    }
    const { email } = req.body;
    try {
        const resposta = await enviarEmailRedefinirSenha(email);
        res.json(resposta);
    }
    catch (e) {
        console.log(e);
        next(e);
    }
};
