/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {
  TEXT_DARK_COLOR,
  LIGHT_GRAY_COLOR_2,
  TEXT_GRAY_COLOR,
} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';
import {SvgCssUri} from 'react-native-svg';
import {LABEL_EFFECTIVE_DATE} from '@resources/string/strings';
import {renderText} from '@common/components/StringHelper';
import moment from 'moment';
import BenefitStatus from '@resources/enum-types/benefitStatus';
import Button from '../../button/Button';
import OutlineButton from '../../button/OutlineButton';
import {SVG_ARROW_UP, SVG_ARROW_DOWN} from '@resources/images';
import Icon from '@common/components/icon/Icon';
import {numberWithComma} from '@common/function/function';

const FlexibleBenefitItem = ({
  name,
  amount,
  total,
  index,
  iconUrl,
  date,
  status,
}) => {
  return (
    <View
      style={[
        styles.allowance,
        total > 1 && index !== total - 1 ? styles.allowanceBottomBorder : null,
      ]}>
      <View style={styles.allowanceHeader}>
        <View style={styles.allowanceNameSection}>
          <SvgCssUri width="40" height="40" uri={iconUrl} />
          <Text style={styles.allowanceName}>{name}</Text>
        </View>
        <Text style={styles.amountBenefit}>{numberWithComma(amount)} đ</Text>
      </View>
      <View style={styles.allowanceBody}>
        <Text style={styles.allowanceDueDate}>
          {renderText(LABEL_EFFECTIVE_DATE).replace(
            '{0}',
            date ? moment(date).format('DD/MM/YYYY') : '--/--/--',
          )}
        </Text>
        {status === 'Trade' ? (
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
            // onPress={() => {}} TODO: handle onPress
          />
        ) : (
          <Button
            style={styles.statusButton}
            buttonStyle={{
              ...styles.statusButtonStyle,
              backgroundColor:
                status === 'Registered' ? 'rgba(255, 204, 0, 0.25)' : '#E0E0E0',
            }}
            textStyle={{
              ...styles.statusButtonTextStyle,
              color: BenefitStatus[status].textColor,
              // fontSize: status === 'Registered' ? 13 : 10,
            }}
            textSize="little-smaller"
            textWeight="normal"
            text={BenefitStatus[status].text}
            disabled={true}
          />
        )}
      </View>
    </View>
  );
};

const FlexibleBenefitCategoryItem = props => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <View
      style={[
        styles.container,
        props.index !== props.length - 1 ? styles.borderBottom : null,
      ]}>
      <TouchableOpacity
        style={styles.category}
        onPress={() => setIsExpand(!isExpand)}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryName}>{props.name}</Text>
          <Icon
            source={isExpand ? SVG_ARROW_UP : SVG_ARROW_DOWN}
            stroke={false}
            size={19}
            color={TEXT_GRAY_COLOR}
            style={styles.arrowLeft}
          />
        </View>
        <Text style={styles.amountCategory}>
          {numberWithComma(props.totalCost)} đ
        </Text>
      </TouchableOpacity>
      {isExpand && (
        <View style={styles.flexibleBenefits}>
          {props.allowances.map((a, index) => (
            <FlexibleBenefitItem
              key={a.id}
              {...a}
              total={props.allowances.length}
              index={index}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
  },
  borderBottom: {
    borderBottomColor: BuildVersion.styles.buttonBackground.backgroundColor,
    borderBottomWidth: 1,
  },
  category: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 52,
    alignItems: 'center',
  },
  categoryHeader: {
    flexDirection: 'row',
  },
  categoryName: {
    color: TEXT_DARK_COLOR,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  totalCost: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  flexibleBenefits: {
    paddingHorizontal: 16,
  },
  allowance: {
    minHeight: 95,
    paddingVertical: 14,
  },
  allowanceBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_COLOR_2,
  },
  allowanceHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
  },
  allowanceBody: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  allowanceNameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  allowanceName: {
    lineHeight: 21.6,
    fontSize: 14.4,
    marginLeft: 8,
    flexShrink: 1,
    maxWidth: '75%',
    fontWeight: 'bold',
  },
  allowanceIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderWidth: 1,
  },
  allowanceDueDate: {
    color: TEXT_GRAY_COLOR,
    fontSize: 13,
    lineHeight: 18,
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
    minWidth: 106,
    paddingHorizontal: 3,
  },
  statusButtonTextStyle: {
    color: BuildVersion.palette.ACCENT_COLOR,
    textAlign: 'center',
  },
  amountCategory: {
    fontSize: 15,
    lineHeight: 20,
    color: TEXT_DARK_COLOR,
    fontWeight: 'bold',
  },
  amountBenefit: {
    fontSize: 15,
    lineHeight: 20,
    color: TEXT_GRAY_COLOR,
    fontWeight: 'bold',
  },
});

export default FlexibleBenefitCategoryItem;
