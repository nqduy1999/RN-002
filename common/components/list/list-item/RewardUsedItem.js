import React from 'react';
import {View, StyleSheet, Dimensions, Image, Platform} from 'react-native';
import TextContent from '../../text/TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';
import {
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  SHADOW_COLOR,
  TEXT_GRAY_COLOR,
  FAILED_VOUCHER,
  TEXT_FAILED_VOUCHER,
} from '../../../../resources/palette';
import Title from '../../text/Title';
import {
  BUTTON_WALLET_RESTORE,
  LABEL_WALLET_USED_IN,
  LABEL_WALLET_USED,
  TITLE_REWARD_REDEEM_FAILED,
  LABEL_WALLET_ENDS_IN_NON_VOUCHER,
  LABEL_WALLET_EXPIRES_BY_NON_VOUCHER,
} from '../../../../resources/string/strings';
import Dash from 'react-native-dash';
import {renderText} from '../../StringHelper';
import OutlineButton from '../../button/OutlineButton';
import moment from 'moment';
import ShadowView from 'react-native-simple-shadow-view';
import {IS} from '@resources/build_version/BuildVersion';

const {width} = Dimensions.get('window');

const RewardUsedItem = ({
  style,
  id,
  textStyle,
  title = null,
  subtitle = null,
  usedIn = null,
  logo = null,
  orderStatus = null,
  onRestorePress = () => {},
}) => {
  var usedInLabel = usedIn
    ? renderText(LABEL_WALLET_USED_IN).replace(
        '{0}',
        moment(usedIn).format('DD/MM/YYYY'),
      )
    : LABEL_WALLET_USED;

  const isFailed = orderStatus == 'Failed';

  if (isFailed) {
    usedInLabel = renderText(
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
          <Title style={{...styles.title, ...textStyle}} size="medium-subtitle">
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
        <View style={styles.useAtSection}>
          <TextContent
            style={styles.usedAt}
            size="little-smaller"
            weight="bold">
            {usedInLabel}
          </TextContent>

          {!isFailed && (
            <OutlineButton
              style={styles.restore}
              buttonStyle={styles.restoreButton}
              textStyle={styles.restoreText}
              textSize="little-smaller"
              onPress={() => onRestorePress(id)}
              text={BUTTON_WALLET_RESTORE}
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
          <View
            style={{
              ...styles.containerView,
            }}>
            <BodyComponent />
          </View>
        </ShadowView>
      ) : (
        <View
          style={{
            ...styles.container,
            ...style,
          }}>
          <BodyComponent />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 12,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.75,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  containerShadowView: {
    marginBottom: 24,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 2,
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
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    overflow: 'hidden',
    width: 64,
    height: 64,
    borderRadius: 4,
    borderWidth: 0.5,
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
    width: width - 45,
    height: 0.75,
    marginVertical: 12,
    marginHorizontal: -12,
  },
  detailSection: {},
  useAtSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usedAt: {
    color: TEXT_GRAY_COLOR,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  restore: {
    width: null,
    alignSelf: 'flex-end',
  },
  restoreButton: {
    minHeight: 24,
    borderColor: TEXT_GRAY_COLOR,
    padding: 0,
    paddingHorizontal: 10,
  },
  restoreText: {
    color: TEXT_GRAY_COLOR,
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
  },
});

export default RewardUsedItem;
