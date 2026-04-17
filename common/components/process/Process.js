import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LIGHT_GRAY_COLOR} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const Process = ({currentStep = 1, maxStep = 3, style}) => {
  return (
    <View style={[styles.container, style]}>
      {[...Array(maxStep)].map((item, index) => (
        <View
          key={index}
          style={index + 1 === currentStep ? styles.activeDot : styles.dot}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    marginHorizontal: 1.5,
    width: 8,
    height: 8,
    backgroundColor: LIGHT_GRAY_COLOR,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
    width: 19,
    marginHorizontal: 1.5,
    height: 8,
    borderRadius: 4,
  },
});

export default Process;
