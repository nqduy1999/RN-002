import React, { useCallback, useEffect, useState } from 'react';
import { Alert, PanResponder } from 'react-native';
import { useDispatch } from 'react-redux';

import { renderText } from '@common/components/StringHelper';
import authOperations from '@redux/auth/operations';

let timerId;
export const useTimeoutSession = () => {
  const dispatch = useDispatch();
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(
    60 * 15,
  );

  useEffect(() => {
    resetInactivityTimeout();
  }, [resetInactivityTimeout]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        console.log('TimeoutSession -> user starts touch');
        resetInactivityTimeout();
      },
    }),
  ).current;

  const resetInactivityTimeout = useCallback(() => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      // action after user has been detected idle
      console.log('TimeoutSession -> Idle detect');
      Alert.alert('Eve', renderText('LOGOUT_ALERT'), [
        {
          text: 'OK',
          onPress: () => dispatch(authOperations.logout()),
        },
      ]);
    }, timeForInactivityInSecond * 1000);
  }, [dispatch, timeForInactivityInSecond]);

  return panResponder.panHandlers;
};
