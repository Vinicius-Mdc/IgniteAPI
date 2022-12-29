import { validationResult } from 'express-validator';
import { ApiError } from '../../middlewares/ApiError.js';
import RegistrarUsuario from '../../services/Usuario/RegistrarUsuario.js';
export const registroUsuario = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.badRequest(errors.array()[0].msg));
        return;
    }
    const { nome, email, senha } = req.body;
    try {
        const resposta = await RegistrarUsuario(nome, email, senha);
        res.json(resposta);
    }
    catch (e) {
        next(e);
    }
};
