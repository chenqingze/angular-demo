import {Directive, Input, OnInit, Optional, Self} from '@angular/core';
import {distinctUntilChanged, pairwise} from 'rxjs';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[numeric]',
    standalone: true
})
export class NumericDirective implements OnInit {

    @Input() decimals = 2;
    @Input() negative = 0;
    @Input() separator = '.';

    constructor(@Optional() @Self() public ngControl: NgControl) {
    }

    ngOnInit(): void {
        if (this.ngControl && this.ngControl.valueChanges)
            this.ngControl.valueChanges.pipe(distinctUntilChanged(), pairwise()).subscribe(([oldValue, newValue]) => {
                this.runCheck(oldValue, newValue);
            });
    }

    private runCheck(oldValue: any, newValue: any) {
        const allowNegative = this.negative > 0;
        if (this.ngControl.control?.valid) {
            if (allowNegative) {
                if (!['', '-'].includes(newValue) && !this.checkAllowNegative(newValue)) {
                    this.ngControl.control.setValue(oldValue);
                }
            } else {
                if (newValue !== '' && !this.check(newValue)) {
                    this.ngControl.control.setValue(oldValue);
                }
            }
        }
    }

    private checkAllowNegative(value: string) {
        if (this.decimals <= 0) {
            return new RegExp(/^-?\d+$/).exec(String(value));
        } else {
            const regExpString =
                '^-?\\s*((\\d+(\\' + this.separator + '\\d{0,' + this.decimals + '})?)|((\\d*(\\' + this.separator + '\\d{1,' + this.decimals + '}))))\\s*$';
            return new RegExp(regExpString).exec(String(value));
        }
    }

    private check(value: string) {
        if (this.decimals <= 0) {
            return new RegExp(/^\d+$/).exec(String(value));
        } else {
            const regExpString =
                '^\\s*((\\d+(\\' + this.separator + '\\d{0,' + this.decimals + '})?)|((\\d*(\\' + this.separator + '\\d{1,' + this.decimals + '}))))\\s*$';
            return new RegExp(regExpString).exec(String(value));
        }
    }

}
