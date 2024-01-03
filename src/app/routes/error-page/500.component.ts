import {Component} from '@angular/core';
import {ErrorCodeComponent} from './error-code/error-code.component';

@Component({
    selector: 'app-error-500',
    standalone: true,
    template: `
        <error-code
                code="500"
                title="Server went wrong!"
                message="Just kidding, looks like we have an internal issue, please try refreshing."
        >
        </error-code>
    `,
    imports: [
        ErrorCodeComponent
    ]
})
export class Error500Component {
}