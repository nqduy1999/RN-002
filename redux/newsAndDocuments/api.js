import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import withQuery from 'with-query';

//GET==========================================================
const getNewsAndDocuments = async params => {
  return api.get(withQuery(apiEndpoints.GET_NEWS_AND_DOCUMENTS, params));
};

const getArticleRelated = async id => {
  return api.get(`${apiEndpoints.GET_ARTICLE_RELATED}${id}`);
};

//POST==========================================================

export default {
  getNewsAndDocuments,
  getArticleRelated,
};
