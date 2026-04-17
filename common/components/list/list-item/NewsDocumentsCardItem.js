import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import {TEXT_DARK_COLOR, TEXT_GRAY_COLOR} from '@resources/palette';
import {LIGHT_GRAY_COLOR_2} from '../../../../resources/palette';

const NewsDocumentsItem = ({
  style,
  title = null,
  createdAtDateFormat = null,
  coverImage = null,
  coverImageSize = 80,
  ...props
}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <View
        style={[
          styles.imageContainer,
          {
            width: coverImageSize,
            height: coverImageSize,
          },
        ]}>
        <Image
          style={{flex: 1, width: 'auto'}}
          resizeMode="cover"
          source={coverImage.source}
        />
      </View>
      <View style={styles.info}>
        <Title
          style={{
            ...styles.title,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
          size="medium-subtitle">
          {title}
        </Title>
        <TextContent
          style={{
            ...styles.time,
          }}
          size="little-smaller">
          {createdAtDateFormat}
        </TextContent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.75,
    paddingEnd: 12,
  },
  imageContainer: {
    marginEnd: 20,
  },
  info: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: TEXT_DARK_COLOR,
    textAlign: 'left',
    marginVertical: 5,
  },
  time: {
    flex: 1,
    color: TEXT_GRAY_COLOR,
    marginVertical: 5,
    textAlign: 'left',
  },
});

export default NewsDocumentsItem;
