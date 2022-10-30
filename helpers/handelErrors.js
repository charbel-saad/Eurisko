// import React from 'react';
import Toast from 'react-native-toast-message';
// import { AuthContext } from '../components/context';

const handelErrors = error => {
  // const { signOut } = React.useContext(AuthContext);
  if (error.response) {
    if (error.response.status === 400) {
      const keys = Object.keys(error.response.data);
      let errorText = '';
      keys.forEach((key, index) => {
        errorText += `${error.response.data[key]},`;
      });
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorText,
        text2NumberOfLines: 5,
      });
    } else if (error.response.status === 413) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Too Large',
      });
    } else if (error.response.status === 422) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please Fill All the Fields',
      });
    } else if (error.response.status === 401) {
      Toast.show({
        type: 'error',
        text1: 'Unauthenticated',
        text2: 'Please Login Again',
      });
      // signOut();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error ' + error.response.status,
        text2: 'Unexpected Error 🙁',
      });
    }
    // Request made and server responded
    console.log(error.response.data);
    console.log(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: "No Response From Our Server (We'll Fix It Soon) 🙁",
    });
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Could Not Esablish Request',
    });
    console.log('Error', error.message);
  }
};
export default handelErrors;
