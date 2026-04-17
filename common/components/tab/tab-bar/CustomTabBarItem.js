import TitleComponent from '@common/components/text/TitleComponent';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  TAB_BAR_HOME,
  TAB_BAR_WALLET,
  TAB_BAR_ACCOUNT,
  TAB_BAR_RECOGNITION,
  TAB_BAR_AIACelebration,
  TAB_BAR_FLEXIBLE_BENEFITS,
  TAB_BAR_NEWS,
  TAB_BAR_WELLNESS,
  TAB_BAR_BENEFITS,
} from '@resources/string/strings';
import { GRAY_COLOR } from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';
import Icon from '@common/components/icon/Icon';
import {
  TABBAR_NEWS_ACTIVE,
  TABBAR_NEWS_INACTIVE,
  TABBAR_RECOGNITION_ACTIVE,
  TABBAR_RECOGNITION_INACTIVE,
  TABBAR_AIACelebration_ACTIVE,
  TABBAR_AIACelebration_INACTIVE,
  TABBAR_WELLNESS_ACTIVE,
  TABBAR_WELLNESS_INACTIVE,
  TABBAR_WALLET_ACTIVE,
  TABBAR_WALLET_INACTIVE,
  SVG_TABBAR_ACCOUNT,
  SVG_TABBAR_FLEXIBLE_BENEFITS,
  SVG_TABBAR_HOME,
} from '@resources/images';

import { isCustomize, getCustomize } from '@utils/CoreUtils';

const version = BuildVersion.setting.version;

const tabInfos = {
  'Home': [
    TAB_BAR_HOME,
    BuildVersion.tabIcons?.home || { source: SVG_TABBAR_HOME },
  ],
  'Account': [
    TAB_BAR_ACCOUNT,
    BuildVersion.tabIcons?.account || { source: SVG_TABBAR_ACCOUNT },
  ],
  'Recognition': [
    TAB_BAR_RECOGNITION,
    BuildVersion.tabIcons?.recognition || [TABBAR_RECOGNITION_INACTIVE, TABBAR_RECOGNITION_ACTIVE],
  ],
  'AIACelebration': [
    TAB_BAR_AIACelebration,
    [TABBAR_AIACelebration_INACTIVE, TABBAR_AIACelebration_ACTIVE, true],
  ],
  'FlexibleBenefits': [
    version === 'athena' ? TAB_BAR_BENEFITS : TAB_BAR_FLEXIBLE_BENEFITS,
    { source: SVG_TABBAR_FLEXIBLE_BENEFITS },
  ],
  'News': [
    TAB_BAR_NEWS,
    [TABBAR_NEWS_INACTIVE, TABBAR_NEWS_ACTIVE],
  ],
  'Wallet': [
    TAB_BAR_WALLET,
    [TABBAR_WALLET_INACTIVE, TABBAR_WALLET_ACTIVE],
  ],
  'Wellness': [
    TAB_BAR_WELLNESS,
    [TABBAR_WELLNESS_INACTIVE, TABBAR_WELLNESS_ACTIVE],
  ],
};

class CustomTabBarItem extends React.PureComponent {
  render() {
    const { focused, routeName, navigation, user } = this.props;
    let tabColors = [GRAY_COLOR, BuildVersion.palette.PINK_COLOR];
    if (isCustomize()) { tabColors[1] = getCustomize('mainColor'); }
    let tabIcon, tabColor = tabColors[+focused], [label, icons] = tabInfos[routeName];
    let tabLabel = <TitleComponent size={'very-small'} style={{ ...styles.tabLabel, color: tabColors[+focused] }}>{label}</TitleComponent>;
    if (Array.isArray(icons)) {
      tabIcon = <Image source={icons[+focused]} style={{ width: 24, height: 24, ...(!icons[2] && { tintColor: tabColor }) }} />;
    } else {
      tabIcon = <Icon {...icons} type={'Solid'} size={24} color={tabColor} stroke={!focused} />;
    }
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          switch (routeName) {
            case 'FlexibleBenefits':
              if (!user.isFlexibleBenefitEnabled) { return; }
              break;
            case 'Recognition':
              if (!user.isRecognitionEnabled) { return; }
              break;
            case 'News':
              if (!user.isNewsEnabled) { return; }
              break;
            default: break;
          }
          navigation.popToTop();
          navigation.navigate(routeName);
        }}>
        <View style={styles.tabItem}>
          {tabIcon}
          {tabLabel}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    padding: 4,
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  container: {
    flex: 1,
    height: 65,
    paddingTop: 4,
  },
});

export default CustomTabBarItem;
