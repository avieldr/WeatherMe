import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

import SearchInput from '../components/SearchInput'
import ForecastsList from '../components/ForecastsList'
import { jerusalemLocationExample } from '../constants'
import { Context as WeatherContext } from '../context/WeatherContext'; 
import CurrentStatus from '../components/CurrentStatus'
import ToggleFavoritesButton from '../components/ToggleFavoritesButton'
import ToggleTempUnitsButton from '../components/ToggleTempUnitsButton'
import SetGeolocationButton from '../components/SetGeolocationButton'
import WeatherApi from '../api/weatherApi'
import { theme1, theme2 } from '../resources'


const MainScreen = () => {

    const { state: { currentLocation, themePreference },
        setCurrentLocation,
        getCurrentConditions,
        get5DaysDailyForecasts,
        tryLoadSavedFavorites
    } = useContext(WeatherContext)

    const theme = themePreference ? theme1 : theme2
    
    useEffect(() => {
        tryLoadSavedFavorites()
        setInitialLocation()
    }, []);

    useEffect(() => {
        getCurrentConditions(currentLocation?.Key)
        get5DaysDailyForecasts(currentLocation?.Key)

    }, [currentLocation]);

    
    const setInitialLocation = async () => {
        const currentGeopositionLoc = await WeatherApi.getGeopositionSearch()
        setCurrentLocation(currentGeopositionLoc?.Key ? currentGeopositionLoc : jerusalemLocationExample)
    }
    
    return <SafeAreaView style={[styles.container, { backgroundColor: theme.mainBackground }]}>
        <ScrollView>
            <SearchInput />

            <View style={styles.bodyContainer}>
                <View style={[styles.mainFrame, { borderColor: theme.borders }]}>
                    <View style={[styles.headContainer, { borderBottomColor: theme.borders}]}>

                        <View style={{ flex: 1}}>
                            <Text style={[styles.locationNameHeader, { color: theme.titles}]}>{ currentLocation?.LocalizedName || null }</Text>
                            <Text style={[styles.locationNameSecondary, { color: theme.subtitles}]}>{ currentLocation?.Country?.LocalizedName || null }</Text>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ height: 40, width: 40 }}>
                                <ToggleFavoritesButton />
                            </View>
                            
                            <View style={{ height: 40, width: 40 }}>
                                <SetGeolocationButton />
                            </View>

                            <View style={{ height: 40, width: 70 }}>
                                <ToggleTempUnitsButton />
                            </View>
                        </View>
                    </View>

                    <CurrentStatus />
                </View>
                <View style={styles.forecastsList}>
                    <ForecastsList />
                </View>
            </View> 

        </ScrollView>
        
    </SafeAreaView> 
    
}

MainScreen.navigationOptions = {
    title: 'Home',
    tabBarIcon: <FontAwesome name="home" size={20} />,
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    currentTempStatus: { 
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    WeatherText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    forecastsList: {
        flex: 6,
    },
    iconStyle: { 
        marginRight: 5,
        marginLeft: 5 
    },
    locationNameHeader: {
        flex: 1,
        fontSize: 28,
    },
    locationNameSecondary: {
        flex: 1,
        fontSize: 20,
    },
    mainFrame: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 20
    }
});

export default MainScreen;