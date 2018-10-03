import * as sc2 from 'steemconnect';
import { Injectable } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Response } from '@angular/http';
import AppSettings from '../app.settings';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public api = new sc2.Initialize({
        app: 'development.app', // replace this with the name of your app
        callbackURL: 'http://localhost:4200', // Url just for testing
        accessToken: '',
        scope: AppSettings.CONSTANTS.scope,
    });

    public loginURL = this.api.getLoginURL();

    constructor(
        public _router: Router,
        private _http: HttpClient,
    ) { }

    public get token(): string {
        return localStorage.getItem('access_token');
    }

    public httpHeader() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': this.token
        });
        return headers;
    }

    public init(queryParams, callback) {
        this.api.setAccessToken(queryParams.access_token);
        localStorage.setItem('access_token', queryParams.access_token);
        localStorage.setItem('expires', String(new Date().getTime() + Number(queryParams.expires_in)));
        localStorage.setItem('username', queryParams.username);
        callback();
    }

    public logout(callback?) {
        this.api.revokeToken(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('username');
            if (callback) {
                callback();
            } else {
                this._router.navigateByUrl('/');
            }
        });
    }

    public verify(successCallback?, errorCallback?) {
        if (!this.token || Number(localStorage.getItem('expires')) < new Date().getTime()) {
            if (!localStorage.getItem('session')) {
                this.logout();
            } else {
                this._http.post(AppSettings.apiUrl('relogin'), {
                    session: localStorage.getItem('session'),
                    username: localStorage.getItem('username'),
                }, { headers: this.httpHeader() }).subscribe((res: Response) => {
                    localStorage.setItem('session', res.json().session);
                    localStorage.setItem('expires', String(new Date().getTime() + 3600000));
                }, () => {
                    this.logout();
                });
            }
        }
        this.api.setAccessToken(this.token);
        this.api.me((err, res) => {
            if (err) {
                if (errorCallback) {
                    this.logout(() => {
                        errorCallback(err);
                    });
                } else {
                    this.logout();
                }
            } else {
                if (successCallback) {
                    this._http.get(AppSettings.apiUrl('verify'), { headers: this.httpHeader() })
                        .subscribe((verifyRes: Response) => {
                            successCallback(res, verifyRes);
                        }, err => {
                            throw err;
                        });
                }
            }
        });
    }
}
