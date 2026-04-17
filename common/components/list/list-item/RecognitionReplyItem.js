import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import moment from 'moment';
const windows = Dimensions.get('window');
import BuildVersion from '@resources/build_version/BuildVersion';
const MESSAGE_BOX_WIDTH = windows.width * 0.8;
import GenderTypes from '@resources/enum-types/gender';
import AvatarImageWithDefaultIcon from '@common/components/image/AvatarImageWithDefaultIcon';

const RecipientMessage = ({replies}) => {
  const MessageBox = ({
    reply: {createdAt, sender, message, messageType},
    index,
  }) => {
    return (
      <View style={recipientStyles.container}>
        {/* Only render avatar when index equals to 0 */}
        <View style={recipientStyles.avatarBox}>
          {index === 0 && (
            <AvatarImageWithDefaultIcon
              avatar={sender.avatar}
              imageStyle={recipientStyles.avatar}
              wrapIconStyle={[avatarStyles.avatar, avatarStyles.defaultAvatar]}
              iconSize={20}
              GenderTypes={GenderTypes}
            />
          )}
        </View>
        {/* Text message */}
        {messageType === 'Text' && (
          <View>
            <View style={recipientStyles.messageBox}>
              <Text style={recipientStyles.message}>{message}</Text>
              <Text style={recipientStyles.time}>
                {moment(createdAt).format('DD/MM/YYYY - HH:mm')}
              </Text>
            </View>
          </View>
        )}
        {/* Icon message */}
        {messageType === 'Icon' && (
          <View style={recipientStyles.iconBox}>
            <Image
              source={{
                uri: message,
              }}
              style={recipientStyles.icon}
            />
            <Text style={recipientStyles.time}>
              {moment(createdAt).format('DD/MM/YYYY - HH:mm')}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return replies.map((reply, index) => (
    <MessageBox reply={reply} index={index} key={reply.id} />
  ));
};

const avatarStyles = StyleSheet.create({
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  defaultAvatar: {
    borderWidth: 1,
    borderColor: BuildVersion.palette.PINK_COLOR,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
});
const recipientStyles = StyleSheet.create({
  container: {
    flexBasis: MESSAGE_BOX_WIDTH,
    flexDirection: 'row',
  },
  // avatar box
  avatarBox: {
    flexBasis: 57,
    alignItems: 'center',
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  // Message box
  messageBox: {
    flexBasis: MESSAGE_BOX_WIDTH - 57,
    maxWidth: MESSAGE_BOX_WIDTH - 57,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingBottom: 7,
    paddingTop: 10,
    backgroundColor: '#F1F3F6',
    borderRadius: 8,
    alignSelf: 'center',
  },
  message: {
    marginBottom: 7,
    fontSize: 12,
    lineHeight: 16,
  },
  // Icon box
  iconBox: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  icon: {
    width: 88,
    height: 88,
  },
  time: {color: '#7B7B7B', fontSize: 9, lineHeight: 14, marginTop: 'auto'},
});

const SenderMessage = ({replies}) => {
  const MessageBox = ({message, messageType, createdAt}) => {
    return (
      <View style={senderStyles.container}>
        {/* Message box */}
        {messageType === 'Text' && (
          <View>
            <View
              style={[
                senderStyles.messageBox,
                {
                  backgroundColor:
                    BuildVersion.palette.SENDER_CHAT_BACKGROUND_COLOR,
                },
              ]}
            >
              <Text style={senderStyles.message}>{message}</Text>
              <Text style={senderStyles.time}>
                {moment(createdAt).format('DD/MM/YYYY - HH:mm')}
              </Text>
            </View>
          </View>
        )}
        {/* Icon box */}
        {messageType === 'Icon' && (
          <View style={senderStyles.iconBox}>
            <Text style={senderStyles.time}>
              {moment(createdAt).format('DD/MM/YYYY - HH:mm')}
            </Text>
            <Image
              source={{
                uri: message,
              }}
              style={recipientStyles.icon}
            />
          </View>
        )}
      </View>
    );
  };

  return replies.map((reply) => <MessageBox {...reply} key={reply.id} />);
};

const senderStyles = StyleSheet.create({
  container: {
    flexBasis: MESSAGE_BOX_WIDTH,
    flexDirection: 'row-reverse',
  },
  messageBox: {
    marginRight: 16,
    flexBasis: MESSAGE_BOX_WIDTH - 57,
    maxWidth: MESSAGE_BOX_WIDTH - 57,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingBottom: 7,
    paddingTop: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  message: {
    marginBottom: 7,
    fontSize: 12,
    lineHeight: 16,
  },
  // Icon box
  iconBox: {
    marginRight: 16,
    flexDirection: 'row',
    marginBottom: 12,
  },
  icon: {
    width: 88,
    height: 88,
  },
  time: {
    color: '#7B7B7B',
    fontSize: 9,
    lineHeight: 14,
    marginTop: 'auto',
  },
});

const RecognitionReplyItem = (props) => {
  const {isSender, replies} = props;

  return isSender ? (
    <SenderMessage replies={replies} />
  ) : (
    <RecipientMessage replies={replies} />
  );
};

export default RecognitionReplyItem;
