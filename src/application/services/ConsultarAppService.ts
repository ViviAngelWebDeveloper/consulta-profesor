import { injectable } from 'inversify';
//import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
//import { ExampleRepository } from '@domain/repository';
// import { ExampleEntity } from '@domain/entities';
// import { calculateNameLength } from '@domain/services';
import { Result, Response } from '@domain/response';
import { datoVivi } from '@domain/entities';

@injectable()
export class ConsultarAppService {
    //private exampleRepository = DEPENDENCY_CONTAINER.get<ExampleRepository>(TYPES.PostgresExampleRepository);

    async example(dato:datoVivi): Promise<Response<string | null>> {
        //const example = ExampleEntity.create('template');
        //await this.exampleRepository.session(example);
        //const length = calculateNameLength(example.reason);
        //const result = length <= 4 ? `Tu eres` : `Vivi`;
        const result:string = 
        "Tu eres Vivi " + dato.nombre + dato.apellido + dato.cedula + dato.correo + dato.curso;
        return Result.ok(result);
    }
}
