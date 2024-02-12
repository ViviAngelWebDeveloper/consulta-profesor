export const examplePostSchema = {
    schema: {
        description: 'Schema for POST',
        tags: ['Template'],
        response: {
            '200-OK': {
                description: 'Successful Operation',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'string', example: 'You are incredible' },
                    timestamp: { type: 'string', example: '2021-08-25T20:41:25.008Z' },
                    id: { type: 'string', example: '8e6de25ccccd83b689e2bd0bb6f551cc5baa20ba' },
                },
            },
        },
    },
};
