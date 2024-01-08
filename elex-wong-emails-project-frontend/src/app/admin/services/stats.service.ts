import { Injectable } from '@angular/core';
import { GlobalStats } from 'src/app/admin/model/globalstats';
import { hasError } from 'src/app/model/dataorerror';
import { Logger } from 'src/app/utils/logger';
import { HttpService } from '../../services/http.service';

type FetchGlobalStatsResponse = {
  stats: GlobalStats;
}

@Injectable({
  providedIn: 'root'
})
export class AdminStatsService {
  constructor(
    private http: HttpService
  ) { }

  public async init(): Promise<void> {
    Logger.log("adminstats", "Admin stats service is initializing");
    return;
  }

  /**
   * Retrieves global stats
   */
  public async fetchGlobalStats(): Promise<GlobalStats> {
    let statsOrError = await this.http.adminBackEndJsonGet<FetchGlobalStatsResponse>(`/stats`);
    if (!hasError(statsOrError)) {
      Logger.log("adminstats", "Got global stats", statsOrError.data);
      return statsOrError.data.stats;
    }
    else {
      return null;
    }
  }
}