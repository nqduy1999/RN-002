import React from 'react';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import Title from '../../text/Title';
import {
  SHADOW_COLOR,
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import ShadowView from 'react-native-simple-shadow-view';

const shadowOpt = {
  height: 64,
  width: Dimensions.get('window').width * 0.8,
  color: SHADOW_COLOR,
  border: 4,
  radius: 4,
  opacity: 0.25,
  x: 0,
  y: 0,
  style: {
    marginEnd: 12,
    marginBottom: 12,
    minHeight: 64,
    marginLeft: 2,
    marginTop: 1,
  },
};

const FeaturedDocumentsItem = ({style, title = null, ...props}) => {
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
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    elevation: 1,
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    borderWidth: 0.75,
    marginEnd: 6,
    marginStart: 6,
    marginBottom: 12,
    padding: 10,
  },
  containerShadowView: {
    width: Dimensions.get('window').width * 0.8,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 1,
    borderColor: LIGHT_GRAY_COLOR_2,
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginEnd: 6,
    marginStart: 6,
    marginBottom: 12,
    marginTop: 4
  },
  containerView: {
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    color: TEXT_DARK_COLOR,
    textAlign: 'left',
    alignSelf: 'flex-start',
    textAlignVertical: 'center',
  },
});

export default FeaturedDocumentsItem;
