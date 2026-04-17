import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Letter = ({children, spacing, textStyle}) => {
  const letterStyles = [textStyle, {paddingRight: spacing}];

  return <Text style={letterStyles}>{children}</Text>;
};

const spacingForLetterIndex = (letters, index, spacing) =>
  letters.length - 1 === index ? 0 : spacing;

export const TextWithLetterSpacing = ({
  children,
  spacing,
  viewStyle,
  textStyle,
}) => {
  const letters = children.split('');

  return (
    <View style={[styles.container, viewStyle]}>
      {letters.map((letter, index) => (
        <Letter
          key={index}
          spacing={spacingForLetterIndex(letters, index, spacing)}
          textStyle={textStyle}>
          {letter}
        </Letter>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
