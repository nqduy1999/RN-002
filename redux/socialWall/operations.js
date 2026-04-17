import * as API from './api';
import * as actions from './actions';
import appOperations from '@redux/app/operations';
import _ from 'lodash';

export const getAllFeeds = (classify, params) => async (dispatch, getState) => {
  try {
    dispatch(actions.getAllFeeds(classify, params));
    const response = await API.getAllFeeds(params);
    dispatch(actions.getAllFeedsSuccess(classify, response));
  } catch (error) {
    dispatch(actions.getAllFeedsFailed(classify, error));
  }
};

export const getPinPosts = params => async (dispatch, getState) => {
  try {
    // dispatch(appOperations.showLoading());
    const response = await API.getPinPosts(params);
    console.log('pin post', response);
    // dispatch(actions.getPinPostsSuccess(response));
  } catch (error) {
    console.log('pin post error', error);

    dispatch(actions.getPinPostsFailed(error));
  } finally {
    // dispatch(appOperations.hideLoading());
  }
};

export const getFeedById = params => async (dispatch, getState) => {
  try {
    dispatch(actions.getFeedById(params));
    const response = await API.getFeedById(params);
    dispatch(actions.getFeedByIdSuccess(response));
  } catch (error) {
    dispatch(actions.getFeedByIdFailed(error));
  }
};

export const reactFeed = params => async (dispatch, getState) => {
  try {
    dispatch(actions.reactFeed(params));
    // dispatch(appOperations.showLoading());
    const result = await API.reactFeed(params);
    dispatch(
      actions.reactFeedSuccess({
        params,
        topReactions: result.topReactions,
      }),
    );
  } catch (error) {
    dispatch(actions.reactFeedFailed(error));
  }
};

export const getCommentsByFeed = params => async (dispatch, getState) => {
  try {
    // dispatch(appOperations.showLoading());
    const response = await API.getCommentsByFeed(params);
    dispatch(actions.getCommentsByFeedSuccess(response));
  } catch (error) {
    dispatch(actions.getCommentsByFeedFailed(error));
  } finally {
    // dispatch(appOperations.hideLoading());
  }
};

export const addComment = params => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    const response = await API.addComment(params);

    dispatch(
      getCommentsByFeed({
        feedId: params.feedId,
      }),
    );
    dispatch(actions.addCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(actions.addCommentFailed(error));
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

export const addReply = params => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    const response = await API.addReply(params);

    dispatch(
      getCommentsByFeed({
        feedId: params.feedId,
      }),
    );
    dispatch(actions.addReplySuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(actions.addReplyFailed(error));
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

export const getReactions = (feedId, type) => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    dispatch(actions.getReactions(feedId));
    const response = await API.getReactionsByFeed(feedId, type);
    // only show reactions with employees length larger than 0
    const reactions = response.reduce((acc, cur) => {
      if (_.size(cur.employees) > 0) {
        return [...acc, cur];
      }
      return acc;
    }, []);
    dispatch(actions.getReactionsSuccess(reactions));
  } catch (error) {
    dispatch(actions.getReactionsFailed(error));
  }
};
