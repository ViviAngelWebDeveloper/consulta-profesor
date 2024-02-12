export const dbOk = {
    one: async (): Promise<Record<string, string>> => {
        return { resultado: 'OK' };
    },
    query: async (): Promise<unknown> => {
        return { resultado: 'OK' };
    },
    oneOrNone: async (): Promise<null | Record<string, unknown>> => {
        return { holi: 'hi' };
    },
    none: async (): Promise<Record<string, unknown>> => {
        return {};
    },
};

export const dbError = {
    one: async (query: string, params: unknown[]): Promise<Record<string, string>> => {
        const check = params.includes('73940027576');
        if (query !== 'SELECT frs()' && !check) throw new Error(`Error de BD`);
        if (check) {
            throw {
                code: 'P0001',
                message: `Raise Exception Motherfucker!`,
                query,
            };
        }
        return { frs: '1234' };
    },
    query: async (query: string, params: unknown[]): Promise<unknown[]> => {
        if (params.includes('73940027576')) {
            throw {
                code: 'P0001',
                message: `Raise Exception Motherfucker!`,
                query,
            };
        }
        return [];
    },
    oneOrNone: async (): Promise<Record<string, unknown>> => {
        return { holi: 'hi' };
    },
    none: async (): Promise<Record<string, unknown>> => {
        return {};
    },
};
