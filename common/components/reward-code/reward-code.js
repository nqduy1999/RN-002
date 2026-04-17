import React, {Fragment, useCallback, useMemo} from 'react';
import {View, StyleSheet, Image, Dimensions, Linking, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-svg';
import {
  LIGHT_COLOR,
  TEXT_DARK_COLOR,
  BUTTON_GREEN_COLOR,
} from '@resources/palette';
import OutlineButton from '@common/components/button/OutlineButton';
import {isUrl} from '@common/function/function';
import {LABEL_WALLET_ACTIVE_THIS_VOUCHER, CODE_COPIED_TO_CLIPBOARD} from '@resources/string/strings';
import Title from '../text/Title';
import {TextWithLetterSpacing} from '../text/TextWithLetterSpacing';
import {renderText} from '@common/components/StringHelper';

const windows = Dimensions.get('window');
const BARCODE_MAX_WIDTH = windows.width * 0.8;

const RewardCode = ({isGotItReward, supplierLogo, code, codeDisplay}) => {
  const hasDeepLink = useMemo(() => {
    return isUrl(code);
  }, [code]);

  const openDeepLink = useCallback(() => {
    if (hasDeepLink) {
      Linking.openURL(code);
    }
  }, [hasDeepLink, code]);
  
  const copyToClipboard = useCallback(() => {
    Clipboard.setString(code);
    alert(renderText(CODE_COPIED_TO_CLIPBOARD));
  }, [code]);

  if (!code) {
    return null;
  }

  if (hasDeepLink) {
    return (
      <OutlineButton
        onPress={openDeepLink}
        onLongPress={openDeepLink}
        text={LABEL_WALLET_ACTIVE_THIS_VOUCHER}
        style={styles.buttonActiveThisVoucherWrapper}
        buttonStyle={styles.buttonActiveThisVoucher}
        textStyle={styles.buttonActiveThisVoucherText}
      />
    );
  }

  const renderImageCode = useMemo(() => {
    return {
      'QR code': <QRCode value={code} size={82} />,
      'Barcode 128': (
        <Barcode value={code} height={78} maxWidth={BARCODE_MAX_WIDTH} />
      ),
      Text: <Barcode value={code} height={78} maxWidth={BARCODE_MAX_WIDTH} />,
    }[codeDisplay || 'QR code'];
  }, [codeDisplay]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={copyToClipboard}>
        {isGotItReward ? (
          <Fragment>
            <Image source={{uri: supplierLogo}} style={styles.supplierLogo} />
            <Barcode value={code} height={78} maxWidth={BARCODE_MAX_WIDTH} />

            <TextWithLetterSpacing spacing={7} textStyle={styles.barcodeText}>
              {code}
            </TextWithLetterSpacing>
          </Fragment>
        ) : (
          <Fragment>
            {renderImageCode}
            <Title style={styles.qrCodeText} size="medium-button">
              {code}
            </Title>
          </Fragment>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  supplierLogo: {
    marginBottom: 5,
    width: 69,
    height: 36,
    resizeMode: 'contain',
    backgroundColor: LIGHT_COLOR,
  },
  barcodeText: {
    fontWeight: '600',
    fontSize: 16,
  },
  qrCodeText: {
    color: TEXT_DARK_COLOR,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },

  buttonActiveThisVoucherWrapper: {
    width: Dimensions.get('window').width - 72,
    marginTop: 20,
    marginBottom: 15,
  },

  buttonActiveThisVoucher: {
    borderColor: BUTTON_GREEN_COLOR,
    borderRadius: 4,
    height: 38,
  },

  buttonActiveThisVoucherText: {
    fontWeight: '400',
    fontSize: 15,
    color: BUTTON_GREEN_COLOR,
  },
});

export default RewardCode;
