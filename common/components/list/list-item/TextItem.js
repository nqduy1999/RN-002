import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';
import Icon from '../../icon/Icon';
import {SVG_ICON_CHECK_NO_BORDER} from '@resources/images';
import BuildVersion, {IS} from '@resources/build_version/BuildVersion';

const TextItem = ({style, text = null, isSelected = undefined, ...props}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <TextContent
        style={{
          ...styles.text,
          ...(isSelected === true && styles.activeText),
          ...(isSelected === false && styles.inactiveText),
        }}
        size="medium-subtitle"
        weight={isSelected === true ? 'bold' : 'normal'}>
        {text}
      </TextContent>
      {isSelected && <Icon source={SVG_ICON_CHECK_NO_BORDER} size={16} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: TEXT_DARK_COLOR,
    alignSelf: 'flex-start',
  },
  activeText: {
    color: !IS.PEPSI ? BuildVersion.palette.ACCENT_COLOR : '#00B9B9',
  },
  inactiveText: {},
});

export default TextItem;
