import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import colors from '../helpers/colors';
import CustomPrimaryButton from '../components/CustomPrimaryButton';
import { url } from '../vars';
import { AuthContext } from '../components/context';

const SignInScreen = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);
    const textInputChange = val => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handlePasswordChange = val => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };
    const handleValidUser = val => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };
    const loginHandle = (userName, password) => {
        if (!user) {
            if (data.username.length == 0 || data.password.length == 0) {
                Alert.alert(
                    'Wrong Input!',
                    'Username or password field cannot be empty.',
                    [{ text: 'Okay' }],
                );
                return;
            }
        }
        // Make a request for a user
        axios
            .post(`${url}/auth/signin`, {
                username: userName,
                password: password,
            })
            .then(function (response) {
                console.log(response.data);
                signIn(response.data);
            })
            .catch(function (error) {
                console.log(error?.response?.data);
                if (error?.response?.data.error == "Unauthorized") {
                    Alert.alert(
                        'Error',
                        'Username or paswsword is incorrect',
                        [{ text: 'Okay' }],
                    );
                }

                // if (user) {
                //     signIn();
                // }
            });
        return false;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome !</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[
                    styles.footer,
                    {
                        backgroundColor: '#FFF',
                    },
                ]}>
                <Text
                    style={[
                        {
                            color: '#000',
                        },
                    ]}>
                    Username
                </Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: '#000',
                            },
                        ]}
                        autoCapitalize="none"
                        value={data.username}
                        onChangeText={val => textInputChange(val)}
                        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                    />
                </View>
                {data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text >Username must be 4 characters long.</Text>
                    </Animatable.View>
                )}

                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: '#000',
                            marginTop: 35,
                        },
                    ]}>
                    Password
                </Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[
                            {
                                color: '#000',
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={val => handlePasswordChange(val)}
                        value={data.password}
                    />
                </View>
                {data.isValidPassword ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text >Password must be 8 characters long.</Text>
                    </Animatable.View>
                )}


                <View style={styles.button}>
                    <View style={{ width: '100%' }}>
                        <CustomPrimaryButton
                            label="Sign in"
                            onPress={() => {
                                loginHandle(data.username, data.password);
                            }}
                        />
                    </View>
                </View>
            </Animatable.View>
        </View>
    );

}
export default SignInScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        width:'100%',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    button: {
      alignItems: 'center',
      marginTop: 50,
    },
});
