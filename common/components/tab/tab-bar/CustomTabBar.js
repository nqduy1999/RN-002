import CustomTabBarItem from './CustomTabBarItem';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {BoxShadow} from 'react-native-shadow';
import {SHADOW_COLOR} from '@resources/palette';
import {IS} from '@resources/build_version/BuildVersion';

const shadowOpt = {
  height: 65,
  width: Dimensions.get('window').width,
  color: SHADOW_COLOR,
  border: 2,
  radius: 0,
  opacity: 0.25,
  x: 0,
  y: 0,
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

class CustomTabBar extends React.Component {
  render() {
    // a tab bar component has a routes object in the navigation state
    const {navigation, appState, user} = this.props;
    const routes = navigation.state.routes;
    return (
      <BoxShadow setting={shadowOpt}>
        <View style={styles.container}>
          {routes.map((route, index) => {
            // This could be improved, but it's just to show a possible solution
            if (
              route.routeName === 'FlexibleBenefits' &&
              !user.isFlexibleBenefitEnabled
            ) {
              return <View key={index} />;
            } else if (
              route.routeName === 'Recognition' &&
              !user.isRecognitionEnabled
            ) {
              return <View key={index} />;
            } else if (
              route.routeName === 'News' &&
              (!user.isNewsEnabled || user.isFlexibleBenefitEnabled || IS.PEPSI)
            ) {
              return <View key={index} />;
            }

            return (
              <CustomTabBarItem
                key={route.key}
                name={route.routeName}
                focused={navigation.state.index === index}
                appState={appState}
                routeName={route.routeName}
                navigation={navigation}
                user={user}
              />
            );
          })}
        </View>
      </BoxShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    appState: state.app.appState,
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomTabBar);
