import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextContent from '../../text/TextContent';
import { LIGHT_GREEN_COLOR } from '@resources/palette';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';

const eveStyles = BuildVersion.styles || {};

const SelectedBranchItem = ({ style, text = null, ...props }) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
        ...eveStyles.buttonBackground,
        ...(IS.PEPSI && styles.containerPepsi),
        ...(IS.NESTLE && styles.containerNestle),
      }}>
      <TextContent
        style={{
          ...styles.text,
          ...eveStyles.listItem,
          ...(IS.PEPSI && styles.textPepsi),
          ...(IS.NESTLE && styles.textNestle),
        }}
        size="medium-subtitle">
        {text}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    paddingHorizontal: 12,
    backgroundColor: LIGHT_GREEN_COLOR,
    borderRadius: 20,
    minHeight: 28,
    marginEnd: 5,
    alignItems: 'center',
  },
  text: {
    color: BuildVersion.palette.ACCENT_COLOR,
    textAlign: 'center',
  },
  containerPepsi: {
    backgroundColor: 'rgba(196, 243, 243, 0.5)',
    marginBottom: 7,
  },
  textPepsi: {
    fontWeight: 'bold',
  },
  containerNestle: {
    height: 32,
    marginTop: 10,
    marginEnd: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'rgba(255, 189, 183, 0.5)',
  },
  textNestle: {
    fontWeight: 'bold',
  },
});

export default SelectedBranchItem;
