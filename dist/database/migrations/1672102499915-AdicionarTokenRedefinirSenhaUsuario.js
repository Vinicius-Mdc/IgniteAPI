import { TableColumn } from 'typeorm';
export class AdicionarTokenRedefinirSenhaUsuario1672102499915 {
    async up(queryRunner) {
        await queryRunner.addColumn('usuario', new TableColumn({
            name: 'tokenRedefinirSenha',
            type: 'varchar',
            length: '200',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('usuario', 'tokenRedefinirSenha');
    }
}
