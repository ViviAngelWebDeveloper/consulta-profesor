import { injectable } from 'inversify';
//import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
//import { ExampleRepository } from '@domain/repository';
import { ExampleEntity } from '@domain/entities';
import { calculateNameLength } from '@domain/services';
import { Result, Response } from '@domain/response';

@injectable()
export class ExampleAppService {
    //private exampleRepository = DEPENDENCY_CONTAINER.get<ExampleRepository>(TYPES.PostgresExampleRepository);

    async example(): Promise<Response<string | null>> {
        const example = ExampleEntity.create('template');
        //await this.exampleRepository.session(example);
        const length = calculateNameLength(example.reason);
        const result = length <= 4 ? `You're weird` : `You're incredible`;
        return Result.ok(result);
    }
}
