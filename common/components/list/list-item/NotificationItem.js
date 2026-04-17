import React, { Fragment } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TextContent from '../../text/TextContent';
import HighlightTextContent from '../../text/HighlightTextContent';
import Icon from '../../icon/Icon';
import {
  GRAY_COLOR,
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
  LIGHT_GRAY_COLOR_3,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import { FLEXA } from '@resources/images';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
const eveStyles = BuildVersion.styles || {};

const NotificationItem = ({
  notificationType,
  style,
  textStyle,
  icon = null,
  title = null,
  description = null,
  createdAtDateFormat = null,
  isRead = true,
  highlightTitle,
  highlightWords = [],
  fullLine = false,
  ...props
}) => {
  var isFlexA = false;
  var contentFistFlexA = [];
  var point = '';
  if (highlightWords.length > 0) {
    isFlexA = highlightWords[0].indexOf('FlexA') > 1;
    if (isFlexA) {
      contentFistFlexA = description.split('FlexA');
      point = highlightWords[0].replace('FlexA', '');
    }
  }
  const isSPVB = notificationType === 'SPVB';

  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...(isRead && styles.activeContainer),
        ...(!isRead && styles.inactiveContainer),
        ...(!isRead && eveStyles.sectionBackground),
        ...style,
      }}>
      {/* {icon.source ? (
        <View style={styles.icon}>
          <Icon {...icon} size={48} noColor={true} />
        </View>
      ) : (
        <View style={[styles.iconBorder, {borderColor: icon.color}]}>
          <Icon {...icon} />
        </View>
      )} */}

      <View style={styles.info}>

        {isSPVB && IS.PEPSI ?
          <Fragment>
            <TextContent style={styles.title2}>{title}</TextContent>
            <TextContent style={styles.desc} numberOfLines={4}>{description}</TextContent>
          </Fragment>
          : isFlexA ?
            <View>
              <TextContent style={{ ...styles.title, ...textStyle }} numberOfLines={2} ellipsizeMode="tail">
                <HighlightTextContent
                  size="medium-subtitle"
                  style={{ ...styles.titleFlexA, }}
                  textToHighlight={contentFistFlexA[0]}
                  searchWords={[point]}
                  highlightStyle={styles.highlightTextFlexAStyle}
                />
                <Image source={FLEXA} style={styles.imageRewardCoinDescriptionAIA} />
                <HighlightTextContent
                  size="medium-subtitle"
                  style={{ ...styles.title, ...textStyle, }}
                  textToHighlight={contentFistFlexA[1]}
                  searchWords={highlightWords}
                  highlightStyle={styles.highlightStyle}
                />
              </TextContent>
            </View>
            :
            <TextContent style={{ ...styles.title, ...textStyle, }}  {...(!fullLine && { numberOfLines: 4, ellipsizeMode: 'tail' })}>
              {highlightTitle ? <TextContent style={styles.title2}>{title}</TextContent> : title}
              <HighlightTextContent
                size="medium-subtitle"
                style={{ ...styles.title, ...textStyle, }}
                textToHighlight={description}
                searchWords={highlightWords}
                highlightStyle={styles.highlightStyle}
              />
            </TextContent>
        }

        <TextContent style={{ ...styles.subtitle, ...textStyle }} size="little-smaller">
          {createdAtDateFormat}
        </TextContent>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: LIGHT_GRAY_COLOR_2,
    borderBottomWidth: 1,
    paddingVertical: IS.PEPSI ? 12 : 24,
  },
  inactiveContainer: {
    backgroundColor: IS ? 'rgba(255, 189, 183, 0.5)' : LIGHT_GRAY_COLOR_3,
  },
  activeContainer: {
    backgroundColor: LIGHT_COLOR,
  },
  icon: {
    marginRight: 12,
    marginVertical: 16,
  },
  iconBorder: {
    marginRight: 12,
    marginVertical: 16,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 0.75,
  },
  info: {
    flexShrink: 1,
    paddingTop: 4,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  title2: {
    color: TEXT_DARK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  desc: {
    marginVertical: 6,
    color: TEXT_DARK_COLOR,
    fontSize: 14,
    lineHeight: 20,
  },
  subtitle: {
    color: GRAY_COLOR,
  },
  highlightStyle: {
    fontWeight: 'bold',
  },
  highlightTextFlexAStyle: {
    fontWeight: 'bold',
    height: 20,
  },
  imageRewardCoinDescriptionAIA: {
    resizeMode: 'contain',
    width: 40,
    height: 13,
  },
  titleFlexA: {
    color: TEXT_DARK_COLOR,
    height: 20,
  },
});

export default NotificationItem;
