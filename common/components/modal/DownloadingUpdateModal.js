import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
import ProgressBar from 'react-native-progress/Bar';

import { LIGHT_COLOR } from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

import Title from '../text/Title';

const accentColor = BuildVersion.palette.ACCENT_COLOR;
const windowWidth = Dimensions.get('window').width;
const isTablet = DeviceInfo.isTablet();
const containerWidth = (windowWidth - (isTablet ? 0 : 64)) / (isTablet ? 2 : 1);
const progressBarWidth = containerWidth - (isTablet ? 64 : 48);

const DownloadingUpdateModal = ({ receivedBytes = 0, totalBytes = 0 }) => {
    const downloadedRatio = totalBytes ? parseFloat((receivedBytes / totalBytes).toFixed(3)) : 0;
    const modalProps = { animationIn: 'fadeIn', animationOut: 'fadeOut', style: { margin: 0 } };
    return (
        <Modal {...modalProps} isVisible>

            <View style={styles.wrapper}>

                <View style={styles.container}>

                    <Title style={styles.titleTxt}>Downloading...</Title>

                    <View style={styles.processBar}>
                        <ProgressBar
                            progress={downloadedRatio}
                            height={isTablet ? 12 : 10}
                            borderRadius={isTablet ? 8 : 6}
                            width={progressBarWidth}
                            color={accentColor}
                            styleAttr={'Large'}
                        />
                    </View>

                </View>

            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: isTablet ? 0 : 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: containerWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_COLOR,
        borderRadius: isTablet ? 8 : 6,
        paddingVertical: isTablet ? 32 : 24,
        padding: isTablet ? 48 : 32,
    },
    titleTxt: {
        color: accentColor,
    },
    processBar: {
        marginTop: isTablet ? 32 : 24,
    },
});

export default DownloadingUpdateModal;