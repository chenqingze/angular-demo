import {Component} from '@angular/core';
import {ErrorCodeComponent} from './error-code/error-code.component';

@Component({
    selector: 'app-error-403',
    standalone: true,
    template: `
        <error-code
                code="403"
                title="Permission denied!"
                message="You do not have permission to access the requested data."
        ></error-code>
    `,
    imports: [
        ErrorCodeComponent
    ]
})
export class Error403Component {
}