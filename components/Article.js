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
    Image,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

const Article = (props) => {
    let data = props.data;
    console.log(data.pub_date);
    return (
        <TouchableOpacity activeOpacity={1} style={styles.container}>
            <Image
                source={{
                    uri: data?.urlToImage ?? 'https://picsum.photos/800',
                    cache: 'force-cache',
                }}
                resizeMode={'cover'}
                style={styles.image}
            />
            
            <LinearGradient
                colors={['#0000', '#000A', '#000']}
                style={styles.titleContainer}
            >
                <Text style={styles.text}>{data?.abstract.slice(0.20)}</Text>
                <Text style={styles.timestamp}>
                    {/* {data.pub_date} */}
                    {
                        data.pub_date ? moment(data.pub_date).format('YYYY-MM-DD')
                        :
                        null
                    }
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );

}

const boxShadow = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    android: { elevation: 6 },
});
const styles = StyleSheet.create({
    container: {
        height: 240,
        minWidth:'90%',
        marginBottom: 18,
        backgroundColor: '#eee',
        borderRadius: 24,
        marginHorizontal: 16,
        ...boxShadow,
    },
    imageContainer: { flex: 1 },
    image: {
        flex: 1,
        borderRadius: 24,
        height: 300,
    },
    titleContainer: {
        bottom: 0,
        width: '100%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 160,
        paddingLeft: 16,
        paddingRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position:'absolute',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        color: '#fff',
        paddingBottom: 24,
    },
    timestamp: {
        position: 'absolute',
        color: '#eee',
        fontSize: 12,
        fontWeight: '300',
        right: 16,
        bottom: 8,
    },
});



export default Article;