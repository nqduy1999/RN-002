import React from 'react';
import { View, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import TextContent from '../../text/TextContent';
import { TEXT_DARK_COLOR } from '@resources/palette';
import { PLACEHOLDER_IMAGE } from '@resources/images';
import {
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  SHADOW_COLOR,
} from '../../../../resources/palette';
import Title from '../../text/Title';
import FastImage from 'react-native-fast-image';
import TextCurrency from '../../text/TextCurrency';
import ShadowView from 'react-native-simple-shadow-view';
import BuildVersion from '@resources/build_version/BuildVersion';

const { width } = Dimensions.get('window');
const isAthena = BuildVersion.setting.version;

const TopBenefitsItem = ({
  style,
  textStyle,
  title = null,
  subtitle = null,
  coverImage = null,
  money = 0,
  logo = null,
  ...props
}) => {
  const BodyComponent = () => (
    <>
      <View style={styles.coverImageWrapper}>
        <FastImage
          {...coverImage}
          source={
            coverImage.source.uri == null
              ? PLACEHOLDER_IMAGE
              : coverImage.source
          }
          style={{ flex: 1, width: 'auto' }}
        />
        <View style={styles.logoWrapper}>
          <Image
            {...logo}
            source={logo.source.uri ? logo.source : PLACEHOLDER_IMAGE}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.infoSection}>
        <Title style={{ ...styles.title, ...textStyle }} size="medium-subtitle">
          {title}
        </Title>
        <View style={styles.subtitleSection}>
          <TextContent numberOfLines={2} style={styles.subtitle}>
            {subtitle}
          </TextContent>
          {money >= 1000 && !isAthena && (
            <View style={styles.moneySection}>
              <TextCurrency
                valueSize="medium-subtitle"
                valueStyle={styles.money}
                value={money}
                flexAStyle={{ width: 38, height: 38 }}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );

  return (
    <>
      {Platform.OS === 'android' ? (
        <ShadowView
          style={{
            ...styles.containerShadowView,
            ...style,
          }}>
          <View
            {...props}
            style={{
              ...styles.containerView,
              ...style,
            }}>
            <BodyComponent />
          </View>
        </ShadowView>
      ) : (
        <View
          {...props}
          style={{
            ...styles.container,
            ...style,
          }}>
          <BodyComponent />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: isAthena ? width - 35 : width * 0.8,
    height: 210,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.3,
    elevation: 1,
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginBottom: isAthena ? 16 : 12,
    marginEnd: 6,
    marginStart: 6,
  },
  containerShadowView: {
    width: isAthena ? width - 35 : width * 0.8,
    height: 210,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 1,
    borderColor: LIGHT_GRAY_COLOR_2,
    backgroundColor: LIGHT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginEnd: 6,
    marginStart: 6,
    marginBottom: isAthena ? 16 : 4,
  },
  containerView: {
    width: width * 0.8,
    alignItems: 'center',
  },
  coverImageWrapper: {
    width: '100%',
    height: 130,
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
  },
  infoSection: {
    height: 80,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    overflow: 'hidden',
    backgroundColor: LIGHT_COLOR,
  },
  subtitleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  subtitle: {
    flex: 1,
    color: TEXT_DARK_COLOR,
    alignSelf: 'flex-start',
    marginEnd: 12,
  },
  moneySection: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  money: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default TopBenefitsItem;
