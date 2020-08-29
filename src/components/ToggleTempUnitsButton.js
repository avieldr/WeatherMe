import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Context as WeatherContext } from '../context/WeatherContext'
import { theme1, theme2 } from '../resources'


import { UNIT_FAHRENHEIT, UNIT_CELSIUS } from '../constants'


const ToggleFavoritesButton = () => {
    const { state: { tempUnit, themePreference }, toggleTempUnits } = useContext(WeatherContext)

    const theme = themePreference ? theme1 : theme2
    return (
                
                <TouchableOpacity
                onPress={() => toggleTempUnits()}
                style={[styles.toggleFavorites, { borderColor: theme.activeButton }]}
                >
                    {/* <Text>{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }</Text> */}
                    <MaterialCommunityIcons name={ "temperature-celsius" } size={30} style={ tempUnit === UNIT_CELSIUS ? { color: theme.activeButton} : { color: theme.inactiveButton} } />
                    <Text style={{ color: '#B9CDE2'}}>/</Text>
                    <MaterialCommunityIcons name={ "temperature-fahrenheit" } size={30} style={ tempUnit === UNIT_FAHRENHEIT ? { color: theme.activeButton} : { color: theme.inactiveButton} } />
                    
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

export default ToggleFavoritesButton;