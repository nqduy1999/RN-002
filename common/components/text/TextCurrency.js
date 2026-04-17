/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TextContent from './TextContent';
import Title from '@common/components/text/Title';
import Icon from '@common/components/icon/Icon';
import { FLEXA } from '../../../resources/images';
import {
  TEXT_GRAY_COLOR,
  DARK_BLUE_COLOR,
  SPVP2_COLOR,
} from '../../../resources/palette';
import {
  formatCurrency,
  formatCurrencyNoLocale,
} from '../../../resources/formats';
import { renderText } from '../StringHelper';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting || {};

const balanceColor = {
  generic: DARK_BLUE_COLOR,
  aia: DARK_BLUE_COLOR,
  dhl: BuildVersion.palette.ACCENT_COLOR,
  athena: DARK_BLUE_COLOR,
  pepsi: SPVP2_COLOR,
  nestle: SPVP2_COLOR,
};

const TextCurrency = ({
  style,
  title,
  titleSize = 'little-smaller',
  titleStyle,
  valueStyle,
  value,
  valueSize = 'large-title',
  isShowIcon = false,
  flexAStyle,
  flexASource = FLEXA,
  isNeedFormatCurrency = true,
  ...props
}) => {
  const currencies = {
    generic: (
      <View style={[styles.rewardCoins, style]} {...props}>
        {title && (
          <TextContent
            size={titleSize}
            style={[styles.walletTitle, titleStyle]}>
            {title}
          </TextContent>
        )}
        <View style={styles.walletPoint}>
          {isShowIcon && (
            <Icon
              name="Coin"
              type="Line"
              size={24}
              color={balanceColor[setting.version]}
              style={styles.walletIcon}
            />
          )}
          <View style={styles.walletDescription}>
            <Title
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
              size={valueSize}
              style={[styles.rewardCoinLabel, valueStyle]}>
              {isNeedFormatCurrency ? formatCurrency(value) : value}
            </Title>
          </View>
        </View>
      </View>
    ),
    aia: (
      <View style={[styles.rewardCoins, style]} {...props}>
        {title && !renderText(title).includes('FlexA') && (
          <Title style={titleStyle} size={titleSize}>
            {title}
          </Title>
        )}
        <View style={styles.walletPoint}>
          <View style={styles.walletDescription}>
            <Title
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
              size={valueSize}
              style={[styles.rewardCoinLabelAIA, valueStyle]}>
              {formatCurrencyNoLocale(value / 1000)}
            </Title>
            <Image
              source={flexASource}
              style={[styles.imageRewardCoinAIA, flexAStyle]}
            />
          </View>
        </View>
      </View>
    ),
    dhl: (
      <View style={[styles.rewardCoins, style]} {...props}>
        {title && (
          <TextContent
            size={titleSize}
            style={[
              styles.walletTitle,
              titleStyle,
              { textTransform: 'uppercase' },
            ]}>
            {title}
          </TextContent>
        )}
        <View style={styles.walletPoint}>
          <View style={styles.walletDescription}>
            <Title
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
              size={valueSize}
              style={[styles.rewardCoinLabel, valueStyle]}>
              {isNeedFormatCurrency
                ? formatCurrency(value)
                : value +
                (value > 1
                  ? ` ${renderText(setting.coinTextUnit)}`
                  : ` ${renderText(setting.pointTextUnit)}`)}
            </Title>
          </View>
        </View>
      </View>
    ),
    athena: (
      <View style={[styles.rewardCoins, style]} {...props}>
        {title && (
          <TextContent
            size={titleSize}
            style={[styles.walletTitle, titleStyle]}>
            {title}
          </TextContent>
        )}
        <View style={styles.walletPoint}>
          <View style={styles.walletDescription}>
            <Title
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
              size={valueSize}
              style={[styles.rewardCoinLabel, valueStyle]}>
              {isNeedFormatCurrency ? formatCurrency(value) : value}
            </Title>
          </View>
        </View>
      </View>
    ),
    pepsi: (
      <View style={[styles.rewardCoins, style]} {...props}>
        {title && (
          <TextContent
            size={titleSize}
            style={[styles.walletTitle, titleStyle]}>
            {title}
          </TextContent>
        )}
        <View style={styles.walletPoint}>
          <View style={styles.walletDescription}>
            <Title
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
              size={valueSize}
              style={[styles.rewardCoinLabel, valueStyle]}>
              {isNeedFormatCurrency ? formatCurrency(value) : value}
            </Title>
          </View>
        </View>
      </View>
    ),
    nestle: (
      <View style={[styles.rewardCoins, style]} {...props}>
        {title && (
          <TextContent
            size={titleSize}
            style={[styles.walletTitle, titleStyle]}>
            {title}
          </TextContent>
        )}
        <View style={styles.walletPoint}>
          <View style={styles.walletDescription}>
            <Title
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
              size={valueSize}
              style={[styles.rewardCoinLabel, valueStyle]}>
              {isNeedFormatCurrency ? formatCurrency(value) : value}
            </Title>
          </View>
        </View>
      </View>
    ),
  };
  return <View>{currencies[setting.version]}</View>;
};
const styles = StyleSheet.create({
  rewardCoins: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  walletTitle: {
    color: TEXT_GRAY_COLOR,
    marginBottom: 8,
  },

  walletTitleAIA: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginLeft: 4,
  },
  walletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    marginEnd: 8,
    justifyContent: 'center',
  },
  walletDescription: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recognitionPointLabel: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginHorizontal: 2,
    textAlignVertical: 'center',
  },
  rewardCoinLabel: {
    color: IS.NESTLE ? '#00AFAA' : balanceColor[setting.version],
    marginHorizontal: 2,
    textAlignVertical: 'center',
  },
  rewardCoinLabelAIA: {
    color: BuildVersion.palette.PINK_COLOR,
    marginHorizontal: 2,
    textAlignVertical: 'center',
  },
  highlightStyle: {
    fontWeight: 'bold',
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  imageRewardCoinAIA: {
    resizeMode: 'contain',
    width: 60,
    height: 40,
  },
});
export default TextCurrency;