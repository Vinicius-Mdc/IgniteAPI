var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
let Usuario = class Usuario {
    constructor(nome, email, senha, id, tokenRedefinirSenha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        if (!id) {
            this.id = uuid();
        }
        else {
            this.id = id;
        }
        this.tokenRedefinirSenha = tokenRedefinirSenha;
    }
};
__decorate([
    PrimaryColumn('varchar', { length: 36 }),
    __metadata("design:type", String)
], Usuario.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Usuario.prototype, "tokenRedefinirSenha", void 0);
Usuario = __decorate([
    Entity('usuario'),
    __metadata("design:paramtypes", [String, String, String, String, String])
], Usuario);
export { Usuario };
