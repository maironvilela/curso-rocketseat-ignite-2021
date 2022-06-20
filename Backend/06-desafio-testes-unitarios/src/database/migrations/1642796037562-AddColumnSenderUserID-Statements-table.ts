import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnSenderUserIDStatementsTable1642796037562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'statements',
        new TableColumn({
          name: 'sender_user_id',
          type: 'varchar',
          isNullable: true
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('statements', 'sender_user_id');

    }

}
