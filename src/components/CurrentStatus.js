import React, { useContext } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Context as WeatherContext } from '../context/WeatherContext'
import { Text } from 'react-native-elements'
import { iconImages } from '../resources'
import { UNIT_FAHRENHEIT } from '../constants'
import { fahr2Celc } from '../commonTools'

import { theme1, theme2 } from '../resources'

const CurrentStatus = () => {
    const { state: { tempUnit, currentConditions, themePreference } } = useContext(WeatherContext)

    const theme = themePreference ? theme1 : theme2

    const tempInFahrenheit = currentConditions?.Temperature?.Imperial?.Value
    const tempToDisplay = tempInFahrenheit ? (tempUnit === UNIT_FAHRENHEIT ? tempInFahrenheit : fahr2Celc(tempInFahrenheit)) : 'No Temperature Data...'
    return (

            currentConditions?.Temperature 
            ? <View style={styles.container}>

                <View style={styles.leftContainer}>
                    <Text style={[styles.currently, { color: theme.titles }]}>CURRENTLY</Text>
                    <Text style={[styles.currentTemp, { color: theme.mainTemperature }]} >{tempToDisplay}°</Text>
                </View>

                <View style={styles.rightContainer}>
                <Text style={[styles.weatherText, { color: theme.titles}]}>{currentConditions.WeatherText}</Text>
                    <Image 
                        source={ iconImages[currentConditions.WeatherIcon] }
                        style={styles.imageStyle}
                    />       
                </View>
                    
            </View> 
            : <Text style={styles.noData}>Current Status Widget: Waiting for Data...</Text>

    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent:'space-between'
    },
    leftContainer: {
        marginLeft: 15,
    },
    imageStyle: {
        height: 100,
        width: 100,
    },
    noData: {
        marginHorizontal:10,
        marginVertical: 20
    },
    weatherText: {
        fontSize: 20
    },
    currentTemp: { 
        fontSize: 80,
        
    },
    currently: {
        fontSize: 20,
    }
  
});

export default CurrentStatus