import { ExampleEntity } from '@domain/entities';
export interface ExampleRepository {
    session(entity: ExampleEntity): Promise<void>;
}
