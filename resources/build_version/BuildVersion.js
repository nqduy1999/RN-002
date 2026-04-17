import Config from 'react-native-config';

const versions = {
  aia: require('@resources/build_version/aia').default,
  generic: require('@resources/build_version/generic').default,
  dhl: require('@resources/build_version/dhl').default,
  athena: require('@resources/build_version/athena').default,
  pepsi: require('@resources/build_version/pepsi').default,
  nestle: require('@resources/build_version/nestle').default,
};

export const version =
  versions[Config.CURRENT_BUILD_VERSION]?.setting?.version ?? 'generic';

export const IS = {
  stg: Config.BASE_URL.includes('staging'),
  oneOf: (...list) => list.includes(version),
  GENERIC: version === 'generic',
  AIA: version === 'aia',
  DHL: version === 'dhl',
  ATHENA: version === 'athena',
  PEPSI: version === 'pepsi',
  NESTLE: version === 'nestle',
};

export const SSO_URL = Config.BASE_URL.includes('staging')
  ? 'https://sso-staging.evehr.vn/saml2/auth'
  : 'https://sso.evehr.vn/saml2/auth';

export default versions[Config.CURRENT_BUILD_VERSION];
