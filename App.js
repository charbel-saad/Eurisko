
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './Pages/SignInScreen';
import { AuthContext } from './components/context';
import HomeScreen from './Pages/HomeScreen';
import {
  NavigationContainer
} from '@react-navigation/native';

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    user: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );


  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser.accessToken);
        console.log(userToken);
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) { }
        dispatch({
          type: 'LOGIN',
          token: userToken,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) { }
        dispatch({ type: 'LOGOUT' });
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken && userToken != 'undefined') {
          dispatch({
            type: 'RETRIEVE_TOKEN',
            token: userToken,
            user: response.data,
            email: response.data.email,
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (e) {
        dispatch({ type: 'LOGOUT' });
      }
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Testing!</Text> */}
      <AuthContext.Provider value={{ ...loginState, ...authContext }}>
        <NavigationContainer >
          {
            loginState.userToken !== null
              ?
              <HomeScreen />
              :
              <SignInScreen />
          }
        </NavigationContainer>

      </AuthContext.Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
