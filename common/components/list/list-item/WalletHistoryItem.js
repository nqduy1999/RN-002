import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {TEXT_DARK_COLOR, DISABLE_BACKGROUND_COLOR} from '@resources/palette';
import TextContent from '../../text/TextContent';
import {sourceImage} from '@common/function/function';
import Icon from '../../icon/Icon';
import TextCurrency from '@common/components/text/TextCurrency';
import BuildVersion from '@resources/build_version/BuildVersion';
import {ICON_WALLET_HISTORY} from '@resources/images';
import moment from 'moment';
import {
  LABEL_RECOGNITION_TYPE_TOP_UP_KUDOS_BUDGET,
  LABEL_RECOGNITION_TYPE_TOP_UP_RECEIVED_KUDOS,
  LABEL_RECOGNITION_TYPE_RECEIVED_RECOGNITION,
  LABEL_RECOGNITION_TYPE_SENT_RECOGNITION,
  LABEL_RECOGNITION_TYPE_EXPIRED_RECOGNITION,
  LABEL_RECOGNITION_TYPE_REWARD_DES,
  LABEL_RECOGNITION_TYPE_TOP_UP_KUDOS_BUDGET_DES,
  LABEL_RECOGNITION_TYPE_TOP_UP_RECEIVED_KUDOS_DES,
  LABEL_RECOGNITION_TYPE_RECEIVED_RECOGNITION_DES,
  LABEL_RECOGNITION_TYPE_SENT_RECOGNITION_DES,
  LABEL_RECOGNITION_TYPE_GROUP_RECOGNITION_DES,
  LABEL_RECOGNITION_TYPE_EXPIRED_RECOGNITION_DES,
  LABEL_RECOGNITION_TYPE_RECALL_RECOGNITION,
  LABEL_RECOGNITION_TYPE_RECALL_RECOGNITION_DES,
} from '@resources/string/strings';
const evePalette = BuildVersion.palette || {};

const WalletHistoryItem = ({
  type,
  brandName,
  adjustment,
  brandImageUrl,
  index,
  createdAt,
  isGroupRecognition,
}) => {
  if (type === 'Reward') {
    adjustment = -adjustment;
  }

  if (type === 'ReceivedRecognition' && adjustment < 0) {
    type = 'SentRecognition';
  }

  const title = {
    Reward: brandName,
    AllocatedPoint: LABEL_RECOGNITION_TYPE_TOP_UP_KUDOS_BUDGET,
    AllocatedCoin: LABEL_RECOGNITION_TYPE_TOP_UP_RECEIVED_KUDOS,
    ReceivedRecognition: LABEL_RECOGNITION_TYPE_RECEIVED_RECOGNITION,
    SentRecognition: LABEL_RECOGNITION_TYPE_SENT_RECOGNITION,
    RecognitionExpired: LABEL_RECOGNITION_TYPE_EXPIRED_RECOGNITION,
    SentRecallRecognition: LABEL_RECOGNITION_TYPE_RECALL_RECOGNITION,
    ReceivedRecallRecognition: LABEL_RECOGNITION_TYPE_RECALL_RECOGNITION,
  };

  const description = {
    Reward: LABEL_RECOGNITION_TYPE_REWARD_DES,
    AllocatedPoint: LABEL_RECOGNITION_TYPE_TOP_UP_KUDOS_BUDGET_DES,
    AllocatedCoin: LABEL_RECOGNITION_TYPE_TOP_UP_RECEIVED_KUDOS_DES,
    ReceivedRecognition: isGroupRecognition
      ? LABEL_RECOGNITION_TYPE_GROUP_RECOGNITION_DES
      : LABEL_RECOGNITION_TYPE_RECEIVED_RECOGNITION_DES,
    SentRecognition: isGroupRecognition
      ? LABEL_RECOGNITION_TYPE_GROUP_RECOGNITION_DES
      : LABEL_RECOGNITION_TYPE_SENT_RECOGNITION_DES,
    RecognitionExpired: LABEL_RECOGNITION_TYPE_EXPIRED_RECOGNITION_DES,
    SentRecallRecognition: LABEL_RECOGNITION_TYPE_RECALL_RECOGNITION_DES,
    ReceivedRecallRecognition: LABEL_RECOGNITION_TYPE_RECALL_RECOGNITION_DES,
  };

  const isReceiveType =
    (type === 'AllocatedPoint' && adjustment >= 0) ||
    (type === 'AllocatedCoin' && adjustment >= 0) ||
    type === 'ReceivedRecognition' ||
    type === 'ReceivedRecallRecognition';

  const isSendType =
    (type === 'AllocatedPoint' && adjustment < 0) ||
    (type === 'AllocatedCoin' && adjustment < 0) ||
    type === 'Reward' ||
    type === 'SentRecognition' ||
    type === 'RecognitionExpired' ||
    type === 'SentRecallRecognition';

  const renderLogo = () =>
    brandImageUrl ? (
      <Image
        style={[styles.icon, styles.rewardImage]}
        source={sourceImage(brandImageUrl)}
        resizeMode="contain"
      />
    ) : (
      <Icon
        style={styles.icon}
        source={ICON_WALLET_HISTORY}
        size={40}
        stroke={true}
      />
    );

  return (
    <View style={styles.container}>
      <View style={[styles.content, index !== 0 && styles.border]}>
        {renderLogo()}
        <View style={styles.info}>
          <TextContent
            style={styles.title}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {title[type]}
          </TextContent>
          <TextContent style={styles.description}>
            {description[type]}
          </TextContent>
        </View>
        <View>
          <View style={styles.adjustment}>
            {adjustment >= 0 && isReceiveType && (
              <TextContent style={styles.budget}>+</TextContent>
            )}
            {adjustment <= 0 && isSendType && (
              <TextContent style={[styles.budget, styles.budgetBlack]}>
                -
              </TextContent>
            )}
            <TextCurrency
              isShowIcon={false}
              value={Math.abs(adjustment)}
              valueSize="medium-subtitle"
              valueStyle={[styles.budget, isSendType && styles.budgetBlack]}
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

export default WalletHistoryItem;

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
  description: {
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
  budget: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
    color: evePalette.SECONDARY_COLOR,
  },
  budgetBlack: {color: TEXT_DARK_COLOR},
  createdAt: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 17,
    color: TEXT_DARK_COLOR,
  },
});
