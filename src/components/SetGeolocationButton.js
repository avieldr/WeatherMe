import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Context as WeatherContext } from '../context/WeatherContext'
import WeatherApi from '../api/weatherApi'
import { theme1, theme2 } from '../resources'

const SetGeolocationButton = () => {

    const { setCurrentLocation, state: { themePreference } } = useContext(WeatherContext)

    const theme = themePreference ? theme1 : theme2
    return (
                
        <TouchableOpacity
        onPress={ async () => {
            const currentGeopositionLoc = await WeatherApi.getGeopositionSearch()
            console.log(currentGeopositionLoc?.Key)
            if (currentGeopositionLoc?.Key) {
                setCurrentLocation(currentGeopositionLoc)
            }      
        }}
        style={[styles.toggleFavorites, { borderColor: theme.activeButton }]}
        >
            <MaterialIcons name={ "my-location" } size={20} style={{ color: theme.activeButton }} />               
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    toggleFavorites: {
        borderWidth: 1,
        borderRadius: 15,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SetGeolocationButton;