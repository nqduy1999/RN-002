import React from 'react';
import {View, Modal, StyleSheet, Linking} from 'react-native';
import TextContent from './text/TextContent';
import {LIGHT_COLOR, GRAY_COLOR} from '@resources/palette';
import {
  MESSAGE_UPDATE,
  UPDATE_NOW,
  CURRENT_VERSION,
} from '@resources/string/strings';
import Button from '@common/components/button/Button';
import BuildVersion from '@resources/build_version/BuildVersion';

const UpdateAppDialog = ({
  appVersion,
  backgroundColor = LIGHT_COLOR,
  dimLights = 0.6,
}) => {
  const updateButton = {
    text: UPDATE_NOW,
    onPress: async () => {
      Linking.openURL(appVersion.storeUrl);
    },
    gradient: true,
  };

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={appVersion.isNeedUpdateApp}>
      <View
        style={[
          styles.container,
          {backgroundColor: `rgba(0,0,0,${dimLights})`},
        ]}>
        <View style={[styles.modal, {backgroundColor: backgroundColor}]}>
          <TextContent
            size="medium-title"
            style={[
              styles.textMessage,
              {color: BuildVersion.palette.ACCENT_COLOR},
            ]}>
            {MESSAGE_UPDATE}
          </TextContent>
          <TextContent style={[styles.text, {color: GRAY_COLOR}]}>
            {CURRENT_VERSION}
          </TextContent>
          <Button {...updateButton} style={styles.buttonUpdate} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 300,
    height: 225,
    padding: 24,
    borderRadius: 4,
    backgroundColor: LIGHT_COLOR,
  },
  text: {
    marginTop: 15,
  },
  textMessage: {
    textAlign: 'center',
  },
  buttonUpdate: {
    marginTop: 24,
  },
});

export default UpdateAppDialog;
