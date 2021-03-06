import { Injectable }       from '@angular/core';

import { UserRole } from 'both/models';

@Injectable()
export class LoginService {

  constructor() {}
 
  registerOwner(email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const userId = Accounts.createUser({email: email, password: '******', profile: { role: UserRole.OWNER }}, (e: Error) => {
        if (e) {
          return reject(e);
        }

        resolve();
      });
    });
  }

  loginOwner(email: string, pass: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword({ email: email }, pass, (e: Error) => {
        if (e) {
          return reject(e);
        }
     
        resolve();
      });
    });
  }
 
  loginPartner(email: string, pass: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword({ email: email }, pass, (e: Error) => {
        if (e) {
          return reject(e);
        }
     
        resolve();
      });
    });
  }
 
  loginClient(phone: string, code: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword({ username: phone }, code, (e: Error) => {
        if (e) {
          return reject(e);
        }
     
        resolve();
      });
    });
  }
 
  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((e: Error) => {
        if (e) {
          return reject(e);
        }
 
        resolve();
      });
    });
  }

}