import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AdicionarTokenRedefinirSenhaUsuario1672102499915
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'usuario',
      new TableColumn({
        name: 'tokenRedefinirSenha',
        type: 'varchar',
        length: '200',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usuario', 'tokenRedefinirSenha')
  }
}
