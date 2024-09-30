import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { DriverRepository } from '@repository';
import { Server, Socket } from 'socket.io';

interface Driver {
  id: string;
  socketId: string;
  isOnline: boolean;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    public readonly repo: DriverRepository,

  ) {

  }
  @WebSocketServer()
  server: Server;
  private drivers: Map<string, Driver> = new Map(); // Lưu trạng thái của tài xế


  handleConnection(client: Socket) {
    const driverId = client.handshake.query.driverId; // Nhận driverId từ client
    console.log(driverId);
    
    if (driverId) {
      this.repo.update(driverId, { onlineStatus: 'online' });
    }

    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    const driver = [...this.drivers.values()].find(d => d.socketId === client.id);
    console.log(driver);
    
    const driverId = client.handshake.query.driverId; // Nhận driverId từ client
    console.log(driverId);
    
    if (driverId) {
      this.repo.update(driverId, { onlineStatus: 'offline' });
    }
    console.log('Client disconnected: ', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log('Received message from client:', payload);
    return 'Message received on server!';
  }

  // Method to emit an event to the client
  emitEvent(eventName: string, data: any) {
    this.server.emit(eventName, data);
  }
}
