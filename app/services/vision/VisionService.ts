import { Subject, BehaviorSubject } from 'rxjs';
import { initSocketClient, sendMessToSocket } from './SocketClient';

// import jsonData from 'dummydata/coordinates';

class VisionService {
  socketConnectionInitialized = false;

  pointsStream = new Subject<DataFromVision>();

  imageStream = new Subject<string>();

  connectionEstablished = new BehaviorSubject<boolean>(false);

  /**
   * Initializes socket connection and returns a singleton service instance
   * @returns {VisionService}
   */
  initialize(userData: VyboUser) {
    if (!this.socketConnectionInitialized) {
      initSocketClient(
        this.onMessage.bind(this),
        this.onConnection.bind(this),
        this.onClose.bind(this),
        userData
      );
    }
    return this;
  }

  onMessage(event: any): any {
    if (event.data === 'pong') {
      return {};
    }
    try {
      const data = JSON.parse(event.data);
      if (Object.keys(data).length !== 0) {
        this.imageStream.next(data.img);
        if ((data.x !== 0 && data.y !== 0) || data.text) {
          const { x, y } = data;
          this.pointsStream.next({
            ...data,
            x: (x * (window.innerHeight * 0.7) * (640 / 480)) / 640,
            y: (y * (window.innerHeight * 0.7)) / 480,
            flag: true,
          });
        }
      } else {
        return {};
      }
    } catch (err) {
      console.log(
        'Error Occured While Parsing Data: ',
        event.data,
        'Error: ',
        err
      );
      return {};
    }
    return {};
  }

  onVideoStreamMessage(event: { data: any }): any | void {
    if (event.data) {
      try {
        const data = JSON.parse(event.data.replace(/'/g, '"'));
        if (data.x && data.x > 0 && data.y > 0) {
          this.pointsStream.next(data);
        } else {
          return {};
        }
      } catch (err) {
        console.log(
          'Error Occured While Parsing Data: ',
          event.data,
          'Error: ',
          err
        );
        return {};
      }
    }
    return {};
  }

  onConnection() {
    this.connectionEstablished.next(true);
  }

  onClose() {
    this.pointsStream.complete();
  }

  postToSocket(data: string) {
    sendMessToSocket(data);
    return this;
  }
}

const instance = new VisionService();
export default Object.freeze(instance);
