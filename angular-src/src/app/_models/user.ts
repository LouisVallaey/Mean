export class User {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword:string ="";
    firstName: string;
    lastName: string;
    roles: string[];
    constructor(username: string,email: string,password: string,firstName: string,lastName: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;    
    }
}