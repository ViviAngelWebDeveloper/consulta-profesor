import { Container } from 'inversify';
import { IDatabase, IMain } from 'pg-promise';
import { ExampleAppService } from '@application/services';
import { cm, PostgresqlExampleDAO } from '@infrastructure/repositories';
import { ExampleRepository } from '@domain/repository';
import { TYPES } from '@configuration';
import { ConsultarAppService } from '@application/services/ConsultarAppService';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.Postgresql).toConstantValue(cm);
    DEPENDENCY_CONTAINER.bind(ExampleAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(ConsultarAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<ExampleRepository>(TYPES.PostgresExampleRepository)
        .to(PostgresqlExampleDAO)
        .inSingletonScope();
};
