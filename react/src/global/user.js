
export class User {
    static _token = 0;

    static get token() {
        return this._token;
    }

    static set token(value) {
        if (this._token !== value) {
            this._token = value;
        }
    }

}
