import api from '@services/remote/baseApi';
import withQuery from 'with-query';

// const GET_ALL_FEEDS =
//   '/manage-content/api/posts?Page=1&pageSize=15&IsPinnedPost=false&Order=Trending';

// const GET_PIN_POSTS =
//   '/manage-content/api/posts?Page=1&pageSize=15&IsPinnedPost=true&Order=Trending';

// {{url}}/manage-content/api/reactions/comment/1/haha

//GET==========================================================
export const getAllFeeds = async ({ page = 1, size = 15, order = 'Trending' } = {}) => {
  return api.get(withQuery(`/manage-content/api/posts?Page=${page}&pageSize=${size}&IsPinnedPost=false&Order=${order}`));
};

export const getPinPosts = async params => {
  return api.get(
    withQuery(`/manage-content/api/posts?Page=${params.page || 1}&pageSize=${params.pageSize || 15}&IsPinnedPost=true&Order=${params.order || 'Trending'}`,),
  );
};

export const getFeedById = async params => {
  api.post(withQuery(`/manage-content/api/posts/${params.id}/views`));
  return api.get(withQuery(`/manage-content/api/posts/${params.id}`));
};

export const reactFeed = async params => {
  // remove a feed reaction
  if (params.isDeleted) {
    if (params.isComment) {
      return api.delete(
        withQuery(`/manage-content/api/reactions/comment/${params.id}`),
      );
    }

    if (params.isFeed) {
      return api.delete(
        withQuery(`/manage-content/api/reactions/posts/${params.id}`),
      );
    }

    // add a feed reaction
  } else {
    if (params.isComment) {
      return api.post(
        withQuery(
          `/manage-content/api/reactions/comment/${params.id}/${params.action}`,
        ),
      );
    }

    if (params.isFeed) {
      return api.post(
        withQuery(
          `/manage-content/api/reactions/posts/${params.id}/${params.action}`,
        ),
      );
    }
  }
};

export const getCommentsByFeed = async params => {
  return api.get(
    withQuery(`/manage-content/api/comments/${params.feedId}?pageSize=10000`),
  );
};

export const addComment = async params => {
  return api.post(withQuery(`/manage-content/api/comments/${params.feedId}`), {
    content: params.content,
  });
};

export const addReply = async params => {
  return api.post(
    withQuery(`/manage-content/api/comments/${params.commentId}/replies`),
    {
      content: params.content,
    },
  );
};

export const getReactionsByFeed = async (feedId, type = 'post') => {
  return api.get(`/manage-content/api/reactions/${type}/${feedId}`);
};
