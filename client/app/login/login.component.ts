import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../common/auth.service';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public loginURL;
    public loading = true;

    constructor(
        private _activeRoute: ActivatedRoute,
        private _auth: AuthService,
        private _service: UsersService,
        public _router: Router,
    ) {
        this.loginURL = this._auth.loginURL;

        this._activeRoute.queryParams.subscribe((queryParams: Params) => {
            if (queryParams.access_token) {
                this._auth.init(queryParams, () => {
                    this._auth.verify((res) => {
                        let image: string;
                        try {
                            image = JSON.parse(res.account.json_metadata).profile.profile_image
                        } catch (e) {
                            image =  'https://steemitimages.com/u/' + res.username + '/avatar';
                        }
                        this._service.create({
                            admin: false,
                            userlevel: 0,
                            username: res.name,
                            image,
                        }).then(res => {
                            localStorage.setItem('session', res.session);
                        }).catch((e) => {
                            throw e;
                        });
                        this._router.navigateByUrl('/home');
                    });
                });
            } else {
                if (localStorage.getItem('access_token')) {
                    this._auth.verify((_res, user) => {
                        this.loading = false;
                        this._router.navigateByUrl('/home');
                    }, () => this.loading = false);
                } else {
                    this.loading = false;
                }
            }
        });
    }
}
