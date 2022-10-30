import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  View,
} from 'react-native';
import colors from '../helpers/colors';
const CustomPrimaryButton = props => {
  return (
    <>
      {props.isLoading && props.isLoading === true ? (
        <ActivityIndicator size="large" color={colors.primaryColor} />
      ) : (
        <TouchableOpacity {...props}>
          <ImageBackground
            source={require('../images/buttonBackground.png')}
            style={{width: '100%', height: 45}}>
            <Text style={styles.Button}>
              {props.label ? props.label : 'save'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </>
  );
};
export default CustomPrimaryButton;
const styles = StyleSheet.create({
  Button: {
    width: '100%',
    padding: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
