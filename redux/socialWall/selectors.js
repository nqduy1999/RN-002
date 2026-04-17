import {createSelector} from 'reselect';

const socialWallDomain = state => state.socialWall;

export const makeSelectFeeds = createSelector(
  socialWallDomain,
  subState => subState.content.feeds,
);

export const feedsFetching = createSelector(
  socialWallDomain,
  subState => subState.fetching.feeds,
);

export const feedsPagination = createSelector(
  socialWallDomain,
  subState => subState.pagination.feeds,
);

export const makeSelectAllPinPosts = createSelector(
  socialWallDomain,
  subState => subState.allPinPosts,
);

export const makeSelectFeedDetail = createSelector(
  socialWallDomain,
  subState => subState.feedDetail,
);

export const makeSelectAllComments = createSelector(
  socialWallDomain,
  subState => subState.allComments,
);

export const makeSelectComment = createSelector(
  socialWallDomain,
  subState => subState.comment,
);

export const makeDisplayReactionView = createSelector(
  socialWallDomain,
  subState => subState.isDisplayReaction,
);

export const makeReactions = createSelector(
  socialWallDomain,
  subState => subState.allReactions,
);

export const getTempReaction = createSelector(
  socialWallDomain,
  subState => subState.tempReaction,
);
