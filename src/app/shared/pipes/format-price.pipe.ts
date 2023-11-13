import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { GetActiveChannelQuery } from '../types/predefined-types';
import { GET_ACTIVE_CHANNEL } from '../types/results';
let channelDataPromise: Promise<any>;
@Pipe({
    name: 'formatPrice',
    pure: false,
})
export class FormatPricePipe implements PipeTransform {

    private latestValue: any = null;
    private latestReturnedValue: any = null;

    constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) {}

    transform(value: number) {
        if (this.latestValue !== value) {
            this.latestValue = value;
            this.formatCurrency(value);
        }
        return this.latestReturnedValue;
    }

    private formatCurrency(value: number) {
        this.getActiveChannel()
            .then(channel => {
                const formatter = Intl.NumberFormat(channel.defaultLanguageCode, {
                    style: 'currency',
                    currency: channel.currencyCode,
                });
                this.latestReturnedValue = formatter.format(value / 100);
                this.changeDetector.markForCheck();
            });
    }

    private getActiveChannel(): Promise<GetActiveChannelQuery['activeChannel']> {
        if (!channelDataPromise) {
            channelDataPromise = this.dataService.query<GetActiveChannelQuery>(GET_ACTIVE_CHANNEL).pipe(
                take(1),
                map(data => data.activeChannel),
            ).toPromise();
        }
        return channelDataPromise;
    }
}
