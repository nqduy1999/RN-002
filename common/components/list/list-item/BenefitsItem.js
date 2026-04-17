import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import Icon from '../../icon/Icon';
import {
  LIGHT_GRAY_COLOR_2,
  TEXT_GRAY_COLOR,
  LIGHT_LIGHT_GREEN_COLOR,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import BenefitStatus from '@resources/enum-types/benefitStatus';
import { renderText } from '../../StringHelper';
import { LABEL_DUE_DATE, LABEL_EFFECTIVE_DATE } from '../../../../resources/string/strings';
import moment from 'moment';
import Button from '../../button/Button';
import TextCurrency from '../../text/TextCurrency';
import SvgIcon from '../../icon/SvgIcon';
import { SVG_ICON_TRADE } from '../../../../resources/images';
import OutlineButton from '../../button/OutlineButton';
import BuildVersion from '@resources/build_version/BuildVersion';

const BenefitsItem = ({
  id,
  style,
  index,
  length,
  icon,
  title = undefined,
  subtitle = undefined,
  money = 0,
  dueDate = undefined,
  status = 'Inactive',
  onPress,
  ...props
}) => {
  if (!status) status = 'Inactive';

  const dueDateLabel = renderText(LABEL_EFFECTIVE_DATE).replace(
    '{0}',
    dueDate ? moment(dueDate).format('DD/MM/YYYY') : '--/--/--',
  );

  return (
    <View
      {...props}
      style={[
        styles.container,
        style,
        index !== length - 1
          ? { borderBottomWidth: 1, borderBottomColor: LIGHT_GRAY_COLOR_2 }
          : null,
      ]}>
      <View style={styles.itemSection}>
        {title && ( title.toLowerCase().includes('annual') || title.toLowerCase().includes('ngày phép'))
          ? <SvgIcon width={40} height={40} svgIcon={SVG_ICON_TRADE} />
          : <Icon size={40} {...icon} noColor={true} />
        }
        <View style={styles.infoSection}>
          <Title size="medium" style={styles.title}>
            {title}
          </Title>
          {subtitle && (
            <TextContent size="little-smaller" style={styles.subtitle}>
              {subtitle}
            </TextContent>
          )}
        </View>
        {money >= 1000 &&
          <TextCurrency
            value={money}
            valueSize="medium-subtitle"
            valueStyle={styles.money}
            flexAStyle={{ width: 40, height: 36 }}
          />
        }
      </View>
      <View style={styles.dateSection}>
        <TextContent style={styles.dueDate} size="little-smaller">
          {dueDateLabel}
        </TextContent>
        {status === 'Trade'
          ? (
            <OutlineButton
              style={styles.statusButton}
              buttonStyle={{
                ...styles.statusButtonStyle,
                borderColor: BenefitStatus[status].borderColor,
              }}
              textStyle={{
                color: BenefitStatus[status].textColor,
              }}
              textSize="little-smaller"
              textWeight="normal"
              text={BenefitStatus[status].text}
              onPress={() => onPress && onPress(id)}
            />
          )
          : (<Button
            style={styles.statusButton}
            buttonStyle={{
              ...styles.statusButtonStyle,
              backgroundColor: BenefitStatus[status].backgroundColor,
            }}
            textStyle={{
              ...styles.statusButtonTextStyle,
              color: BenefitStatus[status].textColor,
            }}
            textSize="little-smaller"
            textWeight="normal"
            text={BenefitStatus[status].text}
            disabled={true}
          />)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
  },
  itemSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  icon: {},
  infoSection: {
    justifyContent: 'center',
    paddingStart: 12,
    flexGrow: 1,
    width: 10,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  subtitle: {
    color: TEXT_GRAY_COLOR,
    marginTop: 5,
  },
  money: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    flex: 1,
    color: TEXT_GRAY_COLOR,
  },
  statusButton: {
    flex: 1,
    marginStart: 8,
    width: 'auto',
  },
  statusButtonStyle: {
    alignSelf: 'flex-end',
    minHeight: 24,
    paddingVertical: 0,
    paddingHorizontal: 16,
    backgroundColor: LIGHT_LIGHT_GREEN_COLOR,
  },
  statusButtonTextStyle: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default BenefitsItem;
