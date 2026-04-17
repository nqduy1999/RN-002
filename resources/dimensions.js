import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { isIPhoneX, isIPhoneXMax, isIPhone12, isIPhone12Max, getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;
const isIphoneXGeneration = isIPhoneX() || isIPhoneXMax() || isIPhone12() || isIPhone12Max();

export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export const getBottomSpace = () => (isIphoneXGeneration ? 34 : 0);

const isAndroid = Platform.OS !== 'ios';
const statusBarHeight = getStatusBarHeight();

export default {
    statusBarHeight,
    isAndroid,
    isIOS: Platform.OS === 'ios',
    isTablet: DeviceInfo.isTablet(),
    isIphoneXGeneration,
    isDynamicIsland : DeviceInfo.hasDynamicIsland(),
    bottomSpace: getBottomSpace(),
    screenWidth,
    screenHeight,
    navbarMargin: isAndroid ? 0 : statusBarHeight,
    navbarHeight: 48,
    inputHeight: 48,
    buttonHeight: 48,
};
