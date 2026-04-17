import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  View,
} from 'react-native';
import {TEXT_GRAY_COLOR, TRACK_MAX_COLOR} from '@resources/palette';
const {width} = Dimensions.get('window');

import BuildVersion from '@resources/build_version/BuildVersion';
const version = BuildVersion.setting.version;

const ItemDefault = ({id, name, onPress, imageUrl, query}) => {
  const handlePress = () => {
    if (id === query) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      key={id}
      style={[
        styles.container,
        query === id && styles.selected,
        query !== 0 && query !== id && styles.unselected,
      ]}
      onPress={handlePress}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={[styles.name, query === id && styles.activeName]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const ItemAthena = ({
  id,
  name,
  onPress,
  imageUrl,
  query,
  recognitionLevels,
}) => {
  const point = recognitionLevels.length ? recognitionLevels[0].point : '';
  const handlePress = () => {
    if (id === query) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      key={id}
      style={[
        styles.container,
        styles.athenaContainer,
        query !== null &&
          (query === id ? styles.athenaSelected : styles.athenaUnSelected),
      ]}
      onPress={handlePress}>
      <View style={styles.itemInfo}>
        <View style={styles.itemInfoLeft}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <Text
            style={[
              styles.textNameAthena,
              query === id && styles.athenaActiveName,
            ]}
            numberOfLines={2}>
            {name}
          </Text>
        </View>
        <Text style={styles.itemCoin}>{point} Kudos</Text>
      </View>
    </TouchableOpacity>
  );
};

const Item = {
  generic: ItemDefault,
  aia: ItemDefault,
  dhl: ItemDefault,
  athena: ItemAthena,
  pepsi: ItemDefault,
  nestle: ItemDefault,
};

export default Item[version];

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.75,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 49.5,
    marginBottom: 14,
    flex: 0.5,
    width: (width - 48) / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  athenaContainer: {
    width: width - 40,
  },
  selected: {
    backgroundColor: '#FFCC00',
    borderColor: '#fff',
  },
  athenaSelected: {
    backgroundColor: '#FFE4CD',
    borderColor: '#FFE4CD',
  },
  athenaUnSelected: {
    backgroundColor: '#F3F3F3',
    borderColor: '#CCCCCC',
  },
  unselected: {
    backgroundColor: TRACK_MAX_COLOR,
  },
  image: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  name: {
    fontSize: 12,
    lineHeight: 16,
    color: TEXT_GRAY_COLOR,
    width: (width - 48) / 2 - 53,
  },
  textNameAthena: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
    color: '#7B7B7B',
  },
  activeName: {
    color: '#D40511',
    fontWeight: 'bold',
  },
  athenaActiveName: {
    color: '#000000',
    fontWeight: 'bold',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  itemInfoLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  itemCoin: {
    color: '#FF8300',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
