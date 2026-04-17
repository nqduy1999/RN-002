import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {TEXT_DARK_COLOR, DISABLE_BACKGROUND_COLOR} from '@resources/palette';
import TextContent from '../../text/TextContent';
import {sourceImage} from '@common/function/function';
import Icon from '../../icon/Icon';
import TextCurrency from '@common/components/text/TextCurrency';
import BuildVersion from '@resources/build_version/BuildVersion';
import {SVG_TOP_UP} from '@resources/images';
import moment from 'moment';
import {
  LABEL_TOP_UP_WALLET,
  LABEL_WALLET_EXPIRATION,
  LABEL_CHANGE_EXPIRY_DATE,
  LABEL_CONVERT_POINTS_TO_GET,
  LABEL_REFUND_FROM_FAILED_ORDER,
  LABEL_FROM_COMPANY,
  LABEL_PAYMENT_FOR_BENEFIT,
  LABEL_TO_FLEXIBLE_BENEFITS_BUDGET,
  LABEL_REGISTER_ALLOWANCE,
} from '@resources/string/strings';
const evePalette = BuildVersion.palette || {};

const FlexibleBenefitWalletHistoryItem = props => {
  const {
    action,
    rewardName,
    adjustment,
    rewardImageUrl,
    index,
    createdAt,
  } = props;
  const title = {
    ClaimBenefit: rewardName,
    Allocate: LABEL_TOP_UP_WALLET,
    Expire: LABEL_WALLET_EXPIRATION,
    UpdateExpiryDate: LABEL_CHANGE_EXPIRY_DATE,
    RefundFromFailedOrder: LABEL_REFUND_FROM_FAILED_ORDER,
    AllocateRegisteredAllowance: LABEL_REGISTER_ALLOWANCE,
    ExchangeCoinsForFlexibleBenfit: LABEL_CONVERT_POINTS_TO_GET,
  };

  const note = {
    ClaimBenefit: LABEL_PAYMENT_FOR_BENEFIT,
    Allocate: LABEL_FROM_COMPANY,
    Expire: '',
    UpdateExpiryDate: '',
    RefundFromFailedOrder: LABEL_FROM_COMPANY,
    AllocateRegisteredAllowance: LABEL_FROM_COMPANY,
    ExchangeCoinsForFlexibleBenfit: LABEL_TO_FLEXIBLE_BENEFITS_BUDGET,
  };

  const icon = () => {
    switch (action) {
      case 'ClaimBenefit':
        return (
          <Image
            style={[styles.icon, styles.rewardImage]}
            source={sourceImage(rewardImageUrl)}
            resizeMode="cover"
          />
        );
      case 'ExchangeCoinsForFlexibleBenfit':
        return (
          <Icon
            style={styles.icon}
            name="Medal-3"
            buttonStyle={styles.iconButtonStyle}
            size={26}
            stroke={false}
            color={evePalette.ACCENT_COLOR}
          />
        );
      default:
        return (
          <Icon
            style={styles.icon}
            source={SVG_TOP_UP}
            size={40}
            stroke={true}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, index !== 0 && styles.border]}>
        {icon()}
        <View style={styles.info}>
          <TextContent
            style={styles.title}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {title[action]}
          </TextContent>
          <TextContent style={styles.note}>{note[action]}</TextContent>
        </View>
        <View>
          <View style={styles.adjustment}>
            {adjustment > 0 && action !== 'ClaimBenefit' && (
              <TextContent style={styles.budget}>+</TextContent>
            )}
            {action === 'ClaimBenefit' && (
              <TextContent style={styles.budgetBlack}>-</TextContent>
            )}
            <TextCurrency
              isShowIcon={false}
              value={adjustment}
              valueSize="medium-subtitle"
              valueStyle={[
                styles.budget,
                (adjustment <= 0 ||
                  action === 'ClaimBenefit' ||
                  action === 'Expire') &&
                  styles.budgetBlack,
              ]}
              flexAStyle={styles.flexA}
            />
          </View>
          <Text style={styles.createdAt}>
            {moment(createdAt).format('HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FlexibleBenefitWalletHistoryItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  content: {
    minHeight: 68,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderTopColor: DISABLE_BACKGROUND_COLOR,
    borderTopWidth: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  iconButtonStyle: {
    backgroundColor: 'rgba(235, 87, 87, 0.2)',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  rewardImage: {
    borderRadius: 4,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: TEXT_DARK_COLOR,
    fontSize: 14.4,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    lineHeight: 17,
    color: TEXT_DARK_COLOR,
  },
  adjustment: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 12,
    marginBottom: 2,
  },
  budgetBlack: {color: TEXT_DARK_COLOR},
  budget: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
    color: evePalette.ACCENT_COLOR,
  },
  createdAt: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 17,
    color: TEXT_DARK_COLOR,
  },
});
