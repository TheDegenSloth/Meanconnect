import { Component } from '@angular/core';
import { AuthService } from '../common/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public admin: boolean;
    public perk: string;
    public loading = true;
    public username: string;
    public image: string;

    constructor(
        private _auth: AuthService,
    ) {
        this._auth.verify((_res, user) => {
            this.username = user.username;
            this.image = user.image || 'https://steemitimages.com/u/' + user.username + '/avatar';
            this.admin = user.admin;
            this.loading = false;
        });
    }

    public logout() {
        this._auth.logout();
    }

}
