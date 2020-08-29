import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Context as WeatherContext } from '../context/WeatherContext'
import { Text, Button, Input } from 'react-native-elements'
import { iconImages } from '../resources'
import { UNIT_CELSIUS, UNIT_FAHRENHEIT } from '../constants'
import { fahr2Celc, cels2Fahr } from '../commonTools'

import { theme1, theme2 } from '../resources'

const CurrentStatus = (props) => {
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
        // borderColor: 'green',
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    rightContainer: {
        // borderWidth: 3,
        // borderColor: 'red',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    leftContainer: {
        // borderWidth: 1,
        // borderColor: 'brown',
        marginLeft: 15,
    },
    imageStyle: {
        height: 100,
        width: 100,
        // borderColor: 'red',
        // borderWidth: 1,
    },
    noData: {
        marginHorizontal:10,
        marginVertical: 20
    },
    weatherText: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: 20
    },
    currentTemp: { 
        fontSize: 80,
        
    },
    currently: {
        fontSize: 20,
        
        // borderWidth: 1,
        // borderColor: 'red'
    }
  
});

export default CurrentStatus