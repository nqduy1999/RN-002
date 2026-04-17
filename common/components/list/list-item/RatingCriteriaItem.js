/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import {WebView} from 'react-native-webview';
import {
  LIGHT_COLOR,
  TEXT_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
} from '@resources/palette';
import {SvgCssUri} from 'react-native-svg';
import BuildVersion, {IS} from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting || {};

const RatingCriteriaItem = ({
  style,
  titleStyle,
  title = null,
  criteriaGroup,
  onPress,
  recognitionProgram,
  recognitionLevel,
  recognitionProgramImageUrl,
  isRenderGroupName = true,
  ...props
}) => {
  const htmlWrapper = (html) =>
    `<html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap" rel="stylesheet">
        <style>
          body { 
              color: #7B7B7B;
              padding: 0; 
              margin: 0; 
              display: flex;
              align-items: center;
              font-family: 'Roboto', sans-serif;
              font-size: ${style && style.fontSize ? style.fontSize : 16}px;
              ${IS.PEPSI && `color: ${color}`}
            }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>`;

  const criteria = criteriaGroup[0];

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

  const criteriaWithGroupName = () => (
    <View
      {...props}
      style={{
        ...styles.container,
        ...styles.activeContainer,
        ...(IS.PEPSI && {borderColor: color}),
        ...style,
      }}
    >
      <View style={styles.titleContainer}>
        <Title
          style={{
            ...styles.inactiveText,
            ...styles.activeText,
            ...(IS.PEPSI && {color: color}),
          }}
          size={!IS.PEPSI ? 'medium-button' : 'medium'}
        >
          {title}
        </Title>
      </View>
      <View style={styles.divide} />
      <View style={styles.ratingCriteriaGroup}>
        <View style={styles.criteria}>
          <SvgCssUri
            width="32"
            height="32"
            uri={criteriaGroup[0]?.selectedImageUrl}
          />
          <TextContent
            weight="bold"
            size="little-smaller"
            style={[styles.criteriaTextSelected, IS.PEPSI && {color: color}]}
          >
            {criteriaGroup[0]?.title}
          </TextContent>
        </View>
      </View>
    </View>
  );

  const criteriaWithoutGroupName = () =>
    // render as dhl style without group name
    criteria?.selectedImageUrl ? (
      <View style={[styles.dhlCriteria, style]}>
        <View style={styles.dhlCriteriaIcon}>
          <SvgCssUri width="48" height="48" uri={criteria.selectedImageUrl} />
        </View>
        <WebView
          source={{
            html: htmlWrapper(criteria.title),
          }}
        />
      </View>
    ) : (
      // if don't have criteria image render program name and level name
      <View style={[styles.dhlCriteria, style]}>
        {recognitionProgramImageUrl && (
          <Image
            source={{uri: recognitionProgramImageUrl}}
            style={styles.programImage}
          />
        )}
        <Title
          style={[
            styles.dhlCriteriaText,
            titleStyle,
            {textAlign: !recognitionProgramImageUrl ? 'center' : 'left'},
          ]}
        >
          {setting.version === 'athena'
            ? `${recognitionProgram}`
            : `${recognitionProgram} - ${recognitionLevel}`}
        </Title>
      </View>
    );

  const render = {
    generic: isRenderGroupName && !recognitionLevel ? criteriaWithGroupName : criteriaWithoutGroupName, // if (recognitionLevel) render program name and level like dhl style
    aia: isRenderGroupName ? criteriaWithGroupName : criteriaWithoutGroupName,
    dhl: criteriaWithoutGroupName,
    athena: isRenderGroupName ? criteriaWithGroupName : criteriaWithoutGroupName,
    pepsi: isRenderGroupName ? criteriaWithGroupName : criteriaWithoutGroupName,
    nestle: isRenderGroupName ? criteriaWithGroupName : criteriaWithoutGroupName,
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
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: {
    width: 32,
    height: 32,
  },
  activeContainer: {
    borderColor: BuildVersion.palette.PINK_COLOR,
  },
  inactiveContainer: {
    borderColor: LIGHT_GRAY_COLOR,
  },
  titleContainer: {
    minWidth: 80,
    alignItems: 'center',
    marginEnd: 18,
  },
  inactiveText: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  activeText: {
    color: BuildVersion.palette.PINK_COLOR,
  },
  divide: {
    backgroundColor: LIGHT_GRAY_COLOR,
    width: 0.5,
    height: 86,
    marginVertical: 18,
    marginEnd: 18,
  },
  ratingCriteriaGroup: {
    flex: 1,
    paddingVertical: 18,
  },
  criteria: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    flex: 1,
  },
  criteriaText: {
    color: TEXT_GRAY_COLOR,
    marginStart: 18,
    flexShrink: 1,
  },
  criteriaTextSelected: {
    color: BuildVersion.palette.PINK_COLOR,
    marginStart: 18,
    flexShrink: 1,
  },
  dhlCriteria: {
    flexDirection: 'row',
    marginVertical: 10,
    borderColor: '#D40511',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginHorizontal: 25,
    paddingHorizontal: 17,
  },
  dhlCriteriaIcon: {
    margin: 8,
    marginRight: 24,
  },
  dhlCriteriaText: {
    width: '100%',
    paddingVertical: 20,
    color: '#454545',
    fontSize: 16,
    paddingHorizontal: 10,
    flex: 1,
  },
  programImage: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default RatingCriteriaItem;
