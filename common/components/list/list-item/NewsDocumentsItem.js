import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import { TEXT_DARK_COLOR, TEXT_GRAY_COLOR } from '@resources/palette';
import Icon from '../../icon/Icon';
import { LIGHT_GRAY_COLOR_2 } from '../../../../resources/palette';
import FastImage from 'react-native-fast-image';
import BuildVersion from '@resources/build_version/BuildVersion';

const NewsDocumentsItem = ({
  style,
  title = null,
  createdAtDateFormat = null,
  coverImage = null,
  coverImageSize = 80,
  type,
  fileDocumentUploadUrl,
  onDownloadPress = () => { },
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
        <FastImage
          style={{ flex: 1, width: 'auto' }}
          {...coverImage}
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
        <View style={styles.bottomInfo}>
          <TextContent
            style={{
              ...styles.time,
            }}
            size="little-smaller">
            {createdAtDateFormat}
          </TextContent>
          {type == 'Document' && (
            <Icon
              style={styles.downloadIcon}
              name="Download"
              type="Line"
              buttonColor={BuildVersion.palette.ACCENT_COLOR}
              onPress={() => onDownloadPress(fileDocumentUploadUrl)}
              size={24}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopColor: LIGHT_GRAY_COLOR_2,
    borderTopWidth: 1,
  },
  imageContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    marginEnd: 20,
  },
  info: {
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  bottomInfo: {
    flexShrink: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: TEXT_DARK_COLOR,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  time: {
    color: TEXT_GRAY_COLOR,
    textAlignVertical: 'bottom',
    textAlign: 'left',
  },
  downloadIcon: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
});

export default NewsDocumentsItem;
