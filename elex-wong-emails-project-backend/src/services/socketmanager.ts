import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { logger } from "../logger";

class SocketManager {
  private io: SocketIOServer;
  private connectedSockets: Socket[] = [];

  public init(server: Server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    this.io.on('connection', socket => {
      logger.info("Incoming IO connection");
      this.connectedSockets.push(socket);
    });
  }

  /* public getIO(): SocketIOServer {
    return this.io;
  } */

  public emit(event: string, ...params: unknown[]) {
    try {
      this.connectedSockets.forEach(s => s.emit(event, ...params));
    }
    catch (e) { // Never throw, not critical if a socket event is not completed
      console.error("socket emit", e);
    }
  }
}

export const socketManager = new SocketManager();