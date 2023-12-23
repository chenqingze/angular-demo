import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {BreadcrumbComponent} from '../../shared/components/breadcrumb/breadcrumb.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        RouterLink,
        MatIconModule,
        MatButtonModule,
        SideMenuComponent,
        RouterOutlet,
        BreadcrumbComponent,
        SidebarComponent
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    private readonly _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        if (this.mobileQuery.addEventListener) {
            this.mobileQuery.addEventListener('change', this._mobileQueryListener);
        } else {
            this.mobileQuery.addListener(this._mobileQueryListener);
        }

    }

    ngOnDestroy(): void {
        if (this.mobileQuery.removeEventListener) {
            this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
        } else {
            this.mobileQuery.removeListener(this._mobileQueryListener);
        }

    }
}
