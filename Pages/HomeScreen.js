import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import colors from '../helpers/colors';
import { url } from '../vars';
import { AuthContext } from '../components/context';
import handelErrors from '../helpers/handelErrors';
import Article from '../components/Article';

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { userToken,signOut } = React.useContext(AuthContext);
    const [reload, setReload] = useState(true);
    const [search, setSearch] = useState("");

    const getPosts = () => {
        setIsLoading(true);
        axios
            .get(`${url}/articles`, {
                headers: {
                    Authorization: 'Bearer ' + userToken, //the token is a variable which holds the token
                },
                params: {
                    page: currentPage,
                },
            })
            .then(function (response) {
                let data = response.data.response.docs;
                if (data.length > 0) {
                    if (refreshing) {
                        setArticles(data);
                        setFilteredArticles(data);
                    } else {
                        let temp = articles;
                        const adddedArticles = temp.concat(data);
                        setArticles(adddedArticles);
                        setFilteredArticles(adddedArticles);
                    }
                    setRefreshing(false);
                } else {
                    setRefreshing(false);
                }
                setIsLoading(false);
            })
            .catch(function (error) {
                setIsLoading(false);
                setRefreshing(false);
                handelErrors(error);
            });
    };
    useEffect(() => {
        if (currentPage === 0) {
            setArticles([]);
        }
        getPosts();
    }, [currentPage, reload]);

    const Item = ({ abstract }) => (
        <View>
            <Text >{abstract}</Text>
        </View>
    );
    const renderItem = ({ item, index }) => {
        const PostData = item;
        return (
            // <Item abstract={item.abstract} />
            <Article data={item} />
        );

    }
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = articles.filter(
                function (item) {
                    const itemData = item.abstract
                        ? item.abstract.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredArticles(newData);
            setSearch(text);
        } else {
            setFilteredArticles(articles);
            setSearch(text);
        }
    };

    const logoutHandle = () => {
        return Alert.alert('Logout', 'Are you sure you to log out ?', [
          {
            text: 'Yes',
            onPress: () => {
                signOut();
            },
          },
          {
            text: 'No',
            onPress: () => {
              console.log('no');
            },
          },
        ]);
      };

    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                />
                <TouchableOpacity style={styles.logoutBtn}
                onPress={() => {
                    logoutHandle();
                }}
                >
                    <Text style={styles.logoutText}>
                        LOGOUT
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.flatList}
                data={filteredArticles}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                onEndReachedThreshold={0.3}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < 0) return;
                    setCurrentPage(currentPage + 1);
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            if (currentPage === 0) {
                                setReload(!reload);
                            }
                            setCurrentPage(0);
                        }}
                    />
                }
                ListFooterComponent={() => {
                    if (isLoading) {
                        return (
                            <ActivityIndicator size="small" color={colors.primaryColor} />
                        );
                    }
                    return null;
                }}
            />
        </View>
    );

}
export default HomeScreen;



const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    btnContainer:{
        flexWrap:'wrap',
        flexDirection:'row',
    },
    textInputStyle: {
        height: 40,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        margin: 10,
        marginLeft: 15,
        borderColor: colors.primaryColor,
        backgroundColor: '#FFFFFF',
    },
    logoutBtn: {
        height: 40,
        width: 80,
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.primaryColor,
        backgroundColor: colors.primaryColor,
        marginLeft: 40,
    },
    logoutText:{
        color:'white'
    }
});
