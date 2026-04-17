import {createSelector} from 'reselect';

const authDomain = state => state.auth;

export const makeSelectCurrentUser = createSelector(
  authDomain,
  subState => subState.user,
);
