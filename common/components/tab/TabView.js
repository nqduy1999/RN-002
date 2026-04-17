import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview';

import RecognitionTabBar from './tab-bar/RecognitionTabBar';
import TextTabBar from './tab-bar/TextTabBar';

import { LIGHT_COLOR } from '@resources/palette';
import { IS } from '@resources/build_version/BuildVersion';

const TABBAR_TYPES = {
  default: View,
  recognition: RecognitionTabBar,
  'news-documents': TextTabBar,
  ...(IS.NESTLE ? {
    reward: TextTabBar,
    redeem: TextTabBar,
  } : {
    redeem: TextTabBar,
    reward: TextTabBar,
  }),
  'flexible-benefit': TextTabBar,
};

export default class TabView extends Component {
  render() {
    const {
      style,
      children,
      tabBarPosition = 'top',
      onChangeTab,
      header,
      tabBarType = 'default',
      hideUnderline = false,
      locked = false,
      initialPage = 0,
      scrollTabRef,
      lang,
      tabBarProp = undefined,
      ...props
    } = this.props;
    const TabBar = TABBAR_TYPES[tabBarType];
    return (
      <ScrollableTabView
        {...props}
        showsHorizontalScrollIndicator={false}
        style={[styles.container, style]}
        ref={scrollTabRef}
        renderTabBar={() => (
          <TabBar tabBarPosition={tabBarPosition} tabBarProp={tabBarProp} />
        )}
        tabBarPosition={tabBarPosition}
        tabBarBackgroundColor={LIGHT_COLOR}
        tabBarUnderlineStyle={hideUnderline && styles.underline}
        locked={locked}
        initialPage={initialPage}
        onChangeTab={obj => {
          onChangeTab && onChangeTab(obj, tabBarType);
        }}>
        {children}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  underline: {
    backgroundColor: 'transparent',
    display: 'none',
  },
  container: {
    // flex: 1,
    backgroundColor: 'transparent',
  },
});
