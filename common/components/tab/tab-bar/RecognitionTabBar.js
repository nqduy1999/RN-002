import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import {
  GRAY_COLOR,
  SHADOW_COLOR,
  LIGHT_COLOR,
  LIGHT_GRAY_COLOR,
} from '@resources/palette';
import { FLEXA, FLEXA_GRAY } from '@resources/images';
import TextContent from '../../text/TextContent';
import Icon from '../../icon/Icon';
export const TabBarHeight = 96;
export const TabBarMarginTop = -30;
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import ShadowView from 'react-native-simple-shadow-view';
import FastImage from 'react-native-fast-image';

const setting = BuildVersion.setting;
const activeTabColor = IS.NESTLE ? '#00AFAA' : BuildVersion.palette.ACCENT_COLOR;

class RecognitionTabBar extends Component {

  renderIcon = (icon, isActive) => {
    let color = isActive ? activeTabColor : GRAY_COLOR;
    if (icon.isImg) {
      return <FastImage source={icon.source} resizeMode={'contain'} tintColor={color} style={styles.imgIcon} />;
    }
    return <Icon {...icon} size={28} style={styles.icon} color={color} />;
  }

  renderTab = (title, icon, page, isTabActive, onPressHandler, lang) => {
    return (
      <View style={styles.tabContainer} key={title}>
        {page != 0 && <View style={styles.divider} />}
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            Keyboard.dismiss();
            onPressHandler(page, title);
          }}
          key={`${title}`}>
          <View style={styles.tab}>
            {this.renderIcon(icon, isTabActive)}
            {/* render My FlexA Tab */}
            {setting.currencyUnit === 'FlexA' && page == 1 ? (
              <View style={styles.titleMyReward}>
                {lang === 'en' ? (
                  <View style={styles.titleMyRewardVI}>
                    <TextContent
                      size="little-smaller"
                      weight={isTabActive ? 'bold' : 'normal'}
                      style={
                        isTabActive
                          ? styles.textActiveMyRewardVI
                          : styles.textInactiveMyRewardVI
                      }>
                      My
                    </TextContent>
                    <Image
                      source={isTabActive ? FLEXA : FLEXA_GRAY}
                      style={styles.imageMyRewardFlexA}
                    />
                  </View>
                ) : (
                  <View style={styles.titleMyRewardVI}>
                    <Image
                      source={isTabActive ? FLEXA : FLEXA_GRAY}
                      style={styles.imageMyRewardFlexAVI}
                    />

                    <TextContent
                      size="little-smaller"
                      weight={isTabActive ? 'bold' : 'normal'}
                      style={
                        isTabActive
                          ? styles.textActiveMyRewardVI
                          : styles.textInactiveMyRewardVI
                      }>
                      của tôi
                    </TextContent>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.text}>
                <TextContent
                  size="little-smaller"
                  weight={isTabActive ? 'bold' : 'normal'}
                  style={isTabActive ? styles.textActive : styles.textInactive}>
                  {title}
                </TextContent>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <>
        {Platform.OS === 'android' ? (
          <ShadowView
            style={[
              styles.containerShadowView,
              { backgroundColor: this.props.backgroundColor },
              this.props.style,
              { ...this.props.tabBarProp },
            ]}>
            <Animated.View style={[styles.containerView]}>
              {this.props.tabs.map((item, page) => {
                const isTabActive = this.props.activeTab === page;
                const renderTab = this.props.renderTab || this.renderTab;
                return renderTab(
                  item.title,
                  item.icon,
                  page,
                  isTabActive,
                  this.props.goToPage,
                  item.lang,
                );
              })}
            </Animated.View>
          </ShadowView>
        ) : (
          <Animated.View
            style={[
              styles.tabs,
              { backgroundColor: this.props.backgroundColor },
              this.props.style,
              { ...this.props.tabBarProp },
            ]}>
            {this.props.tabs.map((item, page) => {
              const isTabActive = this.props.activeTab === page;
              const renderTab = this.props.renderTab || this.renderTab;
              return renderTab(
                item.title,
                item.icon,
                page,
                isTabActive,
                this.props.goToPage,
                item.lang,
              );
            })}
          </Animated.View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: Platform.OS === 'android' ? 2 : 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
    alignContent: 'center',
  },
  icon: {
    flex: 1,
  },
  imgIcon: {
    flex: 1,
    width: 28,
    height: 28,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: TabBarHeight,
    width: Dimensions.get('window').width - 36,
    backgroundColor: LIGHT_COLOR,
    paddingVertical: 16,
    borderRadius: 4,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    zIndex: 0,
    elevation: 2,
    marginHorizontal: 18,
    marginTop: TabBarMarginTop,
  },
  containerShadowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: TabBarHeight,
    width: Dimensions.get('window').width - 36,
    backgroundColor: LIGHT_COLOR,
    paddingVertical: 16,
    borderRadius: 4,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    zIndex: 0,
    elevation: 2,
    marginHorizontal: 18,
    marginTop: TabBarMarginTop,
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 36,
    backgroundColor: LIGHT_COLOR,
    marginHorizontal: 18,
  },
  textActive: {
    color: activeTabColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 11,
    paddingHorizontal: 2,
  },
  textInactive: {
    color: GRAY_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 2,
    fontSize: 12,
  },
  imageMyReward: {
    resizeMode: 'contain',
    flex: 1,
    width: 55,
  },
  imageMyRewardFlexA: {
    resizeMode: 'contain',
    width: 40,
    height: 14,
  },
  imageMyRewardFlexAVI: {
    resizeMode: 'contain',
    width: 40,
    height: 14,
  },
  textActiveMyRewardVI: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginLeft: 2,
    marginRight: 2,
  },
  textInactiveMyRewardVI: {
    color: GRAY_COLOR,
    marginLeft: 2,
    marginRight: 2,
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: LIGHT_GRAY_COLOR,
  },
  titleMyReward: {
    flex: 1,
    alignSelf: 'center',
  },
  titleMyRewardVI: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default RecognitionTabBar;
