export class RegisterHomeOwnerData {
    name: string;
    surname: string;
    email: string;
    password: string;
    photo: string;
  
    constructor(name: string, surname: string, email: string, password: string, photo: string) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.password = password;
      this.photo = photo;
    }
  }
  