import * as socialWallContants from './constants';

export const getAllFeeds = (classify, params) => ({
  type: socialWallContants.GET_ALL_FEEDS,
  classify, params,
});

export const getAllFeedsSuccess = (classify, payload) => ({
  type: socialWallContants.GET_ALL_FEEDS_SUCCESS,
  classify, payload,
});

export const getAllFeedsFailed = (classify, error) => ({
  type: socialWallContants.GET_ALL_FEEDS_FAILED,
  classify, error,
});

export const getPinPosts = params => ({
  type: socialWallContants.GET_PIN_POSTS,
  params,
});

export const getPinPostsSuccess = payload => ({
  type: socialWallContants.GET_PIN_POSTS_SUCCESS,
  payload,
});

export const getPinPostsFailed = error => ({
  type: socialWallContants.GET_PIN_POSTS_FAILED,
  error,
});

export const getFeedById = params => ({
  type: socialWallContants.GET_FEED_BY_ID,
  params,
});

export const getFeedByIdSuccess = payload => ({
  type: socialWallContants.GET_FEED_BY_ID_SUCCESS,
  payload,
});

export const getFeedByIdFailed = error => ({
  type: socialWallContants.GET_FEED_BY_ID_FAILED,
  error,
});

export const reactFeed = params => ({
  type: socialWallContants.REACT_FEED,
  params,
});

export const reactFeedSuccess = payload => ({
  type: socialWallContants.REACT_FEED_SUCCESS,
  payload,
});

export const reactFeedFailed = error => ({
  type: socialWallContants.REACT_FEED_FAILED,
  error,
});

export const getCommentsByFeed = params => ({
  type: socialWallContants.GET_COMMENTS_BY_FEED,
  params,
});

export const getCommentsByFeedSuccess = payload => ({
  type: socialWallContants.GET_COMMENTS_BY_FEED_SUCCESS,
  payload,
});

export const getCommentsByFeedFailed = error => ({
  type: socialWallContants.GET_COMMENTS_BY_FEED_FAILED,
  error,
});

export const addComment = params => ({
  type: socialWallContants.ADD_COMMENT,
  params,
});

export const addCommentSuccess = payload => ({
  type: socialWallContants.ADD_COMMENT_SUCCESS,
  payload,
});

export const addCommentFailed = error => ({
  type: socialWallContants.ADD_COMMENT_FAILED,
  error,
});

export const addReply = params => ({
  type: socialWallContants.ADD_COMMENT,
  params,
});

export const addReplySuccess = payload => ({
  type: socialWallContants.ADD_COMMENT_SUCCESS,
  payload,
});

export const addReplyFailed = error => ({
  type: socialWallContants.ADD_COMMENT_FAILED,
  error,
});

export const setComment = params => ({
  type: socialWallContants.SET_COMMENT,
  params,
});

export const setDisplayReaction = payload => ({
  type: socialWallContants.SET_DISPLAY_REACTION,
  payload,
});

export const getReactions = params => ({
  type: socialWallContants.GET_REACTIONS,
  params,
});

export const getReactionsSuccess = payload => ({
  type: socialWallContants.GET_REACTIONS_SUCCESS,
  payload,
});

export const getReactionsFailed = error => ({
  type: socialWallContants.GET_REACTIONS_FAILED,
  error,
});

export const setTempReact = payload => ({
  type: socialWallContants.SET_TEM_REACTION,
  payload,
});
