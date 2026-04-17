import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import TextContent from './text/TextContent';
import { LIGHT_COLOR } from '@resources/palette';
import { COMMON_LOADING } from '@resources/string/strings';
import BuildVersion from '@resources/build_version/BuildVersion';

const windows = Dimensions.get('window');

const ModalActivityIndicator = ({
  show = false,
  color = BuildVersion.palette.ACCENT_COLOR,
  backgroundColor: loadingBgColor = LIGHT_COLOR,
  dimLights = 0.2,
  loadingMessage = COMMON_LOADING,
  isModal,
}) => {
  if (!show) return null;
  const backgroundColor = `rgba(0,0,0,${dimLights})`;
  const LoadingView = (
    <View style={[styles.modal, { backgroundColor: loadingBgColor }]}>
      <ActivityIndicator animating={show} color={color} size="large" />
      <TextContent style={[styles.text, { color: color }]}>
        {loadingMessage}
      </TextContent>
    </View>
  );
  if (isModal) {
    const modalProps = {
      isVisible: true,
      coverScreen: true,
      animationIn: 'fadeIn',
      animationInTiming: 250,
      backdropColor: backgroundColor,
      style: { margin: 0, alignItems: 'center' },
    };
    return (
      <Modal {...modalProps}>
        {LoadingView}
      </Modal>
    )
  }
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {LoadingView}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windows.width,
    height: windows.height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#ccc',
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  modal: {
    padding: 15,
    borderRadius: 13,
    backgroundColor: LIGHT_COLOR,
  },
  text: {
    marginTop: 15,
  },
});

export default ModalActivityIndicator;
