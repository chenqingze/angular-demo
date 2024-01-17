import {Routes} from '@angular/router';
import {AttributesComponent} from './attributes.component';
import {AttributeListComponent} from './attribute-list/attribute-list.component';

const attributesRoutes: Routes = [
    {path: '', component: AttributesComponent},
    {path: 'list', component: AttributeListComponent},
];

export default attributesRoutes;
