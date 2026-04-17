import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import Icon from '@common/components/icon/Icon';
const windows = Dimensions.get('window');
import { TEXT_LIGHT_COLOR } from '@resources/palette';
import Title from '@common/components/text/Title';
import {
  NOTIFICATION_TAB_RECOGNITIONS,
  NOTIFICATION_TAB_NEWS,
  NOTIFICATION_TAB_QUARTERLY,
  NOTIFICATION_TAB_SURVEYS,
  NOTIFICATION_TAB_BENEFITS,
} from '../../../../resources/string/strings';

const NotificationCategoryItem = props => {
  const isActive = props.query === props.name;

  const commonTitle = {
    Recognition: IS.PEPSI ? 'Kudos' : NOTIFICATION_TAB_RECOGNITIONS,
    Awards: 'nestle.awards',
    NewsDocument: NOTIFICATION_TAB_NEWS,
    QuarterlyRecognition: NOTIFICATION_TAB_QUARTERLY,
    AppSurvey: NOTIFICATION_TAB_SURVEYS,
    FlexibleBenefit: NOTIFICATION_TAB_BENEFITS,
    SPVB: 'SPVB',
  };

  const common = (
    <View style={styles.container}>
      <View style={[styles.itemBase, isActive && styles.itemActive]}>
        <Title
          size="medium-subtitle"
          weight="normal"
          style={isActive && styles.itemActiveText}>
          {commonTitle[props.name]}
        </Title>
      </View>
    </View>
  );

  const athenaTitle = {
    Recognition: 'Kudos',
    NewsDocument: NOTIFICATION_TAB_NEWS,
    AppSurvey: NOTIFICATION_TAB_SURVEYS,
    FlexibleBenefit: NOTIFICATION_TAB_BENEFITS,
  };

  const athena = (
    <View style={[styles.container]}>
      <View style={[styles.itemBase, isActive && styles.itemActiveAthena]}>
        <Title
          size="medium-subtitle"
          weight="normal"
          style={isActive && styles.textAthena}>
          {athenaTitle[props.name]}
        </Title>
      </View>
    </View>
  );

  const render = {
    generic: common,
    aia: common,
    dhl: common,
    athena: athena,
    pepsi: common,
    nestle: common,
  };

  return render[BuildVersion.setting.version];
};

const styles = StyleSheet.create({
  container: {
    width: windows.width / (!IS.PEPSI ? 3 : 4),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  itemBase: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemActive: {
    borderBottomWidth: 2,
    borderColor: BuildVersion.palette.ACCENT_COLOR,
  },
  itemActiveText: {
    color: BuildVersion.palette.ACCENT_COLOR,
    fontWeight: 'bold',
  },
  itemActiveAthena: {
    borderBottomWidth: 2,
    borderColor: '#07AC27',
  },
  itemActiveTextAthena: {
    borderBottomWidth: 2,
    borderColor: '#07AC27',
  },
  textAthena: {
    color: '#07AC27',
    fontWeight: 'bold',
  },
});

export default NotificationCategoryItem;
