import { Injectable } from '@angular/core';
import { Logger } from '../utils/logger';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  public hoursInADay = 24;
  public minutesInAnHour = 60;
  public SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  constructor() {
  }

  public async init(): Promise<void> {
    Logger.log("countdown", "Countdown service is initializing");

    return;
  }


  public getTimeDifference(countdownTime) {
    this.timeDifference = countdownTime- new Date().getTime() / 1000;
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor(
      timeDifference  % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / this.minutesInAnHour) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }
}
