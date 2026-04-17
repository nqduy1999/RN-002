import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Icon from '../icon/Icon';
import BuildVersion from '@resources/build_version/BuildVersion';
import GenderTypesDefault from '@resources/enum-types/gender';

const AvatarImageWithDefaultIcon = ({
  avatar = null,
  iconSize = 20,
  iconColor = BuildVersion.palette.PINK_COLOR,
  GenderTypes = GenderTypesDefault,
  ...props
}) => {
  return !!avatar ? (
    <Image
      source={{
        uri: avatar.uri || avatar,
      }}
      style={[styles.image, props.imageStyle]}
    />
  ) : (
    <View style={[styles.icon, styles.defaultIcon, props.wrapIconStyle]}>
      <Icon
        {...GenderTypes.Default.defaultAvatar}
        size={iconSize}
        color={iconColor}
        style={props.iconStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 28,
    width: 28,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  icon: {
    height: 28,
    width: 28,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  defaultIcon: {
    borderWidth: 1,
    borderColor: BuildVersion.palette.PINK_COLOR,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  }
});

export default AvatarImageWithDefaultIcon;
