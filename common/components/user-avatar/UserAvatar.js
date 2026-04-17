import React from 'react';
import {View, StyleSheet} from 'react-native';
import AvatarImage from '../image/AvatarImage';
import Icon from '../icon/Icon';
import {GRAY_COLOR, LIGHT_GRAY_COLOR_2} from '../../../resources/palette';
import GenderTypes from '@resources/enum-types/gender';

const UserAvatar = ({avatar, avatarSize, avatarColor, gender, style}) => {
  return (
    <View style={style}>
      {!!avatar && (
        <AvatarImage
          source={avatar}
          style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        />
      )}
      {!avatar && gender !== 'Default' && (
        <Icon
          {...GenderTypes[gender].defaultAvatar}
          size={avatarSize}
          color={GRAY_COLOR}
          style={styles.avatar}
        />
      )}
      {!avatar && gender === 'Default' && (
        <View
          style={[
            styles.avatar,
            styles.defaultAvatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              borderColor: avatarColor || GRAY_COLOR,
            },
          ]}>
          <Icon
            {...GenderTypes.Default.defaultAvatar}
            size={avatarSize - 18}
            color={avatarColor || GRAY_COLOR}
            stroke={true}
          />
        </View>
      )}
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
