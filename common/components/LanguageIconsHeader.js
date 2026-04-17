import React from 'react';
import {View, StyleSheet} from 'react-native';
import SvgIcon from './icon/SvgIcon';
import BuildVersion from '@resources/build_version/BuildVersion';

const LanguageIconsHeader = ({language, style, icons}) => {
  return (
    <View style={[styles.container, style]}>
      {icons.map((item, index) => {
        return (
          <SvgIcon
            key={index}
            svgIcon={item.svgIcon}
            onPress={item.onPress}
            style={styles.icon}
            buttonStyle={
              language === item.language
                ? styles.activeIcon
                : styles.inactiveIcon
            }
            width={24}
            height={24}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    paddingHorizontal: 7.5,
  },
  activeIcon: {
    borderColor: BuildVersion.palette.ACCENT_COLOR,
    borderWidth: 1,
    padding: 1,
    borderRadius: 13,
  },
  inactiveIcon: {
    padding: 1,
  },
});

export default LanguageIconsHeader;
