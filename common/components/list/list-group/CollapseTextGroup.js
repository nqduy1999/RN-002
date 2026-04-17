import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import {TEXT_GRAY_COLOR} from '@resources/palette';
import Icon from '../../icon/Icon';
import {SVG_ARROW_UP, SVG_ARROW_DOWN} from '../../../../resources/images';

const CollapseTextGroup = ({
  style,
  text = null,
  iconExpand = SVG_ARROW_DOWN,
  iconCollapse = SVG_ARROW_UP,
  isSelected = false,
  ...props
}) => {
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
        }}>
        {text}
      </TextContent>
      <Icon
        style={styles.icon}
        source={isSelected ? iconExpand : iconCollapse}
        size={24}
        color={TEXT_GRAY_COLOR}
        stroke={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    color: TEXT_GRAY_COLOR,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  icon: {
    flexShrink: 1,
  },
});

export default CollapseTextGroup;
