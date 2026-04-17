import actions from './actions';
import appOperations from '../app/operations';
import api from './api';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import authOperations from '../auth/operations';
import {isUnauthorized} from '../helpers/errorHandler';
import {commonConfig} from '../../config';
import Config from 'react-native-config';
import authTokens from '@services/local/auth-tokens';

const initNewsAndDocumentsPage = () => async dispatch => {
  dispatch(appOperations.showLoading());
  await Promise.all([
    dispatch(getNews()),
    dispatch(getDocuments()),
    dispatch(initFilterNewsAndDocuments()),
  ]);
  dispatch(appOperations.hideLoading());
};

const getNews = params => async (dispatch, getState) => {
  try {
    const {
      page,
      pageSize,
      type,
      status,
      hasNext,
      sortDirections,
      sortNames,
    } = getState().newsAndDocuments.news;
    if (hasNext) {
      let response = await api.getNewsAndDocuments({
        page,
        pageSize,
        type,
        status,
        hasNext,
        sortDirections,
        sortNames,
      });
      const {items, totalPage} = response;
      return dispatch(
        actions.setNews({
          data: items,
          hasNext: page < totalPage,
          page: page + 1,
        }),
      );
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  }
};

const getLatestNews = () => async (dispatch, getState) => {
  try {
    const response = await api.getNewsAndDocuments({
      page: 1,
      pageSize: commonConfig.LOAD_LATEST_NEWS,
      type: 0, //news
      status: 1,
      sortDirections: 'OrderByDescending',
      sortNames: 'CreatedAt',
    });
    if (response) {
      return dispatch(
        actions.setLatestNews({
          data: response.items,
        }),
      );
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  }
};

const getFeaturedDocuments = () => async (dispatch, getState) => {
  try {
    const response = await api.getNewsAndDocuments({
      page: 1,
      pageSize: commonConfig.LOAD_LATEST_NEWS,
      type: 1, //news
      status: 1,
      sortDirections: 'OrderByDescending',
      sortNames: 'CreatedAt',
    });
    if (response) {
      return dispatch(
        actions.setFeaturedDocuments({
          data: response.items,
        }),
      );
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  }
};

const getDocuments = params => async (dispatch, getState) => {
  try {
    const {
      page,
      pageSize,
      type,
      status,
      hasNext,
      sortDirections,
      sortNames,
    } = getState().newsAndDocuments.documents;
    if (hasNext) {
      let response = await api.getNewsAndDocuments({
        page,
        pageSize,
        type,
        status,
        hasNext,
        sortDirections,
        sortNames,
      });
      const {items, totalPage} = response;
      return dispatch(
        actions.setDocuments({
          data: items,
          hasNext: page < totalPage,
          page: page + 1,
        }),
      );
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  }
};

const loadMoreNews = currentPage => async (dispatch, getState) => {
  const {page, hasNext} = getState().newsAndDocuments.news;
  if (page !== currentPage && !hasNext) {
    return;
  }
  dispatch(appOperations.showLoading());
  dispatch(getNews());
  dispatch(appOperations.hideLoading());
};

const loadMoreDocuments = currentPage => async (dispatch, getState) => {
  const {page, hasNext} = getState().newsAndDocuments.documents;
  if (page !== currentPage && !hasNext) {
    return;
  }
  dispatch(appOperations.showLoading());
  dispatch(getDocuments());
  dispatch(appOperations.hideLoading());
};

const clearNewsAndDocuments = () => dispatch => {
  return dispatch(actions.clearNewsAndDocuments());
};

const initFilterNewsAndDocuments = () => dispatch => {
  let current = moment().add(1, 'month');
  const months = [...Array(12)].map((item, index) => {
    return {
      id: index,
      name: current.subtract(1, 'month').format('MMM YYYY'),
      date: moment(current),
    };
  });
  return dispatch(actions.setMonths(months));
};

const applyFilterNewsAndDocuments = () => async (dispatch, getState) => {
  let filterAccessing = getState().newsAndDocuments.filterTemp.accessing;
  let currentAccessing = getState().newsAndDocuments.news.accessing;
  if (filterAccessing === currentAccessing) {
    return dispatch(actions.applyFilterNewsAndDocuments());
  } else {
    dispatch(actions.clearNews());
    await dispatch(actions.clearDocuments());
    await dispatch(
      actions.setNews({
        accessing: filterAccessing,
        sortDirections: filterAccessing
          ? 'OrderByAccessing'
          : 'OrderByDescending',
        data: [],
      }),
    );
    await dispatch(
      actions.setDocuments({
        accessing: filterAccessing,
        sortDirections: filterAccessing
          ? 'OrderByAccessing'
          : 'OrderByDescending',
        data: [],
      }),
    );
    dispatch(appOperations.showLoading());
    await Promise.all([dispatch(getNews()), dispatch(getDocuments())]);
    dispatch(appOperations.hideLoading());
    return dispatch(actions.applyFilterNewsAndDocuments());
  }
};

const selectMonthFilterNewsAndDocumentsTemp = id => dispatch => {
  return dispatch(actions.selectMonthFilterNewsAndDocumentsTemp(id));
};

const selectAllMonthFilterNewsAndDocumentsTemp = () => dispatch => {
  return dispatch(actions.selectAllMonthFilterNewsAndDocumentsTemp());
};

const selectOrderFilterNewsAndDocumentsTemp = accessing => dispatch => {
  return dispatch(actions.selectOrderFilterNewsAndDocumentsTemp(accessing));
};

const clearFilterNewsAndDocumentsTemp = () => dispatch => {
  return dispatch(actions.clearFilterNewsAndDocumentsTemp());
};

const initFilterNewsAndDocumentsTemp = () => dispatch => {
  return dispatch(actions.initFilterNewsAndDocumentsTemp());
};

const setSingleArticleType = type => async dispatch => {
  await dispatch(actions.setSingleArticleType(type));
  dispatch(appOperations.showLoading());
  if (type === 0) {
    await dispatch(refreshNews());
  } else {
    await dispatch(refreshDocuments());
  }
  dispatch(appOperations.hideLoading());
};

const refreshNews = () => async dispatch => {
  await dispatch(actions.clearNews());
  dispatch(getLatestNews());
  dispatch(getNews());
};

const refreshDocuments = () => async dispatch => {
  await dispatch(actions.clearDocuments());
  dispatch(getFeaturedDocuments());
  dispatch(getDocuments());
};

const setSingleArticle = item => dispatch => {
  return dispatch(actions.setSingleArticle(item));
};

const getArticleRelated = () => async (dispatch, getState) => {
  const {singleArticle} = getState().newsAndDocuments;
  dispatch(appOperations.showLoading());
  try {
    const response = await api.getArticleRelated(singleArticle.id);
    if (response) {
      dispatch(actions.setArticleRelated(response));
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const startDownloadDocuments = url => async dispatch => {
  if (Platform.OS === 'android') {
    return check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
      if (result === RESULTS.GRANTED) {
        return downloadFile(url, dispatch);
      } else if (result === RESULTS.DENIED) {
        return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
          resultRequest => {
            if (resultRequest === RESULTS.GRANTED) {
              return downloadFile(url, dispatch);
            }
          },
        );
      }
    });
  } else {
    return downloadFile(url, dispatch);
  }
};
const downloadFile = async (url, dispatch) => {
  dispatch(appOperations.showLoading());
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  const {config, fs} = RNFetchBlob;
  const path = `${
    Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir
  }/${fileName}`;

  var token = await authTokens.getAccessToken();
  let options = {
    fileCache: true,
    path: path,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: false,
      title: fileName,
      path: path,
    },
  };

  var urlDownLoad =
    Config.BASE_URL +
    'manage-content/api/upload-s3/download-s3-file?FileUrl=' +
    url;

  return config(options)
    .fetch('GET', urlDownLoad, {Authorization: 'Bearer ' + token})
    .then(async res => {
      await dispatch(appOperations.hideLoading());

      setTimeout(() => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.path());
        } else {
          RNFetchBlob.android.actionViewIntent(res.path());
        }
      }, 1000);
      
    })
    .catch(error => {
      dispatch(appOperations.hideLoading());
    });
};
export default {
  getLatestNews,
  getFeaturedDocuments,
  loadMoreNews,
  loadMoreDocuments,
  initNewsAndDocumentsPage,
  clearNewsAndDocuments,
  initFilterNewsAndDocumentsTemp,
  clearFilterNewsAndDocumentsTemp,
  selectAllMonthFilterNewsAndDocumentsTemp,
  selectMonthFilterNewsAndDocumentsTemp,
  selectOrderFilterNewsAndDocumentsTemp,
  applyFilterNewsAndDocuments,
  setSingleArticleType,
  setSingleArticle,
  getArticleRelated,
  startDownloadDocuments,
  refreshNews,
  refreshDocuments,
};
