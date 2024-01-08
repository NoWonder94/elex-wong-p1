declare module omelox {
    export interface NetConnectParam {
        wsUrl?: string;
        host?: string;
        port?: number;
        /** 是否自动重连 */
        reconnect: boolean;
        encode?: any;
        decode?: any;
        user?: string;
        encrypt?: boolean;
        handshakeCallback?: any;
        maxReconnectAttempts?: number;
        localStorage?: any;
    }

    export class Client {
        socket: WebSocket;

        constructor();
        /**
         * 
         * @param param 
         * @param cb 
         */
        public connect(param: NetConnectParam, cb: (ws: any) => void): Promise<void>;
        public request(route: string, msg: any, cb: (data: any) => void): Promise<any>;
        public notify(route: string, msg: any): void;
        public on(route: string, cb: (data: any) => void, caller?: any): void;
        public once(route: string, cb: (data: any) => void, caller?: any): void;
        public off(route: string, cb: (data: any) => void, caller?: any): void;
        public disconnect(code?: number, reason?: string, cb?: () => void): void;
    }
}
