import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '@common/components/button/Button';
import BuildVersion from '@resources/build_version/BuildVersion';

const eveStyles = BuildVersion.styles || {};

const SortRewardBottomSheetFooter = ({style, applyButton}) => {
  return (
    <View style={[styles.container, style]}>
      <Button
        style={styles.button}
        {...applyButton}
        buttonStyle={eveStyles.buttonBackground}
        textStyle={eveStyles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 38,
    marginTop: 18,
  },
  button: {
    marginBottom: 18,
  },
});

export default SortRewardBottomSheetFooter;
