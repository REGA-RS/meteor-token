import { MeteorObservable }             from 'meteor-rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { Owners }            from 'both/collections';
import { ServiceLoginOwner } from 'imports/services';

@Component({
  templateUrl: './owner-login-page.html'
})
export class OwnerLoginPage implements OnInit, OnDestroy {
  
  email: string;
  pass: string;

  paramsSub: Subscription;
  ownerSub: Subscription;

  constructor(
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly service: ServiceLoginOwner
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['_id'])
    .subscribe(_id => {

      this.ownerSub = MeteorObservable.subscribe('owner', _id).subscribe(() => {
        const owner = Owners.findOne(_id);
        if (! owner) {
          this.handleError(new Error('Пользователь не найден!'));
          return;
        }

        this.email = owner.emails && owner.emails[0].address;
        if (!this.email) {
          this.handleError(new Error('Email пользователя не задан!'));
        }
      });

    });
  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.login();
    }
  }
 
  login(): void {
    if (! this.valid()) {
      return;
    }

    if (! this.email) {
      this.handleError(new Error('Email пользователя не задан!'));
      return;
    }

    this.service.loginOwner(this.email, this.pass)
    .then(() => {
      this.router.navigate(['/owner']);
    })
    .catch((e) => {
      this.handleError(e);
    })
  }
 
  valid(): boolean {
    return !! this.pass;
  }

  ngOnDestroy() {
    if (this.paramsSub) this.paramsSub.unsubscribe();
    if (this.ownerSub)  this.ownerSub.unsubscribe();
  }

  handleError(e: Error): void {
    console.error(e);
    alert('Ошибка: ' + e.message);
  }

}