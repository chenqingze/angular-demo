import {AddressFormComponent} from './address-form/address-form.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DragDropComponent} from './drag-drop/drag-drop.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TableComponent} from './table/table.component';
import {TreeComponent} from './tree/tree.component';

const demoRoutes = [
    {path: 'address-form', component: AddressFormComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'drag-drop', component: DragDropComponent},
    {path: 'navigation', component: NavigationComponent},
    {path: 'table', component: TableComponent},
    {path: 'tree', component: TreeComponent}
];

export default demoRoutes;
