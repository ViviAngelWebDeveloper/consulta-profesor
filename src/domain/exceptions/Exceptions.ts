import { ErrorCode, StatusCode } from './ErrorCode';

export abstract class Exception {
    isError: boolean;
    message: string;
    code: ErrorCode;
    statusCode: number;
    cause: string | null;

    constructor(message: string, code: ErrorCode, statusCode: number, cause?: string) {
        this.isError = true;
        this.message = message;
        this.code = code;
        this.statusCode = statusCode;
        this.cause = cause || null;
        console.error({
            isError: this.isError ?? null,
            message: message ?? null,
            code: code ?? null,
            statusCode: statusCode ?? null,
            cause: cause ?? null,
        });
    }
}

export class BadMessageException extends Exception {
    constructor(cause: string, message = 'Los datos de entrada no corresponden con el esquema definido') {
        super(message, ErrorCode.BAD_MESSAGE, StatusCode.BAD_REQUEST, cause);
    }
}

export class BadMessagePubSubException extends Exception {
    constructor(cause: string, message = 'Los datos de entrada no corresponden con el esquema definido') {
        super(message, ErrorCode.BAD_MESSAGE, StatusCode.OK, cause);
    }
}

export class RepositoryException extends Exception {
    constructor() {
        const message = 'Ocurrió un error al momento de guardar la guía';
        super(message, ErrorCode.REPOSITORY_ERROR, StatusCode.INTERNAL_ERROR);
    }
}

export class PubSubException extends Exception {
    constructor(message: string, cause: string) {
        super(message, ErrorCode.PUBSUB_ERROR, StatusCode.INTERNAL_ERROR, cause);
    }
}

export class PostgresError extends Exception {
    constructor(code: string, message: string) {
        const pgError = ErrorCode.REPOSITORY_ERROR;
        switch (code) {
            case 'P0001':
                super(message, pgError, StatusCode.OK, 'Raise Exception');
                break;
            case '23505':
                super(message, pgError, StatusCode.OK, 'Intentando insertar llave única duplicada');
                break;
            case '23514':
                super(message, pgError, StatusCode.OK, 'Acción viola una restricción de la tabla');
                break;
            case '23502':
                super(message, pgError, StatusCode.OK, 'Insertando una llave nula que no puede serlo');
                break;
            case '42883':
                super(message, pgError, StatusCode.OK, 'llamado a funcion Inexistente');
                break;
            case '42P01':
                super(message, pgError, StatusCode.OK, 'llamado a tabla Inexistente');
                break;
            case '42P02':
                super(message, pgError, StatusCode.OK, 'llamado a parametro Inexistente');
                break;
            case '42704':
                super(message, pgError, StatusCode.OK, 'llamado a objeto Inexistente');
                break;
            case '42703':
                super(message, pgError, StatusCode.OK, 'llamado a columna Inexistente');
                break;
            case '57014':
                super(message, pgError, StatusCode.INTERNAL_ERROR, 'Query cancelled');
                break;
            case 'ECONNREFUSED':
                super(message, pgError, StatusCode.SERVICE_UNAVAILABLE, 'Conexión con pg rechazada');
                break;
            default:
                super(message, pgError, StatusCode.INTERNAL_ERROR, 'Error desconocido');
                break;
        }
    }
}
