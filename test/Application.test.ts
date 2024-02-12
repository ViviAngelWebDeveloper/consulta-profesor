import { application } from '@infrastructure/api/Application';
import { dbOk } from './__mocks__';
import { TYPES, DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration';
import { getURI } from '@util';

describe('Testing App Request', () => {
    beforeAll(() => {
        createDependencyContainer();
        DEPENDENCY_CONTAINER.rebind(TYPES.Postgresql).toConstantValue(dbOk);
    });

    it('debería retornar 404', async () => {
        const response = await application.inject({
            method: 'GET',
            url: '/route-not-found',
        });
        expect(response.statusCode).toBe(404);
    });

    it('debería retornar 200', async () => {
        const response = await application.inject({
            method: 'GET',
            url: `${getURI()}/api/v1`,
        });
        expect(response.statusCode).toBe(200);
    });
});
