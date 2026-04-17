import React, {Fragment} from 'react';
import {StyleSheet, Image} from 'react-native';
import TextContent from '@common/components/text/TextContent';
import {LABEL_WALLET_SUPPLIED_BY} from '@resources/string/strings';
import {LIGHT_COLOR, TEXT_DARK_COLOR} from '@resources/palette';

const SupplierLogo = ({supplierLogo = null, ...props}) => {
  if (supplierLogo === null) {
    return null;
  }
  return (
    <Fragment>
      <TextContent style={styles.textSupplied} size="little-smaller">
        {LABEL_WALLET_SUPPLIED_BY}
      </TextContent>
      <Image
        source={{uri: supplierLogo}}
        style={styles.logoSupplied}
        resizeMode="contain"
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  logoSupplied: {
    width: 69,
    height: 36,
    resizeMode: 'contain',
    backgroundColor: LIGHT_COLOR,
  },
  textSupplied: {
    color: TEXT_DARK_COLOR,
  },
});

export default SupplierLogo;
