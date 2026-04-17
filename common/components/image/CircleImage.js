import React from 'react';
import {Image, StyleSheet} from 'react-native';

const CircleImage = props => {
  return (
    <Image resizeMode="cover" {...props} style={[styles.image, props.style]} />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 40,
    width: 80,
    height: 80,
  },
});

export default CircleImage;
