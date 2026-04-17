import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TEXT_DARK_COLOR} from '@resources/palette';
import {LABEL_POINTS} from '@resources/string/strings';
import {renderText} from '../../StringHelper';
import Icon from '@common/components/icon/Icon';
import {SVG_DHL_RED_CHECKED} from '@resources/images';
import BuildVersion from '@resources/build_version/BuildVersion';

const LevelPointsItem = ({name, point, query, id, onPress}) => {
  return (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
      <Text style={[query === id ? styles.selectedItemText : styles.itemText]}>
        {name} - {point} {renderText(LABEL_POINTS)}
      </Text>
      {query === id && <Icon source={SVG_DHL_RED_CHECKED} size={15} />}
    </TouchableOpacity>
  );
};

export default LevelPointsItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: TEXT_DARK_COLOR,
    fontSize: 15,
    lineHeight: 20,
  },
  selectedItemText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    color: BuildVersion.palette.ACCENT_COLOR,
  },
});
