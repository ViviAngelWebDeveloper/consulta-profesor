export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

export const GCP_PROJECT = process.env.GCP_PROJECT;

export const getURI = (): string => (process.env.URI ? `/${process.env.URI}` : '');

export const HOST = process.env.HOST || 'localhost';
