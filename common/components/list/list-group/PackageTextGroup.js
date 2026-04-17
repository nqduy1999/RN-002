import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';

const PackageTextGroup = ({style, text = null, isSelected = undefined, ...props}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <TextContent style={styles.sectionTitle} size="large">
        {text}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  sectionTitle: {
    color: TEXT_DARK_COLOR,
  },
});

export default PackageTextGroup;
