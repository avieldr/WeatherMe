import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Context as WeatherContext } from '../context/WeatherContext'
import { theme1, theme2 } from '../resources'


const ToggleFavoritesButton = () => {
    const { state: { favoritesList, currentLocation, themePreference }, updateFavorites } = useContext(WeatherContext)

    const theme = themePreference ? theme1 : theme2

    if (!currentLocation?.Key) return null
    
    const toggleInFavorites = (isFavorite, currentLocIdxInFavorites) => {
        if (!isFavorite) {
            updateFavorites([ ...favoritesList, currentLocation ])
        } else {
            favoritesList.splice(currentLocIdxInFavorites, 1)
            updateFavorites(favoritesList)
        }
    }
    const currentLocIdxInFavorites = favoritesList.findIndex(item => item.Key === currentLocation.Key)
    const isFavorite = currentLocIdxInFavorites !== -1

    return (
        
                <TouchableOpacity
                onPress={() => toggleInFavorites(isFavorite, currentLocIdxInFavorites)}
                style={[styles.toggleFavorites, isFavorite ? { borderColor: theme.activeButton } : { borderColor: theme.inactiveButton }]}
                >
                    {
                        isFavorite
                        ? <FontAwesome name={ "star" } size={20} style={[styles.activeIconStyle, { color: theme.activeButton}]} />
                        : <FontAwesome name={ "star-o" } size={20} style={[styles.inActiveIconStyle, { color: theme.inactiveButton}]} />
                    }                        
                    
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
        padding: 5,
        justifyContent: 'center',
    },
});

export default ToggleFavoritesButton;