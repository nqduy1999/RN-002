import React from 'react';
import {Image, StyleSheet} from 'react-native';

const AvatarImage = props => {
  return (
    <Image resizeMode="cover" {...props} style={[styles.image, props.style]} />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 24,
    width: 48,
    height: 48,
  },
});

export default AvatarImage;
