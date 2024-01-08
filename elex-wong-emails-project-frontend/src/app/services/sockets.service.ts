import { Injectable } from "@angular/core";
import { Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    //this.socket = io(environment.backend.webSocketsUrl);
  }

  public getSocket(): Socket {
    return this.socket;
  }
}