import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native'
import WeatherApi from '../api/weatherApi'
import { EvilIcons } from '@expo/vector-icons'
import { iconImages } from '../resources'
import { Context as WeatherContext } from '../context/WeatherContext'
import { UNIT_CELSIUS, UNIT_FAHRENHEIT } from '../constants'
import { fahr2Celc, cels2Fahr } from '../commonTools'
import { theme1, theme2 } from '../resources'

const FavoritesLocThumbnail = (props) => {
    
    const { currentItem, nav } = props
    const [data, setData] = useState('')

    

    const { state: { favoritesList, tempUnit, themePreference }, setCurrentLocation, updateFavorites } = useContext(WeatherContext)
    useEffect(() => {
        getCurrentLocData()
    }, []);

    const getCurrentLocData = async () => {
        const res = await WeatherApi.getCurrentConditions(itemKey)
        if (!res) return
        setData(res[0])
    }

    const theme = themePreference ? theme1 : theme2

    const removeFromFavorites = () => {
        const currentLocIdxInFavorites = favoritesList.findIndex(item => item.Key === currentItem.Key)

        favoritesList.splice(currentLocIdxInFavorites, 1)
            updateFavorites(favoritesList)
    }

    const onRemoveItemPressed = () => {
        Alert.alert(
            'Confirm Action',
            'Remove this item from Favorites?',
            [
                {
                text: 'Cancel',
                style: 'cancel'
                },
                { text: 'OK', onPress: removeFromFavorites }
            ],
            { cancelable: false }
            );
    }

    const name = currentItem.LocalizedName
    const itemKey = currentItem.Key
    const country = currentItem.Country.LocalizedName
    const tempInFahrenheit = data?.Temperature?.Imperial?.Value
    const weatherText = data?.WeatherText || 'No Temperature Data...'
    const weatherIcon = data?.WeatherIcon || null
    const tempToDisplay = tempInFahrenheit ? (tempUnit === UNIT_FAHRENHEIT ? tempInFahrenheit : fahr2Celc(tempInFahrenheit)) : ''

    return <View style={[styles.container, { borderBottomColor: theme.borders }]}>

        <View style={styles.topView}>
            <View style={{flex: 1}}>
                <Text style={[styles.cityNameText, { color: theme.titles } ]}>{name}</Text>
                <Text style={[styles.countryNameText, { color: theme.subtitles } ]}>{country}</Text>
            </View>
            <TouchableOpacity
            onPress={() => {
                setCurrentLocation(currentItem)
                nav.navigate('Main')
            }}
            style={styles.navButton}
            >
        
                <EvilIcons name="arrow-right" size={40} color={theme.favoritesButton}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onRemoveItemPressed}
            style={styles.navButton}
            >
        
                <EvilIcons name="close-o" size={40} color={theme.favoritesButton}/>
            </TouchableOpacity>
        </View>


        <View style={[styles.bottomView, { backgroundColor: theme.favoritesBottomBackground }]}>
            <Text style={[styles.weatherText, { color: theme.mainTemperature }]}>{weatherText}</Text>
            <Text style={[styles.currentTemp, { color: theme.mainTemperature }]} >{tempToDisplay}°</Text>
            <Image 
                    source={ iconImages[weatherIcon] }
                    style={styles.imageStyle}
                />
        </View>

    </View> 
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        minHeight: 130,
        borderBottomWidth: 1,
        alignSelf: 'center',
        marginTop: 20,
        paddingBottom: 20
        
    },
    topView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 8,
        margin: 5,
    },
    imageStyle: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    cityNameText: {
        fontSize: 25,
    },
    countryNameText: {
        fontSize: 20,
    },
    currentTemp: {
        fontSize: 30,
        alignSelf: 'center',
    },
    weatherText: {
        alignSelf: 'center',
        fontSize: 20,
    },


});

export default FavoritesLocThumbnail;