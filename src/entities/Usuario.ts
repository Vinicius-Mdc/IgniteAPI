import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('usuario')
export class Usuario {
  @PrimaryColumn('varchar', { length: 36 })
  id: string

  @Column()
  nome: string

  @Column()
  email: string

  @Column()
  senha: string

  @Column()
  tokenRedefinirSenha?: string | null

  constructor(
    nome: string,
    email: string,
    senha: string,
    id?: string,
    tokenRedefinirSenha?: string
  ) {
    this.nome = nome
    this.email = email
    this.senha = senha
    if (!id) {
      this.id = uuid()
    } else {
      this.id = id
    }
    this.tokenRedefinirSenha = tokenRedefinirSenha
  }
}
