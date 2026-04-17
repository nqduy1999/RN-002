import React from 'react';
import { View, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import TextContent from '../../text/TextContent';
import { TEXT_DARK_COLOR } from '@resources/palette';
import {
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  SHADOW_COLOR,
  TEXT_GRAY_COLOR,
} from '../../../../resources/palette';
import Title from '../../text/Title';
import { LABEL_WALLET_EXPIRED } from '../../../../resources/string/strings';
import Dash from 'react-native-dash';
import ShadowView from 'react-native-simple-shadow-view';

const { width } = Dimensions.get('window');

const RewardExpiredItem = ({
  style,
  id,
  textStyle,
  title = null,
  subtitle = null,
  logo = null,
}) => {
  const BodyComponent = () => (
    <>
      <View style={styles.infoSection}>
        <View style={styles.logoWrapper}>
          <Image {...logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.infoWrapper}>
          <Title style={{ ...styles.title, ...textStyle }} size="medium-subtitle">
            {title}
          </Title>
          <TextContent style={styles.subtitle}>{subtitle}</TextContent>
        </View>
      </View>
      <Dash
        style={styles.divider}
        dashGap={2}
        dashLength={4}
        dashColor={LIGHT_GRAY_COLOR_2}
        dashThickness={1}
      />
      <View style={styles.detailSection}>
        <View style={styles.expiredSection}>
          <TextContent
            style={styles.expired}
            size="little-smaller"
            weight="bold">
            {LABEL_WALLET_EXPIRED}
          </TextContent>
        </View>
      </View>
    </>
  )

  return (
    <>
      {Platform.OS === 'android' ? (
        <ShadowView style={{
          ...styles.containerShadowView,
          ...style,
        }}>
          <View
            style={{
              ...styles.containerView,
            }}>
            <BodyComponent />
          </View>
        </ShadowView>
      ) : (
          <View
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
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 24,
    padding: 12,
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.75,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  containerShadowView: {
    marginRight: 4,
    marginLeft: 4,
    marginTop: 2,
    marginBottom: 24,
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  containerView: {
    padding: 12,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    overflow: 'hidden',
    width: 64,
    height: 64,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: LIGHT_GRAY_COLOR_2,
    marginEnd: 30,
  },
  logo: {
    width: 64,
    height: 64,
  },
  infoWrapper: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  subtitle: {
    color: TEXT_GRAY_COLOR,
  },
  divider: {
    width: width - 45,
    height: 0.75,
    marginVertical: 12,
    marginHorizontal: -12,
  },
  detailSection: {},
  expiredSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expired: {
    color: TEXT_DARK_COLOR,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
});

export default RewardExpiredItem;
