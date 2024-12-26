import { Injectable } from "@nestjs/common";
import { AbstractCronJobService } from "src/core/abstracts/cron-services.abstract";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CronJobService extends AbstractCronJobService {
  constructor(
    private httpService: HttpService,
  
  ) {
    super();
  }

  async execute(): Promise<void> {
     
  }

 


  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @Cron("*/1 * * * *")
  async executeCronJob() {
    await this.execute();
  }
}
