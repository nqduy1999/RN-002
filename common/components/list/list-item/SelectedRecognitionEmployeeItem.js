import React from 'react';
import {View, StyleSheet} from 'react-native';
import AvatarImageWithDefaultIcon from '../../image/AvatarImageWithDefaultIcon';
import Icon from '../../icon/Icon';
import {GRAY_COLOR} from '../../../../resources/palette';
import GenderTypes from '@resources/enum-types/gender';
import {TouchableOpacity} from 'react-native';
import {SVG_ICON_CLOSE_RED} from '@resources/images';

const SelectedRecognitionEmployeeItem = ({
  avatar,
  avatarSize = 36,
  gender,
  avatarColor,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AvatarImageWithDefaultIcon
        avatar={avatar}
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
          borderColor: avatarColor || GRAY_COLOR,
        }}
        iconColor={avatarColor || GRAY_COLOR}
      />
      <Icon
        source={SVG_ICON_CLOSE_RED}
        style={styles.iconClose}
        size={15}
        stroke={false}
      />
    </TouchableOpacity>
  );
};

export default SelectedRecognitionEmployeeItem;

const styles = StyleSheet.create({
  container: {marginRight: 12},
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 0,
    borderColor: GRAY_COLOR,
  },
  iconClose: {
    position: 'absolute',
    right: -5,
    top: 0,
  },
});
