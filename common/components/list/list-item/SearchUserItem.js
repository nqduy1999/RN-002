import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import {
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
  LIGHT_GRAY_COLOR_2,
  SHADOW_COLOR,
  TEXT_GRAY_COLOR,
} from '@resources/palette';
import AvatarImage from '../../image/AvatarImage';
import {SVG_ICON_CHECK_ACTIVE} from '@resources/images';
import Icon from '../../icon/Icon';
import {GRAY_COLOR} from '../../../../resources/palette';
import GenderTypes from '@resources/enum-types/gender';
import ShadowView from 'react-native-simple-shadow-view';
import {IS} from '@resources/build_version/BuildVersion';

class SearchUserItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isSelected !== nextProps.isSelected) {
      return true;
    }
    return false;
  }
  render() {
    const {
      style,
      textStyle,
      title,
      subtitle,
      description,
      gender = 'Default',
      avatar = null,
      avatarColor = null,
      avatarSize = 48,
      isSelected = undefined,
      searchUser = false,
      ...props
    } = this.props;

    const BodyComponent = () => (
      <>
        {isSelected !== true && !!avatar && (
          <AvatarImage
            source={avatar}
            style={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
              },
            ]}
          />
        )}
        {isSelected !== true && !avatar && gender !== 'Default' && (
          <Icon
            {...GenderTypes[gender].defaultAvatar}
            size={avatarSize}
            color={avatarColor || GRAY_COLOR}
            style={styles.avatar}
          />
        )}
        {isSelected !== true && !avatar && gender === 'Default' && (
          <View
            style={[
              styles.avatar,
              styles.defaultAvatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
                borderColor: avatarColor || GRAY_COLOR,
              },
            ]}>
            <Icon
              {...GenderTypes.Default.defaultAvatar}
              size={avatarSize - 18}
              color={avatarColor || GRAY_COLOR}
              stroke={true}
            />
          </View>
        )}
        {isSelected === true && (
          <View style={styles.avatar}>
            <Icon source={SVG_ICON_CHECK_ACTIVE} size={avatarSize} />
          </View>
        )}
        <View style={styles.info}>
          <Title
            style={{
              ...styles.title,
              ...textStyle,
            }}
            size="large">
            {title || ''}
          </Title>
          <TextContent
            numberOfLines={!searchUser ? 1 : 2}
            style={{
              ...styles.subtitle,
              ...textStyle,
            }}>
            {subtitle || ''}
          </TextContent>
        </View>
      </>
    );

    const renderDescription = () => (
      <TextContent
        style={{
          ...styles.description,
          ...textStyle,
        }}>
        {description || ''}
      </TextContent>
    );
    
    return (
      <View>
        {Platform.OS === 'android' && !searchUser ? (
          <ShadowView
            style={{
              ...styles.containerShadowView,
              ...styles.container,
            }}>
            <View {...props} style={styles.containerView}>
              <BodyComponent />
            </View>
            {IS.PEPSI && renderDescription()}
          </ShadowView>
        ) : (
          <>
            <View
              {...props}
              style={{
                ...styles.container,
                ...style,
              }}>
              <BodyComponent />
            </View>
            {IS.PEPSI && renderDescription()}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 12,
    minHeight: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerShadowView: {
    flexDirection: 'row',
    minHeight: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 16,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  containerView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 4,
    marginRight: 12,
  },
  defaultAvatar: {
    borderWidth: 1.5,
    borderColor: LIGHT_COLOR,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  info: {
    marginVertical: 3,
    flexShrink: 1,
    width: '100%',
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
});

export default SearchUserItem;
