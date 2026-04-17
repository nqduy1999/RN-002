import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {SvgCssUri} from 'react-native-svg';
import Title from '../../text/Title';
import {TEXT_GRAY_COLOR} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const FlexibleCategoryItem = ({
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
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <TouchableOpacity style={styles.categoryListItem} onPress={onPress}>
        <SvgCssUri
          uri={isSelected ? activeIcon : defaultIcon}
          width={120}
          height={180}
        />
        {BuildVersion.setting.version !== 'athena' && (
          <Title
            size={'little-smaller'}
            style={[
              styles.title,
              {color: isSelected ? activeColor : TEXT_GRAY_COLOR},
            ]}>
            {title}
          </Title>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  categoryListItem: {
    width: 120,
    height: 180,
    marginRight: 16,
  },
  title: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 8,
  },
});

export default FlexibleCategoryItem;
