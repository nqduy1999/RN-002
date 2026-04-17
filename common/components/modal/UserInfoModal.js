import styled from 'styled-components';
import { LIGHT_COLOR } from '@resources/palette';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Avatar } from '@areas/app/socialWall/commons';
import { getDefaultAvatar } from '@areas/app/socialWall/constants';
import Icon from '@common/components/icon/Icon';
import I18n from 'react-native-i18n';

import { SVG_ICON_CLOSE_WHITE, USER_INFO_COVER } from '../../../resources/images';

const InfoModal = ({
  style,
  isVisible,
  onBackButtonPress,
  onBackdropPress,
  user,
  handleContinue,
}) => {
  return (
    <View>
      <Modal
        style={{ margin: 0 }}
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container, style]}>
          <ProfileWrapper source={USER_INFO_COVER} style={{ paddingBottom: 20 }}>
            <TouchableOpacity
              style={[styles.closeTextContainer]}
              onPress={handleContinue}>
              <Icon
                size={10}
                source={SVG_ICON_CLOSE_WHITE}
                style={{
                  width: 10,
                  height: 10,
                }}
              />
            </TouchableOpacity>
            <Avatar
              source={{
                uri: user.avatar || getDefaultAvatar(user.fullName),
              }}
              width={80}
              height={80}
              resizeMode="cover"
              style={styles.avatar}
            />
            <Name>{user.fullName}</Name>

            <Profession styles={styles.profession}>
              {user.title}
            </Profession>

            {user.departmentName &&
              <Profession styles={styles.department}>
                {user.departmentName}
              </Profession>
            }

          </ProfileWrapper>
          {/* <WorkWrapper>
            <View>
              <Text style={[styles.description]}>{I18n.t('yearOfJoining')}</Text>
              <Text style={[styles.descriptionHighlight]}>3 years</Text>
            </View>
            <View>
              <Text style={[styles.description]}>{I18n.t('department')}</Text>
              <Text style={[styles.descriptionHighlight]}>
                {user.departmentName}
              </Text>
            </View>
            <View>
              <Text style={[styles.description]}>{I18n.t('location')}</Text>
              <Text style={[styles.descriptionHighlight]}>Ho Chi Minh</Text>
            </View>
          </WorkWrapper> */}
          {/*<TouchableOpacity style={styles.buttonChat}>*/}
          {/*  <Text style={styles.buttonText}>Chat</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_COLOR,
    borderRadius: 14,
    overflow: 'hidden',
    // paddingBottom: 20,
  },
  description: {
    color: '#333',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  descriptionHighlight: {
    color: '#073B3A',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonChat: {
    backgroundColor: '#D7FFEC',
    alignSelf: 'stretch',
    marginHorizontal: 16,
    height: 40,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AEA0',
    backgroundColor: 'transparent',
  },
  closeTextContainer: {
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 18,
    marginRight: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  avatar: {
    marginTop: -10,
  },
  department: {
    marginTop: 16,
    marginBottom: 20,
  },
});

const ProfileWrapper = styled.ImageBackground`
  position: relative;
  width: 100%;
  align-items: center;
`;

const WorkWrapper = styled(View)`
  flex-direction: row;
  background-color: #fff;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Name = styled(Text)`
  font-weight: 500;
  font-size: 20px;
  line-height: 30;
  color: #fff;
  margin-top: 5px;
`;

const Profession = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24;
  color: #fff;
`;

export default InfoModal;