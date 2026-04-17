import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import { TEXT_DARK_COLOR, TEXT_GRAY_COLOR } from '@resources/palette';
import {
  SVG_DHL_CHECK,
  SVG_ATHENA_CHECK,
  ICON_PEPSI_CHECKED,
} from '@resources/images';
import Icon from '../../icon/Icon';
import AvatarImageWithDefaultIcon from '../../image/AvatarImageWithDefaultIcon';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';

const icons = {
  selected: require('@assets/image/nestle/selected_user.png'),
};

const version = BuildVersion.setting.version;
const SearchMultipleUserItem = ({
  style,
  textStyle,
  title,
  subtitle,
  gender = 'Default',
  avatar = null,
  avatarColor = null,
  avatarSize = 48,
  fullName,
  brandName,
  departmentName,
  departmentLevel1,
  departmentLevel2,
  departmentLevel3,
  isSelected = undefined,
  ...props
}) => {
  const getTitle = () => {
    if (IS.PEPSI) {
      return fullName;
    }
    if (fullName && brandName) {
      return `${fullName} - ${brandName}`;
    } else if (fullName) {
      return fullName;
    } else if (brandName) {
      return brandName;
    } else {
      return '';
    }
  };

  const getSubTitle = () => {
    if (IS.PEPSI) {
      return title;
    }

    if (title && departmentName) {
      return `${title} - ${departmentName}`;
    } else if (title) {
      return title;
    } else if (departmentName) {
      return departmentName;
    } else {
      return '';
    }
  };

  const getDescription = () => {
    return departmentLevel2
      ? `${departmentLevel1} - ${departmentLevel2} - ${brandName}`
      : `${departmentLevel1} - ${brandName}`;
  };

  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <View style={styles.employee}>
        <View style={styles.avatarSection}>
          <AvatarImageWithDefaultIcon
            avatar={avatar}
            imageStyle={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
              },
            ]}
            iconSize={avatarSize - 10}
            wrapIconStyle={{
              width: avatarSize,
              height: avatarSize,
            }}
          />
        </View>
        <View style={styles.info}>
          <Title
            style={{
              ...styles.title,
              ...textStyle,
            }}
            size="large">
            {getTitle()}
          </Title>
          <TextContent
            style={{
              ...styles.subtitle,
              ...textStyle,
            }}>
            {getSubTitle()}
          </TextContent>
        </View>
        <View style={styles.checkIcon}>
          {isSelected && (
            IS.NESTLE ?
              <Image source={icons.selected} style={{ width: 20, height: 20 }} />
              :
              <Icon
                source={
                  version === 'athena'
                    ? SVG_ATHENA_CHECK
                    : version === 'pepsi'
                      ? ICON_PEPSI_CHECKED
                      : SVG_DHL_CHECK
                }
                size={20}
                color={
                  version === 'athena'
                    ? '#07ac28'
                    : version === 'pepsi'
                      ? 'white'
                      : '#FFCC00'
                }
                stroke={true}
              />
          )}
          {!isSelected && <View style={styles.uncheck} />}
        </View>
      </View>
      {IS.PEPSI && (
        <TextContent
          style={{
            ...styles.description,
            ...textStyle,
          }}>
          {getDescription()}
        </TextContent>
      )}
    </View>
  );
};

export default SearchMultipleUserItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    minHeight: 50,
    justifyContent: 'space-between',
  },
  employee: {
    flexDirection: 'row',
  },
  avatarSection: {
    marginRight: 10,
  },
  avatar: {},
  info: {
    marginVertical: 3,
    flexShrink: 1,
    flex: 8,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  subtitle: {
    color: TEXT_DARK_COLOR,
  },
  description: {
    color: TEXT_GRAY_COLOR,
    marginTop: 9,
  },
  uncheck: {
    borderColor: TEXT_GRAY_COLOR,
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: 'flex-end',
    borderWidth: 1,
    // flex: 1,
  },
  checkIcon: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
