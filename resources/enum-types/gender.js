import {LABEL_MALE, LABEL_FEMALE, LABEL_UNKNOWN} from '../string/strings';
export default {
  Male: {
    value: 0,
    type: 'Male',
    text: LABEL_MALE,
    defaultAvatar: {
      name: 'Male-2',
      type: 'Line',
    },
  },
  Female: {
    value: 1,
    type: 'Female',
    text: LABEL_FEMALE,
    defaultAvatar: {
      name: 'Female-2',
      type: 'Line',
    },
  },
  Default: {
    value: 2,
    type: 'Default',
    text: LABEL_UNKNOWN,
    defaultAvatar: {
      name: 'MaleFemale',
      type: 'Line',
    },
  },
  Unknown: {
    value: 2,
    type: 'Default',
    text: LABEL_UNKNOWN,
    defaultAvatar: {
      name: 'MaleFemale',
      type: 'Line',
    },
  },
};
