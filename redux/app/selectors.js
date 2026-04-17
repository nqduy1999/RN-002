import {createSelector} from 'reselect';

const socialWallDomain = state => state.app;

export const getLanguage = createSelector(
  socialWallDomain,
  subState => subState.language,
);

export const getLoading = createSelector(
  socialWallDomain,
  subState => subState?.isLoading || false,
);
