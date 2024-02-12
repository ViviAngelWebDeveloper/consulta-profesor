import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain } from 'pg-promise';
import { ExampleRepository } from '@domain/repository';
import { PostgresError } from '@domain/exceptions';
import { ExampleEntity } from '@domain/entities';

@injectable()
export class PostgresqlExampleDAO implements ExampleRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.Postgresql);

    public async session(entity: ExampleEntity): Promise<void> {
        try {
            const session = `SELECT func_registrar_sesion($1,$2);`;
            const response = await this.db.query(session, ['template_test', entity.reason]);
            console.log(response);
        } catch ({ code, name, message, stack }) {
            throw new PostgresError(code as string, message as string);
        }
    }
}
