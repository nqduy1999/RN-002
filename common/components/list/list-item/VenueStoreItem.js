import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import {TEXT_DARK_COLOR} from '@resources/palette';
import Icon from '../../icon/Icon';
import {TEXT_GRAY_COLOR} from '../../../../resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const VenueStoreItem = ({
  style,
  textStyle,
  title = null,
  subtitle = null,
  ...props
}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <View style={styles.icon}>
        <Icon
          name="Location-2"
          type="Line"
          size={24}
          stroke={true}
          color={BuildVersion.palette.PINK_COLOR}
        />
      </View>

      <View style={styles.info}>
        <Title
          style={{
            ...styles.title,
            ...textStyle,
          }}
          size="mediums">
          {title}
        </Title>
        <TextContent
          style={{
            ...styles.subtitle,
            ...textStyle,
          }}>
          {subtitle}
        </TextContent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 12,
    minHeight: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
  },
  info: {
    marginVertical: 3,
    flexShrink: 1,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  subtitle: {
    color: TEXT_GRAY_COLOR,
  },
});

export default VenueStoreItem;
