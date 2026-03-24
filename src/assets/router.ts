import { Router } from 'express';
import QRCode from 'qrcode';

export const AssetsRouter = (): Router => {

    const assetsRouter: Router = Router();

    const paths = {
        qr_server: '/qr-server',
    };

    /**
     * * Servicio que realiza una prueba de conexión.
     * 
     * @function
     * @name GET /welcome
     * @path {GET} /welcome
     * @memberof assetsRouter
    */
    assetsRouter.get(
        paths.qr_server,
        async (req, res, next) => {

            try {
                // La URL o dato que quieres codificar en el QR
                const urlParaElQR = '107.178.98.247:5000'; 
                
                // Generamos el QR como una imagen base64
                const qrImage = await QRCode.toDataURL(urlParaElQR);

                // Enviamos la "Vista" HTML directamente
                res.send(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <title>Generador de QR</title>
                        <style>
                            body { font-family: sans-serif; text-align: center; padding: 50px; background: #f4f4f9; }
                            .card { background: white; padding: 20px; border-radius: 10px; display: inline-block; shadow: 0 4px 8px rgba(0,0,0,0.1); }
                            img { width: 300px; height: 300px; }
                            .btn { display: block; margin-top: 20px; text-decoration: none; background: #2ecc71; color: white; padding: 10px; border-radius: 5px; }
                        </style>
                    </head>
                    <body>
                        <div class="card">
                            <h1>Tu Código QR</h1>
                            <img src="${qrImage}" alt="QR Code" />
                            <br>
                            <a href="${qrImage}" download="codigo-qr.png" class="btn">Descargar para Imprimir</a>
                        </div>
                    </body>
                    </html>
                `);
            } catch (err) {
                res.status(500).send('Error generando el QR');
            }

        }
    );

    return assetsRouter;

}