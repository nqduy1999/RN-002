import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {TEXT_GRAY_COLOR, TEXT_DARK_COLOR} from '@resources/palette';
import UserAvatar from '@common/components/user-avatar/UserAvatar';
import {
  LABEL_STATUS_APPROVED,
  LABEL_STATUS_PENDING,
  LABEL_STATUS_REJECTED,
} from '@resources/string/strings';
import TextContent from '../../text/TextContent';
import AvatarImageWithDefaultIcon from '@common/components/image/AvatarImageWithDefaultIcon';

const RecognitionCommentItem = ({
  comment,
  createdAt,
  reviewer: {fullName, title, avatarUrl},
  status,
  avatarSize = 30,
  isSelfRecognition,
}) => {
  // console.log('isSelfRecognition', isSelfRecognition);
  const statusText =
    status === 'Approved'
      ? LABEL_STATUS_APPROVED
      : status === 'Pending'
      ? LABEL_STATUS_PENDING
      : LABEL_STATUS_REJECTED;

  const backgroundColor =
    status === 'Approved'
      ? '#68BD5E'
      : status === 'Pending'
      ? TEXT_GRAY_COLOR
      : '#FF2222';
  return (
    <View style={styles.container}>
      {!isSelfRecognition && (
        <View style={styles.header}>
          <AvatarImageWithDefaultIcon
            avatar={avatarUrl}
            imageStyle={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
              },
            ]}
            iconSize={avatarSize - 10}
            wrapIconStyle={{
              width: avatarSize,
              height: avatarSize,
              marginRight: 5,
            }}
          />
          <View style={styles.employee}>
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          {status && (
            <View style={styles.status}>
              <View
                style={{...styles.statusDot, backgroundColor: backgroundColor}}
              />
              <TextContent style={styles.statusText}>{statusText}</TextContent>
            </View>
          )}
        </View>
      )}
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.createdAt}>
        {moment(createdAt).format('DD/MM/YYYY - HH:mm')}
      </Text>
    </View>
  );
};

export default RecognitionCommentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F3F6',
    marginBottom: 14,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  header: {flexDirection: 'row', marginBottom: 8},
  employee: {
    flex: 1,
  },
  avatar: {
    marginRight: 5,
  },
  fullName: {
    color: TEXT_DARK_COLOR,
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 16,
    flex: 1,
  },
  title: {
    fontSize: 10,
    lineHeight: 13,
    color: TEXT_DARK_COLOR,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 4,
  },
  statusText: {color: TEXT_GRAY_COLOR, fontSize: 12, lineHeight: 16},
  comment: {
    color: TEXT_DARK_COLOR,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  createdAt: {
    fontSize: 9,
    lineHeight: 14,
    color: TEXT_GRAY_COLOR,
  },
});
