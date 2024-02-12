import { getURI, HOST } from '@util';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const swagger_config: FastifyDynamicSwaggerOptions = {
    routePrefix: `${getURI()}/api/v1/docs`,
    swagger: {
        info: {
            title: 'Onpremises Microservice Template',
            description: 'Plantilla para un microservicio onpremises.',
            version: '2.0.0',
            contact: {
                name: 'Coordinadora Mercantil S.A',
                url: 'http://www.coordinadora.com/',
                email: 'it@coordinadora.com',
            },
        },
        host: HOST,
        schemes: [HOST === 'api.coordinadora.com' ? 'https' : 'http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
    hideUntagged: true,
};
