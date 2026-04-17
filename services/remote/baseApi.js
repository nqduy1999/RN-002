import axios from 'axios';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {store} from '../../../App';
import appOperations from '@redux/app/operations';
import authTokens from '@services/local/auth-tokens';
import {isString, isJson, toJson} from '@utils/Utils';
import {version} from '@resources/build_version/BuildVersion';

const api = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    common: {
      'Evehr-Application' : version, 
      'App-Id': DeviceInfo.getBundleId(),
      // 'App-Id': 'com.eve.staging.nestle',
      'App-Version': `${Platform.OS}-${DeviceInfo.getVersion()}`,
    },
  },
});
const DEBUG = process.env.NODE_ENV === 'development';
//show alert error server once time
//prevent to show multi alert when open app (load multi api)
var showAlertErrorServer = true;

api.interceptors.request.use(
  config => {
    /** In dev, intercepts request and logs it into console for dev */
    // if (DEBUG) {
    //   console.info('request config ', config);
    // }
    //disable loading for method GET
    if (config.method === 'get') {
      store.dispatch(appOperations.hideLoading());
    }
    return config;
  },
  error => {
    if (DEBUG) {
      console.log('🚀 ~ error', error);
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    if (DEBUG) {
      console.log('🚀 ~ response.data', response.data);
    }
    showAlertErrorServer = true;
    return response.data;
  },
  error => {
    if (DEBUG) {
      console.log('🚀 ~ error.response', error);
    }

    store.dispatch(appOperations.hideLoading());
    store.dispatch(
      appOperations.handlerErrors(error.response, showAlertErrorServer),
    );

    if (error.response && error.response.status >= 500) {
      showAlertErrorServer = false;
    } else {
      showAlertErrorServer = true;
    }

    return Promise.reject(error.response);
  },
);

export function setAuthorizationToken(token) {
  api.defaults.headers.common.Authorization = 'Bearer ' + token;
}
authTokens.getAccessToken().then(token => {
  if (token) {
    setAuthorizationToken(token);
  }
});

export function getAuthorizationToken() {
  return api.defaults.headers.common.Authorization;
}

export function removeAuthorizationToken() {
  delete api.defaults.headers.common.Authorization;
}
const miniTimer = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const diffDateTime = (diff, cur) => {
  let diffDate = new Date(cur);
  diffDate.setMilliseconds(diffDate.getMilliseconds() + diff);
  return diffDate.getTime();
};
const getDelayTime = (reqAt, delay) => {
  let delayTime = 0,
    delayTimeout = diffDateTime(delay, reqAt),
    now = new Date().getTime();
  if (delayTimeout > now) {
    delayTime = delayTimeout - now;
  }
  return delayTime;
};

export const apiRequest = async (
  method,
  apiPath,
  {body, header, delay, debug, auth, noTimeout, isFormData} = {},
) => {
  let result,
    config,
    url,
    reqAt = new Date().getTime();
  try {
    url = apiPath.startsWith('http') ? apiPath : Config.BASE_URL + apiPath;

    config = {
      method,
      url,
      timeout: isFormData || noTimeout ? 0 : 60000,
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        'App-Id': DeviceInfo.getBundleId(),
        ...(auth && {Authorization: getAuthorizationToken()}),
        ...header,
      },
      ...(method !== 'get' && {
        data: !isFormData && isJson(body) ? JSON.stringify(body) : body || '{}',
      }),
    };

    DEBUG && console.log('🚀 : apiRequest -> [config, body]:', [config, body]);

    result = await axios.request(config);

    DEBUG && console.log('🚀 : apiRequest -> result:', result);
  } catch (error) {
    DEBUG &&
      console.log('🚀 : apiRequest -> [method, url, body, error]:', [
        method,
        url,
        body,
        error,
      ]);
    if (error.response) {
      const {status, headers, data} = error.response;
      result = {
        status,
        headers,
        error: isString(data) ? toJson(data) || data : data,
      };
    } else {
      result = {error};
    }
    Object.assign(result, {method, url, body, config});
  }
  delay && (await miniTimer(getDelayTime(reqAt, delay)));
  return result;
};

export default api;
