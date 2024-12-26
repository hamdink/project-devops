import { Module } from "@nestjs/common";
import { AbstractCronJobService } from "src/core/abstracts/cron-services.abstract";
import { CronJobService } from "./cron-services.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: AbstractCronJobService,
      useClass: CronJobService,
    },
  ],
  exports: [AbstractCronJobService],
})
export class CronJobModule {}
