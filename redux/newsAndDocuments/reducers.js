import {
  SET_ARTICLE_RELATED,
  SET_NEWS,
  SET_LATEST_NEWS,
  SET_DOCUMENTS,
  CLEAR_NEWS_AND_DOCUMENTS,
  SELECT_ALL_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  SELECT_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  SELECT_ORDER_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  APPLY_FILTER_NEWS_AND_DOCUMENTS,
  SET_MONTHS,
  CLEAR_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  INIT_FILTER_NEWS_AND_DOCUMENTS_TEMP,
  SET_SINGLE_ARTICLE_TYPE,
  SET_SINGLE_ARTICLE,
  CLEAR_NEWS,
  CLEAR_DOCUMENTS,
  SET_FEATURED_DOCUMENTS,
} from './constants';

const defaultState = {
  news: {
    data: [],
    page: 1,
    pageSize: 8,
    type: 0,
    status: 1,
    hasNext: true,
    sortDirections: 'OrderByDescending',
    accessing: false,
    sortNames: 'CreatedAt',
  },
  latestNews: {
    data: [],
  },
  featuredDocuments: {
    data: [],
  },
  documents: {
    data: [],
    page: 1,
    pageSize: 8,
    type: 1,
    status: 1,
    hasNext: true,
    sortDirections: 'OrderByDescending',
    accessing: false,
    sortNames: 'CreatedAt',
  },
  filter: {
    accessing: undefined,
    months: [],
  },
  filterTemp: {
    accessing: undefined,
    months: [],
  },
  months: [],
  singleArticle: {},
  singleArticleType: 0,
  relatedArticles: [],
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case CLEAR_NEWS_AND_DOCUMENTS:
      return {
        ...defaultState,
        featuredDocuments: state.featuredDocuments,
        latestNews: state.latestNews,
      };
    case CLEAR_NEWS:
      return {
        ...state,
        news: defaultState.news,
      };
    case CLEAR_DOCUMENTS:
      return {
        ...state,
        documents: defaultState.documents,
      };
    case SET_DOCUMENTS:
      if (action.documents.page) {
        if (action.documents.page <= state.documents.page) {
          return state;
        }
      }
      return {
        ...state,
        documents: {
          ...state.documents,
          ...action.documents,
          data: [...state.documents.data, ...action.documents.data],
        },
      };
    case SET_NEWS:
      if (action.news.page) {
        if (action.news.page <= state.news.page) {
          return state;
        }
      }
      return {
        ...state,
        news: {
          ...state.news,
          ...action.news,
          data: [...state.news.data, ...action.news.data],
        },
      };
    case SET_LATEST_NEWS:
      return {
        ...state,
        latestNews: action.latestNews,
      };
    case SET_FEATURED_DOCUMENTS:
      return {
        ...state,
        featuredDocuments: action.featuredDocuments,
      };
    case SET_MONTHS:
      return {
        ...state,
        months: action.months,
      };
    case INIT_FILTER_NEWS_AND_DOCUMENTS_TEMP:
      return {
        ...state,
        filterTemp: state.filter,
      };
    case APPLY_FILTER_NEWS_AND_DOCUMENTS:
      return {
        ...state,
        filter: state.filterTemp,
      };
    case CLEAR_FILTER_NEWS_AND_DOCUMENTS_TEMP:
      return {
        ...state,
        filterTemp: defaultState.filterTemp,
      };
    case SELECT_ALL_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP:
      return {
        ...state,
        filterTemp: {
          ...state.filterTemp,
          months: [],
        },
      };
    case SELECT_MONTH_FILTER_NEWS_AND_DOCUMENTS_TEMP:
      return {
        ...state,
        filterTemp: {
          ...state.filterTemp,
          months:
            state.filterTemp.months.findIndex(item => item === action.id) !== -1
              ? state.filterTemp.months.filter(item => item !== action.id)
              : [...state.filterTemp.months, action.id],
        },
      };
    case SELECT_ORDER_FILTER_NEWS_AND_DOCUMENTS_TEMP:
      return {
        ...state,
        filterTemp: {
          ...state.filterTemp,
          accessing: action.accessing,
        },
      };
    case SET_SINGLE_ARTICLE_TYPE:
      return {
        ...state,
        singleArticleType: action.singleArticleType,
      };
    case SET_SINGLE_ARTICLE:
      return {
        ...state,
        singleArticle: action.singleArticle,
      };
    case SET_ARTICLE_RELATED:
      return {
        ...state,
        relatedArticles: action.relatedArticles,
      };
    default:
      return state;
  }
};

export default reduce;
