import React from 'react';
import {StyleSheet} from 'react-native';
import {findAll} from 'highlight-words-core';
import TextContent from './TextContent';
import {DARK_COLOR} from '@resources/palette';

const HighlightTextContent = ({
  autoEscape,
  highlightStyle,
  searchWords = [],
  textToHighlight,
  sanitize,
  size = 'medium',
  weight = 'normal',
  style,
  ...props
}) => {
  var chunks = [];
  try {
    chunks = findAll({
      textToHighlight,
      searchWords,
      sanitize,
      autoEscape,
    });
  } catch (error) {}

  return (
    <TextContent style={style} size={size} weight={weight} {...props}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(
          chunk.start,
          chunk.end - chunk.start,
        );

        return !chunk.highlight ? (
          text
        ) : (
          <TextContent
            key={index}
            style={{
              ...styles.highlight,
              ...(chunk.highlight && highlightStyle),
            }}
            size={size}
            weight={weight}>
            {text}
          </TextContent>
        );
      })}
    </TextContent>
  );
};

const styles = StyleSheet.create({
  highlight: {
    color: DARK_COLOR,
  },
});

export default HighlightTextContent;
