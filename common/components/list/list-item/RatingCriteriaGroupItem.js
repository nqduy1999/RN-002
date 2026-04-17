import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import {
  LIGHT_COLOR,
  TEXT_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
} from '@resources/palette';
import {SvgCssUri} from 'react-native-svg';
import BuildVersion, {IS} from '@resources/build_version/BuildVersion';
import WebView from 'react-native-webview';
import Collapsible from 'react-native-collapsible';
import {SVG_ICON_DOWN, SVG_ICON_UP} from '@resources/images';
import Icon from '@common/components/icon/Icon';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const setting = BuildVersion.setting || {};

const RatingCriteriaGroupItem = ({
  style,
  title = null,
  criteriaGroup,
  idSelected = undefined,
  onPress,
  expandedId,
  ...props
}) => {
  const isSelected = criteriaGroup.some(
    (criteriaGroupItem) => criteriaGroupItem.id == idSelected
  );

  const htmlWrapper = (html, isSelect) =>
    `<html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { 
              color: ${isSelect ? '#D40511' : '#7B7B7B'}; 
              text-align: center; 
              padding: 0; 
              margin: 0; 
              font-size: 14px;
            }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>`;

  const isCollapsed = props.id !== expandedId;

  let color = '';
  switch (props.name) {
    case 'One Family':
      color = '#2878BE';
      break;
    case 'Engagement':
      color = '#FF8300';
      break;
    case 'Yatte Minahare':
      color = '#00B9B9';
      break;
    case 'Agile Learning':
      color = '#0DB14B';
      break;
  }

  const generic = () => (
    <View
      {...props}
      style={{
        ...styles.container,
        ...(IS.PEPSI && isCollapsed && styles.containerPepsi),
        ...(isSelected === true && styles.activeContainer),
        ...(isSelected === true && IS.PEPSI && {borderColor: color}),
        ...(isSelected === false && styles.inactiveContainer),
        ...style,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => IS.PEPSI && onPress(props.id)}
        style={styles.titleContainer}
      >
        <Title
          style={{
            ...styles.inactiveText,
            ...(isSelected === true && styles.activeText),
            ...(isSelected === true && IS.PEPSI && {color: color}),
          }}
          size="medium-button"
        >
          {title}
        </Title>
        {IS.PEPSI && (
          <Icon
            source={isCollapsed ? SVG_ICON_DOWN : SVG_ICON_UP}
            stroke={true}
            style={{marginStart: 8}}
          />
        )}
      </TouchableWithoutFeedback>
      <Collapsible
        collapsed={IS.PEPSI && isCollapsed}
        style={IS.PEPSI && {height: 30 + 52 * criteriaGroup.length}}
      >
        <View style={styles.divide} />
        <View style={styles.ratingCriteriaGroup}>
          {criteriaGroup.map((criteria, index) => (
            <TouchableOpacity
              key={index}
              style={styles.criteria}
              onPress={() => onPress(criteria)}
            >
              <SvgCssUri
                width="32"
                height="32"
                uri={
                  idSelected === criteria.id
                    ? criteria.selectedImageUrl
                    : criteria.imageUrl
                }
              />
              <TextContent
                weight="bold"
                size="little-smaller"
                style={[
                  idSelected === criteria.id
                    ? styles.criteriaTextSelected
                    : styles.criteriaText,
                  idSelected === criteria.id && IS.PEPSI && {color: color},
                ]}
              >
                {criteria.title}
              </TextContent>
            </TouchableOpacity>
          ))}
        </View>
      </Collapsible>
    </View>
  );

  const dhl = () => (
    <View style={styles.dhlCriteriaGroup}>
      {criteriaGroup.map((criteria, index) => (
        <View key={index} style={styles.dhlCriteria}>
          <TouchableOpacity onPress={() => onPress(criteria)}>
            <View
              style={{
                ...styles.dhlCriteriaIcon,
                ...(idSelected === criteria.id &&
                  styles.dhlCriteriaIconSelected),
              }}
            >
              <SvgCssUri
                width="80"
                height="80"
                uri={
                  idSelected === criteria.id
                    ? criteria.selectedImageUrl
                    : criteria.imageUrl
                }
              />
            </View>
            <WebView
              style={styles.dhlCriteriaText}
              source={{
                html: htmlWrapper(criteria.title, idSelected === criteria.id),
              }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const render = {
    generic: generic,
    aia: generic,
    dhl: dhl,
    athena: generic,
    pepsi: generic,
    nestle: generic,
  };

  return render[setting.version]();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_COLOR,
    marginBottom: 14,
    width: '100%',
    borderColor: LIGHT_GRAY_COLOR,
    borderRadius: 10,
    borderWidth: 0.75,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  containerPepsi: {
    paddingBottom: 10,
  },
  imageIcon: {
    width: 60,
    height: 60,
  },
  activeContainer: {
    borderColor: BuildVersion.palette.PINK_COLOR,
  },
  inactiveContainer: {
    borderColor: LIGHT_GRAY_COLOR,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  inactiveText: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  activeText: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  divide: {
    backgroundColor: LIGHT_GRAY_COLOR,
    width: '100%',
    height: 0.5,
    marginTop: 10,
  },
  ratingCriteriaGroup: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  criteria: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // flex: 1,
  },
  criteriaText: {
    color: TEXT_GRAY_COLOR,
    marginStart: 18,
    flexShrink: 1,
    fontWeight: 'normal',
  },
  criteriaTextSelected: {
    color: BuildVersion.palette.PINK_COLOR,
    marginStart: 18,
    flexShrink: 1,
  },
  dhlCriteriaGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  dhlCriteria: {
    width: 100,
    marginVertical: 10,
  },
  dhlCriteriaIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#AEAEAE',
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dhlCriteriaIconSelected: {
    borderColor: '#D40511',
  },
  dhlCriteriaText: {
    marginTop: 10,
    height: 85,
    width: 100,
  },
});

export default RatingCriteriaGroupItem;
