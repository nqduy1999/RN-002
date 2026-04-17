import _ from 'lodash';
import * as socialWallContants from './constants';

const defaultState = {
  loading: false,
  allPinPosts: {},
  feedDetail: {},
  allComments: {},
  allReactions: [],
  isDisplayReaction: false,
  comment: {
    isFocus: false,
    isReply: false,
  },
  tempReaction: '',
  content: {},
  fetching: {},
  pagination: {},
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case socialWallContants.GET_ALL_FEEDS: {
      const { classify, params } = action;
      return {
        ...state,
        fetching: { ...state.fetching, [classify]: true },
        pagination: { ...state.pagination, [classify]: null },
        content: { ...state.content, [classify]: params && params.page === 1 ? [] : state.content[classify] },
      };
    }
    case socialWallContants.GET_ALL_FEEDS_SUCCESS: {
      const { classify, payload } = action;
      const { items, ...pagination } = payload;
      return {
        ...state,
        fetching: { ...state.fetching, [classify]: false },
        pagination: { ...state.pagination, [classify]: pagination },
        content: { ...state.content, [classify]: [...state.content[classify], ...items] },
      };
    }
    case socialWallContants.GET_ALL_FEEDS_FAILED: {
      const { classify } = action;
      return {
        ...state,
        fetching: { ...state.fetching, [classify]: false },
      };
    }
    case socialWallContants.GET_PIN_POSTS:
      return { ...state };
    case socialWallContants.GET_PIN_POSTS_SUCCESS:
      return {
        ...state,
        allPinPosts: action.payload,
      };
    case socialWallContants.GET_PIN_POSTS_FAILED:
      return { ...state };

    case socialWallContants.GET_FEED_BY_ID:
      // console.log('Get feed by id');
      // console.log(action.params);
      return {
        ...state,
        feedDetail: _.find(state.content.feeds || [], row => row.id === action.params.id) || {},
        allComments: {},
      };
    case socialWallContants.GET_FEED_BY_ID_SUCCESS:
      return {
        ...state,
        feedDetail: action.payload,
      };
    case socialWallContants.GET_FEED_BY_ID_FAILED:
      return { ...state };

    case socialWallContants.REACT_FEED: {
      // console.log('React feed');
      // console.log(action.params);
      const {
        isComment,
        isFeed,
        id,
        userReaction: oldReaction,
        action: userReaction,
        isDeleted,
      } = action.params;

      if (isFeed) {
        const updatedFeeds = _.map(state.content.feeds || [], _.clone);

        const feed = _.find(updatedFeeds, row => row.id === id);
        if (feed) {
          const totalReaction =
            oldReaction && !isDeleted
              ? feed.totalReaction
              : feed.totalReaction + (isDeleted ? -1 : 1);
          feed.userReaction = isDeleted ? null : userReaction;
          feed.totalReaction = totalReaction;

          const updatedFeedDetail = _.cloneDeep(state.feedDetail);
          if (updatedFeedDetail.id === id) {
            updatedFeedDetail.userReaction = isDeleted ? null : userReaction;
            updatedFeedDetail.totalReaction = totalReaction;
          }

          return {
            ...state,
            content: { ...state.content, feeds: updatedFeeds },
            feedDetail: updatedFeedDetail,
          };
        }
      }

      if (isComment) {
        const updatedComments = _.map(state.allComments.items || [], _.clone);

        const idx = _.findIndex(updatedComments, row => row.id === id);

        if (idx > -1) {
          const updatedComment = updatedComments[idx];
          const totalReaction =
            oldReaction && !isDeleted
              ? updatedComment.totalReaction
              : updatedComment.totalReaction + (isDeleted ? -1 : 1);
          updatedComment.userReaction = userReaction;
          updatedComment.totalReaction = totalReaction;

          return {
            ...state,
            allComments: {
              ...state.allComments,
              items: updatedComments,
            },
          };
        }
      }
      return { ...state };
    }

    case socialWallContants.REACT_FEED_SUCCESS: {
      const {
        isComment,
        isFeed,
        id,
        action: userReaction,
        isDeleted,
      } = action.payload.params;
      const topReactions = action.payload.topReactions;
      if (isFeed) {
        const updatedFeeds = _.map(state.content.feeds || [], _.clone);

        const feed = _.find(updatedFeeds, row => row.id === id);
        if (feed) {
          feed.topReactions = topReactions;

          const updatedFeedDetail = _.cloneDeep(state.feedDetail);
          if (updatedFeedDetail.id === id) {
            updatedFeedDetail.topReactions = topReactions;
          }

          return {
            ...state,
            content: { ...state.content, feeds: updatedFeeds },
            feedDetail: updatedFeedDetail,
          };
        }
      }

      if (isComment) {
        const updatedComments = _.map(state.allComments.items || [], _.clone);

        const idx = _.findIndex(updatedComments, row => row.id === id);

        if (idx > -1) {
          updatedComments[idx].topReactions = topReactions;

          return {
            ...state,
            allComments: {
              ...state.allComments,
              items: updatedComments,
            },
          };
        }
      }
      return { ...state };
    }

    case socialWallContants.REACT_FEED_FAILED:
      return { ...state };

    case socialWallContants.GET_COMMENTS_BY_FEED:
      return { ...state };
    case socialWallContants.GET_COMMENTS_BY_FEED_SUCCESS:
      return {
        ...state,
        allComments: action.payload,
      };
    case socialWallContants.GET_COMMENTS_BY_FEED_FAILED:
      return { ...state };
    case socialWallContants.ADD_COMMENT:
      return { ...state };

    case socialWallContants.ADD_COMMENT_SUCCESS:
      const { feedDetail, content } = state;
      feedDetail.totalComment += 1;
      // update wall list
      let feeds = content.feeds;
      const post = feeds.find(item => item.id === feedDetail.id);
      if (post) {
        post.totalComment = feedDetail.totalComment;
      }
      return {
        ...state,
        content: { ...state.comment, feeds },
        feedDetail: _.clone(feedDetail),
      };
    case socialWallContants.ADD_COMMENT_FAILED:
      return { ...state };
    case socialWallContants.ADD_REPLY:
      return { ...state };
    case socialWallContants.ADD_REPLY_SUCCESS:
      return { ...state };
    case socialWallContants.ADD_REPLY_FAILED:
      return { ...state };

    case socialWallContants.SET_COMMENT:
      return {
        ...state,
        comment: action.params,
      };
    case socialWallContants.SET_DISPLAY_REACTION:
      return {
        ...state,
        isDisplayReaction: action.payload,
      };
    case socialWallContants.GET_REACTIONS:
      return { ...state, allReactions: [] };
    case socialWallContants.GET_REACTIONS_SUCCESS:
      return {
        ...state,
        allReactions: action.payload,
      };
    case socialWallContants.GET_REACTIONS_FAILED:
      return { ...state };
    case socialWallContants.SET_HOME_LOADING:
      return { ...state, loading: action.status };
    case socialWallContants.SET_TEM_REACTION:
      return {
        ...state,
        tempReaction: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reduce;
