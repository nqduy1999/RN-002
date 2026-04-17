import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import TextContent from '../text/TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';
import {LABEL_SELECT_LEVEL_POINTS} from '@resources/string/strings';
import LevelPointsItem from '../list/list-item/LevelPointsItem';

const SelectLevelPointsModal = ({
  isVisible,
  toggleModal,
  program,
  query,
  selectLevel,
}) => {
  // console.log(program.recognitionLevels);
  const renderLevelPoints = () => {
    return program.recognitionLevels.map(l => (
      <LevelPointsItem
        {...l}
        query={query}
        onPress={() => {
          toggleModal();
          selectLevel(l);
        }}
        key={l.id}
      />
    ));
  };

  return (
    <Modal
      isVisible={isVisible}
      transparent={true}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}>
      <View style={styles.centeredView}>
        <View style={styles.body}>
          <TextContent style={styles.title}>
            {LABEL_SELECT_LEVEL_POINTS}
          </TextContent>
          {renderLevelPoints()}
        </View>
      </View>
    </Modal>
  );
};

export default SelectLevelPointsModal;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  body: {
    width: 292,
    borderRadius: 4,
    paddingHorizontal: 37,
    paddingVertical: 21,
    backgroundColor: '#fff',
  },
  title: {
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
