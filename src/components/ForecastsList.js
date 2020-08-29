import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { Input } from 'react-native-elements'
import { Context as WeatherContext } from '../context/WeatherContext'
import { weekDaysStr, monthNames, UNIT_CELSIUS, UNIT_FAHRENHEIT } from '../constants'
import { iconImages } from '../resources'
import { fahr2Celc, cels2Fahr } from '../commonTools'
import { theme1, theme2 } from '../resources'

const ForecastsList = () => {
    const { state: { fiveDaysForecasts, tempUnit, themePreference } } = useContext(WeatherContext)

    const theme = themePreference ? theme1 : theme2
    const renderForecastItem = (item) => {
        const date = new Date(item.Date)
        const weekDay = weekDaysStr[date.getDay()]
        const day = String(date.getDate()).padStart(2, '0')
        const month = date.getMonth()
        const minTemp = item.Temperature.Minimum
        const maxTemp = item.Temperature.Maximum
        return <View key={item.EpochDate} style={[styles.item, { borderTopColor: theme.borders }]}>

            <View style={styles.dateContainer}>
                <Text style={{ color: theme.titles }}>{weekDay}, {day} {monthNames[month]}</Text>
                <Text style={{ color: theme.subtitles }}>{item.Day.IconPhrase}</Text>
            </View>
            
            
        
            <View style={styles.iconContainer}>
                {/* <Image 
                    source={ iconImages[item.Night.Icon] }
                    style={{ height: 40, width: 40}}
                /> */}
                <Image 
                    source={ iconImages[item.Day.Icon] }
                    style={{ flex: 1, height: 40, width: 40}}
                />

                <View style={styles.tempRange}>
                <Text style={{ color: theme.titles}}>{tempUnit === UNIT_FAHRENHEIT ? maxTemp.Value : fahr2Celc(maxTemp.Value)}°</Text>
                <Text style={{ color: theme.subtitles}}>{tempUnit === UNIT_FAHRENHEIT ? minTemp.Value : fahr2Celc(minTemp.Value)}°</Text>
                
            </View>
            </View>
        </View>
        
    }

    return (
        fiveDaysForecasts?.DailyForecasts
        ? <View style={styles.container}>
            { 
               fiveDaysForecasts.DailyForecasts.map((item, index) => (
                  renderForecastItem(item)
               ))
            }
        
        </View>
        :   <Text style={styles.noData}>Forecasts Widget: Waiting for Data...</Text>)
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        borderTopWidth: 1,
        // borderBottomWidth: 1,
        paddingTop: 10,
        paddingLeft: 5,
        // borderBottomColor: 'gray'
    },
    tempRange: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        // borderWidth: 1,
        // borderColor: 'gray',
    },
    dateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        // borderWidth: 1,
        // borderColor: 'gray'
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'gray'
    },
    noData: {
        marginHorizontal:10,
        marginVertical: 20
    }
});

export default ForecastsList;