import {
  LIGHT_LIGHT_GREEN_COLOR,
  ACCENT_COLOR,
  LIGHT_GRAY_COLOR_2,
  TEXT_GRAY_COLOR,
  DANGEROUS_COLOR,
} from '../palette';
import {LABEL_REGISTERED, LABEL_INACTIVE, LABEL_OPTIONAL, LABEL_COMMING_SOON, LABEL_OPEN_FOR_REGISTRATION, LABEL_IN_PROGRESS, LABEL_FINISHED, LABEL_TRADE_NOW} from '../string/strings';

export default {
  Registered: {
    backgroundColor: LIGHT_LIGHT_GREEN_COLOR,
    textColor: ACCENT_COLOR,
    text: LABEL_REGISTERED,
    type: 'Registered',
  },
  Inactive: {
    backgroundColor: LIGHT_GRAY_COLOR_2,
    textColor: TEXT_GRAY_COLOR,
    text: LABEL_INACTIVE,
    type: 'Inactive',
  },
  Optional: {
    backgroundColor: '#FFE8D3',
    textColor: '#F86D09',
    text: LABEL_OPTIONAL,
    type: 'Optional'
  },
  ComingSoon: {
    backgroundColor: LIGHT_LIGHT_GREEN_COLOR,
    textColor: ACCENT_COLOR,
    text: LABEL_COMMING_SOON,
    type: 'ComingSoon',
  },
  OpenForRegistration: {
    backgroundColor: LIGHT_LIGHT_GREEN_COLOR,
    textColor: ACCENT_COLOR,
    text: LABEL_OPEN_FOR_REGISTRATION,
    type: 'OpenForRegistration',
  },
  InProgress: {
    backgroundColor: '#FFE8D3',
    textColor: '#F86D09',
    text: LABEL_IN_PROGRESS,
    type: 'InProgress'
  },
  Pending: {
    backgroundColor: '#FFE8D3',
    textColor: '#F86D09',
    text: LABEL_IN_PROGRESS,
    type: 'Pending'
  },
  Closed: {
    backgroundColor: '#FFD6D6',
    textColor: DANGEROUS_COLOR,
    text: LABEL_FINISHED,
    type: 'Closed'
  },
  Trade: {
    borderColor: DANGEROUS_COLOR,
    textColor: DANGEROUS_COLOR,
    text: LABEL_TRADE_NOW,
    type: 'Trade'
  },
};