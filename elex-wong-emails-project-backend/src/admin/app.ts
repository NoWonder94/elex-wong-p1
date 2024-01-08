import bodyParser from "body-parser";
import { green } from "colors";
import cors from "cors";
import debug from "debug";
import express from "express";
import http from "http";
import logger from "morgan";
import { AddressInfo } from "net";
import { environment } from "../generated/environment";
import { logger as traceLogger } from "../logger";
import adminRouter from "./router";
import { adminService } from "./service";

// RUNNING AS ADMIN PROCESS - MUST BE IP ADDRESS LOCKED
adminService.setAdminProcess();

const port = environment.nodeJS.adminPort;

class EmailsAdminAPI {
    public async start() {
        let app = express();

        var corsOptions = {
            origin: (origin, callback) => {
                // Allow everything for now
                callback(null, true)
            }
        }

        //app.use(helmet());
        app.use(cors(corsOptions));
        app.use(bodyParser.json({ limit: '5mb' }));
        app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        app.use('/', adminRouter);

        let dbg = debug('emails-admin-api');

        app.set('port', port);

        let server: http.Server;
        traceLogger.info("Creating HTTP server");
        server = http.createServer(app);

        server.listen(port, '0.0.0.0');

        server.on('error', (error) => {
            let bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.name) {
                case 'EACCES':
                    throw new Error(bind + ' requires elevated privileges');
                case 'EADDRINUSE':
                    throw new Error(bind + ' is already in use');
                default:
                    throw error;
            }
        });

        /**
         * Event listener for HTTP server "listening" event.
         */
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        server.on('listening', async () => {
            let addr = server.address() as AddressInfo;
            if (!addr)
                throw new Error("No server address!");

            let bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            dbg('Listening on ' + bind);

            traceLogger.info(`========= Emails.com ADMIN API service started with ${bind} =============`);
            traceLogger.info(`========= ENVIRONMENT: ${green(environment.mode)} =============`);

        });
    }
}

const emailsAdminApi = new EmailsAdminAPI();
void emailsAdminApi.start();