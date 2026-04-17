import {combineReducers} from 'redux';
import auth from './auth/index';
import app from './app/index';
import recognition from './recognition/index';
import newsAndDocuments from './newsAndDocuments/index';
import notifications from './notifications/index';
import wallet from './wallet/index';
import profile from './profile/index';
import flexibleBenefits from './flexibleBenefits/index';
import socialWall from './socialWall';
import {reducer as network} from 'react-native-offline';

const reducers = combineReducers({
  auth,
  app,
  recognition,
  network,
  newsAndDocuments,
  notifications,
  wallet,
  profile,
  flexibleBenefits,
  socialWall,
});

export default reducers;
