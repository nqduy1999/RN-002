import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { SvgCssUri } from 'react-native-svg';

import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import { TEXT_DARK_COLOR } from '@resources/palette';
import { LIGHT_COLOR, SHADOW_COLOR } from '../../../../resources/palette';

import TextContent from '../../text/TextContent';

const shadowOpt = {
  height: 64,
  width: 64,
  color: SHADOW_COLOR,
  border: 4,
  radius: 32,
  opacity: !IS.PEPSI ? 0.2 : 0.1,
  x: 0,
  y: 0,
  style: { margin: 4 },
};

const iconSize = IS.oneOf('pepsi', 'nestle') ? 64 : 32;
const sizeStyle = { width: iconSize, height: iconSize };

const RewardCategoryItem = ({
  style,
  textStyle,
  icon = null,
  title = null,
  isSelected = undefined,
  activeColor,
  activeIcon,
  defaultIcon,
  onPress,
  ...props
}) => {
  const color = activeColor;
  let displayIcon = isSelected ? activeIcon : defaultIcon;
  const renderIcon = (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.icon,
        ...(!IS.NESTLE && styles.iconShadow),
        ...(!IS.NESTLE && isSelected ? { borderColor: color, borderWidth: 0.75 } : null),
        ...(!isSelected && IS.PEPSI && { margin: 4 }),
      }}>
      {IS.NESTLE ?
        <Image source={{ uri: displayIcon }} style={[sizeStyle, { borderRadius: iconSize / 2 }]} />
        :
        <SvgCssUri {...sizeStyle} uri={displayIcon} />
      }
    </TouchableOpacity>
  );

  const renderIconCommon = (
    <BoxShadow setting={shadowOpt}>{renderIcon}</BoxShadow>
  );

  const renderIconPepsi = isSelected ? (
    <BoxShadow setting={shadowOpt}>{renderIcon}</BoxShadow>
  ) : (
    renderIcon
  );

  const renderIconByEnv = {
    generic: renderIconCommon,
    aia: renderIconCommon,
    dhl: renderIconCommon,
    athena: renderIconCommon,
    pepsi: renderIconPepsi,
    nestle: renderIcon,
  };

  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      {renderIconByEnv[BuildVersion.setting.version]}
      <TouchableOpacity onPress={onPress}>
        <TextContent
          style={{
            ...styles.title,
            ...textStyle,
            ...(isSelected ? { color: color } : null),
          }}
          size="small"
          numberOfLines={4}
          weight={isSelected ? 'bold' : 'normal'}>
          {title}
        </TextContent>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
    marginRight: 8,
  },
  icon: {
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_COLOR,
  },
  iconShadow: {
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  title: {
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  imageIcon: {
    width: 32,
    height: 32,
  },
});

export default RewardCategoryItem;