import {Component} from '@angular/core';
import {ErrorCodeComponent} from './error-code/error-code.component';

@Component({
    selector: 'app-error-404',
    standalone: true,
    template: `
        <error-code
                code="404"
                title="Page not found!"
                message="This is not the web page you are looking for."
        ></error-code>
    `,
    imports: [
        ErrorCodeComponent
    ]
})
export class Error404Component {
}