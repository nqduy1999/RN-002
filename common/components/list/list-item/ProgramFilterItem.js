import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import TextContent from '@common/components/text/TextContent';
import { TEXT_DARK_COLOR } from '@resources/palette';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';

const { width: screenWidth } = Dimensions.get('window');

const RecognitionProgramFilterItem = ({
  name,
  onPress,
  query,
  id,
  isSelected,
}) => {
  const isActive = query === id || isSelected;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        IS.PEPSI && styles.containerPepsi,
        IS.NESTLE && styles.containerNestle,
        isActive && styles.selected,
        IS.PEPSI && isActive && styles.selectedPepsi,
      ]}
      onPress={onPress}>
      <TextContent
        {...IS.PEPSI && { numberOfLines: 2 }}
        style={[
          styles.name,
          IS.PEPSI && isActive && styles.namePepsi,
        ]}
      >
        {name}
      </TextContent>
    </TouchableOpacity>
  );
};

export default RecognitionProgramFilterItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 3,
    flexDirection: 'row',
    width: (screenWidth - (IS.NESTLE ? 60 : 70)) / 3,
    marginBottom: IS.NESTLE ? undefined : 25,
    marginRight: IS.NESTLE ? undefined : 16,
    minHeight: IS.PEPSI ? 52 : undefined,
  },
  name: {
    fontSize: 13,
    lineHeight: 20,
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: IS.NESTLE ? '#FFBDB7' : '#FFCC00',
  },
  containerPepsi: {
    borderRadius: 4,
  },
  containerNestle: {
    flex: 1,
    height: 32,
    margin: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#EFEFEF',
  },
  namePepsi: {
    color: BuildVersion.palette.ACCENT_COLOR,
    fontWeight: 'bold',
  },
  selectedPepsi: {
    backgroundColor: 'rgba(196, 243, 243, 0.5)',
  },
});
