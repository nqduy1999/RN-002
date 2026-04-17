import React from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import {LIGHT_GRAY_COLOR_2} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';
import Swiper from 'react-native-swiper';

const renderItems = images => {
  return images.map((item, index) => {
    return (
      <View key={index}>
        <Image
          style={[
            styles.image,
            BuildVersion.setting.version === 'athena' && styles.imageAthena,
          ]}
          {...item}
          resizeMode="cover"
        />
      </View>
    );
  });
};

const CustomSwiper = ({style, images}) => {
  return (
    <View
      style={[
        styles.container,
        BuildVersion.setting.version === 'athena' && styles.containerAthena,
        style,
      ]}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dotColor={LIGHT_GRAY_COLOR_2}
        activeDotColor={BuildVersion.palette.PINK_COLOR}
        activeDotStyle={styles.activeDotStyle}>
        {renderItems(images)}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 180,
  },
  containerAthena: {
    height: 200,
  },
  wrapper: {
    marginHorizontal: 18,
  },
  image: {
    height: 130,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    width: Dimensions.get('window').width - 36,
    overflow: 'hidden',
  },
  imageAthena: {
    height: 150,
  },
  activeDotStyle: {
    width: 19,
  },
});

export default CustomSwiper;
