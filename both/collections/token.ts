import { MongoObservable } from 'meteor-rxjs';

import { UserRole, Token } from '../models';
import { Users }           from '.';
 
export const Tokens = new MongoObservable.Collection <Token> ('tokens');

Tokens.allow({
  insert: byPartner,
  update: byPartner,
  remove: byPartner
});

function byPartner(userId, offer) {
  const user = userId && Users.collection.findOne(userId);
  return user && user.profile 
    && user.profile.role == UserRole.PARTNER 
    && offer._createdBy === userId;
}
