import React from 'react';
import {View, StyleSheet, Image, Dimensions, Platform} from 'react-native';
import Title from '../../text/Title';
import {
  SHADOW_COLOR,
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import ShadowView from 'react-native-simple-shadow-view';

const NewsDocumentsItem = ({
  style,
  title = null,
  coverImage = null,
  ...props
}) => {
  return (
    <>
      {Platform.OS === 'android' ? (
        <ShadowView
          style={{
            ...styles.containerShadowView,
            ...style,
          }}>
          <View
            {...props}
            style={{
              ...styles.containerView,
              ...style,
            }}>
            <View style={[styles.imageContainer]}>
              <Image
                style={{flex: 1, width: 'auto'}}
                resizeMode="cover"
                {...coverImage}
              />
            </View>
            <Title
              size="medium-subtitle"
              style={styles.title}
              numberOfLines={2}>
              {title}
            </Title>
          </View>
        </ShadowView>
      ) : (
        <View
          {...props}
          style={{
            ...styles.container,
            ...style,
          }}>
          <View style={[styles.imageContainer]}>
            <Image
              style={{flex: 1, width: 'auto'}}
              resizeMode="cover"
              {...coverImage}
            />
          </View>
          <Title size="medium-subtitle" style={styles.title} numberOfLines={2}>
            {title}
          </Title>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.3,
    elevation: 1,
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginEnd: 6,
    marginStart: 6,
    marginBottom: 12,
  },
  containerShadowView: {
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 1,
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginEnd: 6,
    marginBottom: 12,
    marginStart: 6,
    marginTop: 2
  },
  containerView: {
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 10,
    width: '100%',
    height: Dimensions.get('window').width * 0.8 * 0.4,
  },
  title: {
    color: TEXT_DARK_COLOR,
    paddingHorizontal: 12,
    paddingBottom: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    textAlignVertical: 'center',
    minHeight: 56,
  },
});

export default NewsDocumentsItem;
