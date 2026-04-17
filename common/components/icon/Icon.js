import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomIconLine from './CustomIconLine';
import CustomIconSolid from './CustomIconSolid';
import {TEXT_DARK_COLOR, LIGHT_COLOR} from '@resources/palette';
import Badge from '../badge/Badge';
const ICON_TYPES = {
  Line: CustomIconLine,
  Solid: CustomIconSolid,
};

const Icon = ({
  style,
  buttonStyle,
  buttonColor = null,
  source = null,
  name,
  type = 'Line',
  size = 16,
  onPress,
  color = LIGHT_COLOR,
  stroke = false,
  badge,
  badgeStyle,
  badgeTextStyle,
  noColor = false,
  iconComp,
}) => {
  let Control = source || ICON_TYPES[type];
  let isButton = onPress !== null && onPress !== undefined;
  let fillColor = {};
  let colorItem = {};
  if (!noColor) {
    fillColor[stroke ? 'stroke' : 'fill'] = isButton
      ? buttonColor || TEXT_DARK_COLOR
      : color;
    colorItem.color = isButton ? buttonColor || TEXT_DARK_COLOR : color;
  }
  let attrs = {
    name,
    size,
    width: size,
    height: size,
    ...colorItem,
    ...fillColor,
  };
  return (
    <View
      style={{
        ...styles.icon,
        ...style,
      }}>
      <TouchableOpacity
        style={{
          ...(isButton && styles.touchable),
          ...buttonStyle,
        }}
        disabled={!isButton}
        onPress={() => onPress && onPress()}>
        {iconComp || <Control {...attrs}/>}
        {!!badge && (
          <Badge
            style={{...styles.badge, ...badgeStyle}}
            text={badge}
            textStyle={{...styles.badgeText, ...badgeTextStyle}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
  },
  touchable: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -11,
    right: -11,
    borderColor: TEXT_DARK_COLOR,
  },
  badgeText: {
    color: TEXT_DARK_COLOR,
  },
});

export default Icon;
