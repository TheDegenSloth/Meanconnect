import { Injectable } from '@angular/core';
import AppSettings from '../app.settings';
import { UsersSchema } from './users.schema';
import { AuthService } from '../common/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private _http: HttpClient,
        private _auth: AuthService,
    ) {}

    public all(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get(AppSettings.apiUrl('users'), { headers: this._auth.httpHeader() })
                .subscribe(res => resolve(res), err => {
                    reject(err);
                });
        });
    }

    public create(param: UsersSchema): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(AppSettings.apiUrl('users'), param, { headers: this._auth.httpHeader() })
            .subscribe(res => resolve(res), err => {
                reject(err);
            });
        });
    }

    public save(param: UsersSchema): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.put(AppSettings.apiUrl('users'), param, { headers: this._auth.httpHeader() }).subscribe(res => resolve(res), err => {
                    reject(err);
                });
        });
    }
}
