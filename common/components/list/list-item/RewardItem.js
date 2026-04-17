import React from 'react';
import { View, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import TextContent from '../../text/TextContent';
import { TEXT_DARK_COLOR } from '@resources/palette';
import { PLACEHOLDER_IMAGE } from '@resources/images';
import {
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  SHADOW_COLOR,
  TEXT_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
} from '../../../../resources/palette';
import Title from '../../text/Title';
import {
  LABEL_FLEX_POINTS,
  LABEL_FLEX_POINT,
} from '../../../../resources/string/strings';
import FastImage from 'react-native-fast-image';
import BuildVersion from '@resources/build_version/BuildVersion';
import ShadowView from 'react-native-simple-shadow-view';

const setting = BuildVersion.setting;
const FlexAUnit = BuildVersion.component.FlexAUnit;

const { width } = Dimensions.get('window');

const RewardItem = ({
  style,
  textStyle,
  title = null,
  subtitle = null,
  coverImage = null,
  coin = null,
  logo = null,
  ...props
}) => {
  const coinLabel = coin > 0 ? LABEL_FLEX_POINTS : LABEL_FLEX_POINT;
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}
    >
      <View style={styles.coverImageWrapper}>
        <FastImage
          {...coverImage}
          source={
            coverImage.source.uri == null
              ? PLACEHOLDER_IMAGE
              : coverImage.source
          }
          style={styles.coverImage}
        />
        <View style={styles.logoWrapper}>
          <Image {...logo} style={styles.logo} resizeMode="contain" />
        </View>
      </View>
      {Platform.OS === 'android' ? (
        <View style={styles.infoWrapShadowViewSection}>
          <ShadowView style={styles.infoAndroidSection}>
            <Title
              style={{ ...styles.title, ...textStyle }}
              size="medium-subtitle"
            >
              {title}
            </Title>
            <View style={styles.subtitleSection}>
              <TextContent style={styles.subtitle}>{subtitle}</TextContent>
              <View style={styles.coinSection}>
                <Title size="little-smaller" style={styles.coin}>
                  {coin}
                </Title>

                <TextContent size="little-smaller" style={styles.coin}>
                  {setting.coinTextUnit}
                </TextContent>

                <FlexAUnit imageStyle={styles.imageRewardCoinAIA} />
              </View>
            </View>
          </ShadowView>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <Title style={{ ...styles.title, ...textStyle }} size="medium-subtitle">
            {title}
          </Title>
          <View style={styles.subtitleSection}>
            <TextContent style={styles.subtitle}>{subtitle}</TextContent>
            <View style={styles.coinSection}>
              <Title size="little-smaller" style={styles.coin}>
                {coin}
              </Title>

              <TextContent size="little-smaller" style={styles.coin}>
                {setting.coinTextUnit}
              </TextContent>

              <FlexAUnit imageStyle={styles.imageRewardCoinAIA} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  coverImageWrapper: {
    borderWidth: 0.3,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
    overflow: 'hidden',
  },
  coverImage: {
    width: width - 36,
    height: (width - 36) * 0.4,
  },
  logoWrapper: {
    position: 'absolute',
    bottom: 11,
    left: 11,
    borderRadius: 4,
    overflow: 'hidden',
    width: 36,
    height: 36,
  },
  logo: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
  },
  title: {
    color: TEXT_DARK_COLOR,
    alignSelf: 'flex-start',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: 'bold',
  },
  infoSection: {
    width: width - 36,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    overflow: 'hidden',
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 8,
  },
  infoAndroidSection: {
    width: width - 38,
    marginLeft: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 8,
  },
  infoWrapShadowViewSection: {
    width: width - 36,
  },
  subtitleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  subtitle: {
    flex: 1,
    color: TEXT_GRAY_COLOR,
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: 'normal',
    lineHeight: 16,
  },
  coinSection: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 4,
  },
  coin: {
    marginHorizontal: 2,
    color: BuildVersion.palette.ACCENT_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  imageRewardCoinAIA: {
    resizeMode: 'contain',
    width: 35,
    height: 20,
    marginLeft: 4,
  },
});

export default RewardItem;
