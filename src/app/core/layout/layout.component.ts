import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {NgClass} from '@angular/common';

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
        SidebarComponent,
        FooterComponent,
        HeaderComponent,
        NgClass
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy, AfterViewInit {
    @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;
    mobileQuery: MediaQueryList;
    private readonly _mobileQueryListener: () => void;
    isMiniNavigation: boolean;
    isAppHeaderHidden: boolean = false;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        if (this.mobileQuery.addEventListener) {
            this.mobileQuery.addEventListener('change', this._mobileQueryListener);
        } else {
            this.mobileQuery.addListener(this._mobileQueryListener);
        }
        this.isMiniNavigation = this.mobileQuery.matches;

    }

    ngOnDestroy(): void {
        if (this.mobileQuery.removeEventListener) {
            this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
        } else {
            this.mobileQuery.removeListener(this._mobileQueryListener);
        }

    }

    ngAfterViewInit() {
        this.sidenavContainer.scrollable.elementScrolled().subscribe(() => {
            const scrollPosition = this.sidenavContainer.scrollable.measureScrollOffset('top');
            if (scrollPosition > 60 && !this.isAppHeaderHidden) {
                this.isAppHeaderHidden = true;
            } else if (scrollPosition <= 60 && this.isAppHeaderHidden) {
                this.isAppHeaderHidden = false;
            }
        })
    }
}
