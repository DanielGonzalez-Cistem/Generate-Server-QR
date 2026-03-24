import os from 'os';
import express, { Express } from 'express';
import morgan from 'morgan';

import { portEnvs, rootEnvs } from './dependencies/env/handler';
import { AssetsRouter } from './assets/router';


const mainApp = (): void => {

    console.log(`\n🟢 ${rootEnvs.BRAND} ${rootEnvs.VERSION} ha sido inicializado...\n`);

    const app: Express = express();

    const PORT: number = portEnvs.PORT;

    app.use(morgan('dev'));

    app.use(`/assets`, AssetsRouter());

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`⚡[ASSETS] running at: `);
        console.log(`  ➜ Local:   ${'http'}://localhost:${PORT}`);

        const networkAddresses = getLocalNetworkIPs({
            port: PORT,
            suffix: 'http',
            host: ''
        });

        for (const addr of networkAddresses) {
            console.log(`  ➜ Network: ${addr}\n`);
            console.log(`  ➜ QR Server: ${addr}/assets/qr-server\n`);
            // console.log('   '); /assets/qr-server
        }
    });

}

export const getLocalNetworkIPs = ( args: any ): string[] => {

    const { port, suffix, host } = args;

    /**
     * Asignación de interfaces de red.
     */
    const interfaces = os.networkInterfaces();

    const addresses: string[] = [];

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]!) {
            if (iface.family === 'IPv4' && !iface.internal) {
                if ( suffix === 'http' ) {
                    addresses.push(`${suffix}://${iface.address}:${port}`);
                    // addresses.push(`${suffix}://${iface.address}:${port}/assets/qr-server`);
                } else {
                    addresses.push(`${suffix}://${host}:${port}`);
                }
            }
        }
    }

    return addresses;

}

mainApp();