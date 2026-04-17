import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import TextContent from '../../text/TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';
import {
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  SHADOW_COLOR,
  LIGHT_GRAY_COLOR,
  TEXT_GRAY_COLOR,
  FAILED_VOUCHER,
  TEXT_FAILED_VOUCHER,
} from '../../../../resources/palette';
import Title from '../../text/Title';
import {
  LABEL_WALLET_ENDS_IN,
  LABEL_WALLET_ENDS_IN_NON_VOUCHER,
  BUTTON_WALLET_HIDE_CODE,
  BUTTON_WALLET_SHOW_CODE,
  LABEL_WALLET_HOW_TO_USE,
  LABEL_WALLET_USING_CODE,
  LABEL_WALLET_HOW_TO_USE_GRAB,
  LABEL_WALLET_USING_CODE_TIP,
  BUTTON_IN_PROGRESS,
  LABEL_THE_NEW,
  TITLE_REWARD_REDEEM_FAILED,
  LABEL_WALLET_EXPIRES_BY,
  LABEL_WALLET_EXPIRES_BY_NON_VOUCHER,
} from '../../../../resources/string/strings';
import Dash from 'react-native-dash';
import {renderText} from '../../StringHelper';
import OutlineButton from '../../button/OutlineButton';
import moment from 'moment';
import {NEW_REWARD} from '@resources/images';
import BuildVersion, {IS} from '@resources/build_version/BuildVersion';
const eveStyles = BuildVersion.styles || {};
import SupplierLogo from '@common/components/image/SupplierLogo';
import RewardCode from '@common/components/reward-code/reward-code';
import {isUrl} from '@common/function/function';
import ShadowView from 'react-native-simple-shadow-view';

const {width} = Dimensions.get('window');
class RewardActiveItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCode: false,
    };
  }
  onShowCode() {
    this.setState({isShowCode: !this.state.isShowCode});
  }

  render() {
    const {
      style,
      textStyle,
      title = null,
      subtitle = null,
      expireDate = null,
      orderStatus = null,
      logo = null,
      code = null,
      isNewClaimedReward,
      supplierLogo,
      isGotItReward,
      codeDisplay,
      onPress = () => {},
    } = this.props;

    var expireDateLabel = expireDate
      ? renderText(
          !IS.PEPSI ? LABEL_WALLET_ENDS_IN : LABEL_WALLET_EXPIRES_BY,
        ).replace('{0}', moment(expireDate).format('DD/MM/YYYY'))
      : null;
    const buttonCode = this.state.isShowCode
      ? BUTTON_WALLET_HIDE_CODE
      : BUTTON_WALLET_SHOW_CODE;

    const inProgress = orderStatus == 'InProgress';
    const isFailed = orderStatus == 'Failed';

    if (inProgress || isFailed) {
      expireDateLabel = renderText(
        !IS.PEPSI
          ? LABEL_WALLET_ENDS_IN_NON_VOUCHER
          : LABEL_WALLET_EXPIRES_BY_NON_VOUCHER,
      );
    }

    const BodyComponent = () => (
      <>
        <View style={styles.infoSection}>
          <View style={styles.logoWrapper}>
            <Image {...logo} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.infoWrapper}>
            <Title
              style={{...styles.title, ...textStyle}}
              size="medium-subtitle">
              {title}
            </Title>
            <TextContent style={styles.subtitle}>{subtitle}</TextContent>
          </View>
        </View>
        <Dash
          style={styles.divider}
          dashGap={2}
          dashLength={4}
          dashColor={LIGHT_GRAY_COLOR_2}
          dashThickness={1}
        />
        <View style={styles.detailSection}>
          <View style={styles.expiryAtSection}>
            <TextContent
              style={styles.expiredAt}
              size="little-smaller"
              weight="bold">
              {expireDateLabel}
            </TextContent>
            {!inProgress && !isFailed && (
              <OutlineButton
                style={styles.showCode}
                buttonStyle={{
                  ...styles.showCodeButton,
                  ...eveStyles.buttonBackground,
                  ...eveStyles.noBorder,
                  ...(IS.PEPSI && styles.showCodeButtonPepsi),
                }}
                textSize="little-smaller"
                onPress={() => this.onShowCode()}
                text={buttonCode}
                textStyle={{
                  ...eveStyles.button,
                  ...(IS.PEPSI && styles.textButtonPepsi),
                }}
              />
            )}
            {inProgress && (
              <OutlineButton
                style={styles.inProgress}
                buttonStyle={styles.inProgressButton}
                textSize="little-smaller"
                textStyle={styles.textInProgressButton}
                text={BUTTON_IN_PROGRESS}
              />
            )}
            {isFailed && (
              <OutlineButton
                style={styles.failed}
                buttonStyle={styles.failedButton}
                textSize="little-smaller"
                textStyle={styles.textFailedButton}
                text={TITLE_REWARD_REDEEM_FAILED}
              />
            )}
          </View>
          {this.state.isShowCode && !!code && (
            <View
              style={{
                ...styles.codeSection,
              }}>
              <View style={styles.supplierInformation}>
                <SupplierLogo supplierLogo={supplierLogo} />
              </View>
              <TextContent style={styles.howToUse} weight="bold">
                {LABEL_WALLET_HOW_TO_USE}
              </TextContent>
              {isUrl(code) ? (
                <TextContent style={styles.usingCode} size="little-smaller">
                  {LABEL_WALLET_HOW_TO_USE_GRAB}
                </TextContent>
              ) : (
                <TextContent style={styles.usingCode} size="little-smaller">
                  {LABEL_WALLET_USING_CODE}
                </TextContent>
              )}

              {code && (
                <View style={styles.qrCode}>
                  <RewardCode
                    code={code}
                    isGotItReward={isGotItReward}
                    supplierLogo={supplierLogo}
                    codeDisplay={codeDisplay}
                  />
                </View>
              )}
              <TextContent style={styles.tip} size="very-small">
                {LABEL_WALLET_USING_CODE_TIP}
              </TextContent>
            </View>
          )}
        </View>
      </>
    );

    return (
      <>
        {Platform.OS === 'android' ? (
          <ShadowView
            style={{
              ...styles.containerShadowView,
              ...style,
            }}>
            <TouchableOpacity onPress={onPress}>
              <View>
                <View
                  style={{
                    ...styles.containerView,
                  }}>
                  <BodyComponent />
                </View>
                {isNewClaimedReward && (
                  <ShadowView style={styles.containerIconNewShadow}>
                    <View style={styles.containerIconNewView}>
                      <Image style={styles.iconNew} source={NEW_REWARD} />
                      <TextContent style={styles.textNew} size="small">
                        {LABEL_THE_NEW}
                      </TextContent>
                    </View>
                  </ShadowView>
                )}
              </View>
            </TouchableOpacity>
          </ShadowView>
        ) : (
          <TouchableOpacity onPress={onPress}>
            <View>
              <View
                style={{
                  ...styles.container,
                  ...style,
                }}>
                <BodyComponent />
              </View>
              {isNewClaimedReward && (
                <View style={styles.containerIconNew}>
                  <Image style={styles.iconNew} source={NEW_REWARD} />
                  <TextContent style={styles.textNew} size="small">
                    {LABEL_THE_NEW}
                  </TextContent>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 24,
    marginRight: 2,
    marginLeft: 2,
    padding: 12,
    zIndex: 0,
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.75,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  containerShadowView: {
    position: 'relative',
    marginBottom: 24,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 2,
    zIndex: 0,
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  containerView: {
    padding: 12,
  },
  supplierInformation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    overflow: 'hidden',
    width: 64,
    height: 64,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    marginEnd: 30,
  },
  logo: {
    width: 64,
    height: 64,
  },
  infoWrapper: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  subtitle: {
    color: TEXT_GRAY_COLOR,
  },
  divider: {
    width: width - 42,
    height: 0.75,
    marginVertical: 12,
    marginHorizontal: -12,
  },
  detailSection: {},
  expiryAtSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiredAt: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  showCode: {
    width: null,
    alignSelf: 'flex-end',
  },
  showCodeButton: {
    minHeight: 24,
    padding: 0,
    paddingHorizontal: 10,
  },
  showCodeButtonPepsi: {
    backgroundColor: undefined,
    borderColor: '#00B9B9',
    borderWidth: 1,
  },
  textButtonPepsi: {
    color: '#00B9B9',
  },
  inProgress: {
    width: null,
    color: TEXT_GRAY_COLOR,
    alignSelf: 'flex-end',
  },
  inProgressButton: {
    minHeight: 24,
    padding: 0,
    borderColor: LIGHT_GRAY_COLOR,
    backgroundColor: LIGHT_GRAY_COLOR,
    paddingHorizontal: 10,
  },
  codeSection: {
    marginVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  howToUse: {
    color: TEXT_DARK_COLOR,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 5,
  },
  usingCode: {
    color: TEXT_DARK_COLOR,
    lineHeight: 18,
    textAlign: 'center',
  },
  code: {
    color: TEXT_DARK_COLOR,
    marginBottom: 10,
    textAlign: 'center',
  },
  tip: {
    lineHeight: 22,
    textAlign: 'center',
    color: TEXT_GRAY_COLOR,
  },
  qrCode: {
    marginVertical: 10,
    width: '100%',
  },
  textInProgressButton: {
    color: TEXT_GRAY_COLOR,
  },
  containerIconNew: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 1,
    top: 10,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  containerIconNewShadow: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 1,
    top: 10,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  containerIconNewView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  iconNew: {
    width: 47,
    height: 20,
  },
  textNew: {
    color: 'white',
    alignSelf: 'center',
    position: 'absolute',
    textAlign: 'center',
  },
  failed: {
    width: null,
    color: FAILED_VOUCHER,
    alignSelf: 'flex-end',
  },
  failedButton: {
    minHeight: 24,
    padding: 0,
    borderColor: FAILED_VOUCHER,
    backgroundColor: FAILED_VOUCHER,
    paddingHorizontal: 10,
  },
  textFailedButton: {
    color: TEXT_FAILED_VOUCHER,
    opacity: 1,
  },
});

export default RewardActiveItem;
