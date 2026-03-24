import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

export const rootEnvs = {
    NODE_ENV: env.get('NODE_ENV').required().asEnum(['development', 'production', 'test']),
    VERSION: env.get('VERSION').required().asString(),
    BRAND: env.get('BRAND').required().asString(),
}

export const portEnvs = {
    PORT: env.get('PORT').required().asInt(),
}