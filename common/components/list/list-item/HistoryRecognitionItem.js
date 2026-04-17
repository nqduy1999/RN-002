import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import TextContent from '../../text/TextContent';
import Title from '../../text/Title';
import {
  TEXT_DARK_COLOR,
  TEXT_GRAY_COLOR,
  LIGHT_GRAY_COLOR_2,
  SHADOW_COLOR,
  LIGHT_COLOR,
} from '@resources/palette';
import Icon from '../../icon/Icon';
import { SVG_ARROW_LEFT_2 } from '@resources/images';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import {
  LABEL_STATUS_APPROVED,
  LABEL_STATUS_PENDING,
  LABEL_STATUS_REJECTED,
  LABEL_ME,
  TAB_RECOGNITION_P2P,
} from '@resources/string/strings';
import ShadowView from 'react-native-simple-shadow-view';
import AvatarImageWithDefaultIcon from '../../image/AvatarImageWithDefaultIcon';
import { renderText } from '@common/components/StringHelper';

const setting = BuildVersion.setting || {};

export const RecognitionProgramStatus = ({ status }) => {
  const statusIcon =
    status === 'Approved' ? 'Yes' : status === 'Pending' ? 'Timer-2' : 'Close';
  const statusText =
    status === 'Approved'
      ? LABEL_STATUS_APPROVED
      : status === 'Pending'
        ? LABEL_STATUS_PENDING
        : LABEL_STATUS_REJECTED;

  return (
    <View
      style={[
        styles.recognitionStatus,
        setting.version === 'athena' && styles.recognitionStatusAthena,
      ]}>
      <Icon
        style={styles.statusIcon}
        name={statusIcon}
        size={16}
        stroke={false}
        buttonColor="red"
        color={TEXT_DARK_COLOR}
      />
      <TextContent style={styles.statusText}>{statusText}</TextContent>
    </View>
  );
};

const HistoryRecognitionItem = ({
  style,
  textStyle,
  title = null,
  subtitle = null,
  gender = 'Default',
  avatar = null,
  avatarColor = BuildVersion.palette.PINK_COLOR,
  avatarSize = 48,
  isSelected = undefined,
  historyPoint,
  historyPointLabel,
  recognitionProgram,
  status,
  ...props
}) => {
  const arrowIconColor = {
    generic: BuildVersion.palette.ACCENT_COLOR,
    aia: BuildVersion.palette.ACCENT_COLOR,
    dhl: BuildVersion.palette.GREEN_COLOR,
    athena: TEXT_GRAY_COLOR,
    pepsi: BuildVersion.palette.ACCENT_COLOR,
    nestle: BuildVersion.palette.ACCENT_COLOR,
  };

  const isSelfRecognition = props.fromEmployeeId === props.toEmployeeId;

  const commonRender = () => {
    return (
      recognitionProgram && (
        <View style={styles.programName}>
          <Title style={styles.recognitionProgram}>{recognitionProgram}</Title>
          <RecognitionProgramStatus status={status} />
        </View>
      )
    );
  };
  const commonRenderAthena = () =>
    recognitionProgram ? (
      <View style={styles.programNameAthena}>
        <Title style={styles.recognitionProgram}>{recognitionProgram}</Title>
        <RecognitionProgramStatus status={status} />
      </View>
    ) : (
      <View style={styles.programNameAthena}>
        <Title style={styles.recognitionProgram}>
          {renderText(TAB_RECOGNITION_P2P)}
        </Title>
      </View>
    );

  const renderRecognitionProgram = {
    generic: commonRender,
    aia: commonRender,
    dhl: commonRender,
    athena: commonRenderAthena,
    pepsi: commonRender,
    nestle: commonRender,
  };

  const BodyComponent = () => (
    <>
      <View style={styles.avatar}>
        <AvatarImageWithDefaultIcon
          avatar={avatar}
          imageStyle={[
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
        {renderRecognitionProgram[setting.version]()}
        <Title
          style={{
            ...styles.title,
            ...textStyle,
          }}
          size="large">
          {!isSelfRecognition ? title : LABEL_ME}
        </Title>
        <TextContent
          style={{
            ...styles.subtitle,
            ...textStyle,
          }}>
          {subtitle}
        </TextContent>
      </View>
      {/* <View style={styles.historyPoint}>
        <Title size="large" style={styles.historyPointLabel}>
          {historyPoint}
        </Title>
        <TextContent size="large" style={styles.historyPointLabel}>
          {historyPointLabel}
        </TextContent>
      </View> */}
      <Icon
        source={SVG_ARROW_LEFT_2}
        size={12}
        stroke={true}
        color={IS.NESTLE ? '#7B7B7B' : arrowIconColor[setting.version]}
        style={styles.icon}
      />
    </>
  );

  return (
    <>
      {Platform.OS === 'android' ? (
        <ShadowView
          style={{
            ...styles.containerShadowView,
            ...style,
          }}>
          <View
            {...props}
            style={{
              ...styles.containerView,
            }}>
            <BodyComponent />
          </View>
        </ShadowView>
      ) : (
        <View
          {...props}
          style={{
            ...styles.container,
            ...style,
          }}>
          <BodyComponent />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 18,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderWidth: 0.75,
    backgroundColor: LIGHT_COLOR,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  containerShadowView: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 18,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: LIGHT_GRAY_COLOR_2,
    backgroundColor: LIGHT_COLOR,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 12,
    // flex: 1,
  },
  info: {
    marginVertical: 3,
    flex: 1,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  subtitle: {
    color: TEXT_GRAY_COLOR,
  },
  historyPoint: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  historyPointLabel: {
    marginHorizontal: 2,
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  icon: {
    marginHorizontal: 3,
    marginEnd: 12,
  },
  programName: {
    flexDirection: 'row',
    flex: 1,
  },
  programNameAthena: {
    marginBottom: 5,
  },
  recognitionProgram: {
    color: BuildVersion.palette.ACCENT_COLOR,
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 6,
  },
  recognitionStatus: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFCC00',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
  },
  recognitionStatusAthena: {
    backgroundColor: '#FFE4CD',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    color: TEXT_DARK_COLOR,
    fontSize: 10,
    lineHeight: 13,
  },
});

export default HistoryRecognitionItem;
