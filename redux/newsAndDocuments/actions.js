import {
  SET_NEWS,
  SET_LATEST_NEWS,
  SET_DOCUMENTS,
  SET_ARTICLE_RELATED,
  CLEAR_NEWS_AND_DOCUMENTS,
  CLEAR_DOCUMENTS,
  CLEAR_NEWS,
  SET_MONTHS,
  SELECT_ALL_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  SELECT_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  SELECT_ORDER_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  CLEAR_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  INIT_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  APPLY_FILTER_NEWS_AND_DOCUMENTS,
  SET_SINGLE_ARTICLE,
  SET_SINGLE_ARTICLE_TYPE,
  SET_FEATURED_DOCUMENTS,
} from './constants';

const setNews = news => ({
  type: SET_NEWS,
  news,
});

const setLatestNews = latestNews => ({
  type: SET_LATEST_NEWS,
  latestNews,
});

const setFeaturedDocuments = featuredDocuments => ({
  type: SET_FEATURED_DOCUMENTS,
  featuredDocuments,
});

const setDocuments = documents => ({
  type: SET_DOCUMENTS,
  documents,
});

const setArticleRelated = relatedArticles => ({
  type: SET_ARTICLE_RELATED,
  relatedArticles,
});

const clearNewsAndDocuments = () => ({
  type: CLEAR_NEWS_AND_DOCUMENTS,
});

const clearNews = () => ({
  type: CLEAR_NEWS,
});

const clearDocuments = () => ({
  type: CLEAR_DOCUMENTS,
});

const setMonths = months => ({
  type: SET_MONTHS,
  months,
});

const selectAllMonthFilterNewsAndDocumentsTemp = () => ({
  type: SELECT_ALL_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP,
});

const selectMonthFilterNewsAndDocumentsTemp = id => ({
  type: SELECT_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  id,
});

const selectOrderFilterNewsAndDocumentsTemp = accessing => ({
  type: SELECT_ORDER_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  accessing,
});

const applyFilterNewsAndDocuments = () => ({
  type: APPLY_FILTER_NEWS_AND_DOCUMENTS,
});

const initFilterNewsAndDocumentsTemp = () => ({
  type: INIT_FILTER_NEWS_AND_DOCUMENTS_TEMP,
});

const clearFilterNewsAndDocumentsTemp = () => ({
  type: CLEAR_FILTER_NEWS_AND_DOCUMENTS_TEMP,
});

const setSingleArticle = singleArticle => ({
  type: SET_SINGLE_ARTICLE,
  singleArticle,
});

const setSingleArticleType = singleArticleType => ({
  type: SET_SINGLE_ARTICLE_TYPE,
  singleArticleType,
});

export default {
  setNews,
  setLatestNews,
  setFeaturedDocuments,
  setDocuments,
  setArticleRelated,
  clearNewsAndDocuments,
  clearNews,
  clearDocuments,
  setMonths,
  selectAllMonthFilterNewsAndDocumentsTemp,
  selectMonthFilterNewsAndDocumentsTemp,
  selectOrderFilterNewsAndDocumentsTemp,
  applyFilterNewsAndDocuments,
  initFilterNewsAndDocumentsTemp,
  clearFilterNewsAndDocumentsTemp,
  setSingleArticle,
  setSingleArticleType,
};
