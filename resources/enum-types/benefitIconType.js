import {
  SVG_ICON_BIRTHDAY,
  SVG_ICON_WEDDING,
  SVG_ICON_PARENTAL,
  SVG_ICON_HEALTHCARE_PLAN,
  SVG_ICON_MEDICAL_CHECK_UP,
  SVG_ICON_DEFAULT_BENEFIT,
} from '../images';
import {
  LABEL_FLEXIBLE_BENEFITS_BIRTHDAY,
  LABEL_FLEXIBLE_BENEFITS_WEDDING,
  LABEL_FLEXIBLE_BENEFITS_PARENTAL,
  LABEL_FLEXIBLE_BENEFITS_HEALTHCARE_PLAN,
  LABEL_FLEXIBLE_BENEFITS_MEDICAL_CHECK_UP,
} from '../string/strings';

export default {
  Birthday: {
    icon: {
      source: SVG_ICON_BIRTHDAY,
    },
    text: LABEL_FLEXIBLE_BENEFITS_BIRTHDAY,
  },
  Wedding: {
    icon: {
      source: SVG_ICON_WEDDING,
    },
    text: LABEL_FLEXIBLE_BENEFITS_WEDDING,
  },
  Parental: {
    icon: {
      source: SVG_ICON_PARENTAL,
    },
    text: LABEL_FLEXIBLE_BENEFITS_PARENTAL,
  },
  'Healthcare Plan': {
    icon: {
      source: SVG_ICON_HEALTHCARE_PLAN,
    },
    text: LABEL_FLEXIBLE_BENEFITS_HEALTHCARE_PLAN,
  },
  'Medical Check up': {
    icon: {
      source: SVG_ICON_MEDICAL_CHECK_UP,
    },
    text: LABEL_FLEXIBLE_BENEFITS_MEDICAL_CHECK_UP,
  },
  Default: {
    icon: {
      source: SVG_ICON_DEFAULT_BENEFIT,
    },
    text: undefined,
  },
};
