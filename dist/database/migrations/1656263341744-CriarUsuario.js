import { Table } from 'typeorm';
export class CriarUsuario1656263341744 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'usuario',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    length: '40',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '40',
                    isNullable: false,
                },
                {
                    name: 'senha',
                    type: 'varchar',
                    length: '60',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        queryRunner.dropTable('usuario');
    }
}
