import React from 'react';
import { StyleSheet, View } from 'react-native';

import { IS } from '@resources/build_version/BuildVersion';

import VerticalLinearGradient from '@common/components/gradient/VerticalLinearGradient';

const { screenHeight, statusBarHeight } = require('@resources/dimensions').default;

const HeaderGradientTemplate = props => {
  return (
    <VerticalLinearGradient
      {...props}
      style={{
        ...styles.wrapper,
        ...props.style,
      }}>
      {IS.NESTLE ?
        <View style={styles.container}>
          {props.children}
        </View> :
        props.children
      }
    </VerticalLinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: IS.NESTLE ? statusBarHeight + 48 : (IS.PEPSI ? (66 + statusBarHeight) : ((screenHeight + statusBarHeight) / 4 - 16)),
    width: '100%',
    paddingTop: IS.NESTLE ? statusBarHeight : 0,
  },
  container: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderGradientTemplate;
