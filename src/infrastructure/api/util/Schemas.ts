import Joi from 'joi';
import { parse, decode } from '@util';
import { pubSubSchema, PubSubPayload } from '@infrastructure/api/schemas';
import { BadMessageException, BadMessagePubSubException } from '@domain/exceptions';

type Schema = Joi.ObjectSchema | Joi.ArraySchema;
type Body = Record<string, unknown> | undefined | unknown;

export const validateData = <T>(schema: Schema, dataToValidate: Body): T => {
    if (dataToValidate) {
        const { error, value } = schema.validate(dataToValidate, { convert: true });
        if (error) {
            console.error(`schemaError: ${JSON.stringify(error)}`);
            throw new BadMessageException(error.message);
        }
        return value;
    }
    throw new Error('mensaje indefinido');
};

export const validateDataPubSub = <T>(schema: Schema, dataToValidate: Body): T => {
    if (dataToValidate) {
        const pubSubPayload = validatePubSub(dataToValidate);
        if (pubSubPayload) {
            const decodeMessage = parse(decode(pubSubPayload.message.data));
            const { error, value } = schema.validate(decodeMessage, { convert: true });
            if (error) {
                console.error(`schemaError: ${JSON.stringify(error)}`);
                throw new BadMessagePubSubException(error.message);
            }
            return value;
        }
    }
    throw new BadMessagePubSubException(
        'mensaje indefinido',
        'No hay mensaje o data para validar, reintente con un mensaje diferente.',
    );
};

export const validatePubSub = (dataToValidate: Body, isPubSub?: string | null): PubSubPayload | null => {
    if (dataToValidate && isPubSub !== null) {
        const { error, value } = pubSubSchema.validate(dataToValidate, { convert: true });
        if (!error) return value;
    }
    return null;
};
