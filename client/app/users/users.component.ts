import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { UsersSchema } from './users.schema';
import { AuthService } from '../common/auth.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
    public users: UsersSchema[];
    public newUser = new UsersSchema();
    public loading = true;
    public saving: boolean;
    public showAddUserArea = false;
    public error: string;
    public admin: boolean;
    public edit: UsersSchema;

    constructor(
        private _service: UsersService,
        private _auth: AuthService,
    ) { }

    ngOnInit() {
        this._auth.verify((_res, user) => {
            this.admin = user.admin;

            this._service.all()
                .then((users: UsersSchema[]) => {
                    this.users = users;
                    this.loading = false;
                })
                .catch(e => {
                    this.loading = false;
                    throw e;
                });
        });
    }

    public logout() {
        this._auth.logout();
    }

    public addUser() {
        this.saving = true;
        this._service.create(this.newUser)
            .then((res) => {
                this.users.push(res);
                this.saving = false;
                this.showAddUserArea = false;
                this.newUser = new UsersSchema();
            })
            .catch(e => {
                this.saving = false;
                this.error = e.json().message;
                throw e;
            })
    }

    public saveUser() {
        this.saving = true;
        this._service.save(this.edit)
            .then(() => {
                this.saving = false;
                delete this.edit;
            })
            .catch(e => {
                this.saving = false;
                this.error = e.json().message;
                throw e;
            })
    }

}
