import createDataContext from './createDataContext';
import WeatherApi from '../api/weatherApi';
import { tempUnitsArr } from '../constants'
import AsyncStorage from '@react-native-community/async-storage'

import { UNIT_FAHRENHEIT, UNIT_CELSIUS } from '../constants'



const weatherReducer = (state, action) => {
    switch (action.type) {



        case 'set_current_location':
            const excludeCond1 = !action.payload.Key
            const excludeCond2 = state.currentLocation && state.currentLocation.Key === action.payload.Key
            // console.log("cond1: ", excludeCond1)
            // console.log("cond2: ", excludeCond2)
            if (excludeCond1 || excludeCond2) return state
            return { ...state, currentLocation: action.payload, currentConditions: [], fiveDaysForecasts: [] };
        case 'update_current_conditions':
            return { ...state, currentConditions: action.payload[0] }

        case 'update_5Days_forecasts':
            return { ...state, fiveDaysForecasts: action.payload }

        case 'update_favorites_list':
            return { ...state, favoritesList: action.payload }
        case 'toggle_temp_units':
            return { ...state, tempUnit: state.tempUnit === UNIT_CELSIUS ? UNIT_FAHRENHEIT : UNIT_CELSIUS }
        case 'toggle_theme_color':
            return { ...state, themePreference: state.themePreference ? 0 : 1 }
        default:
            return state;
    }
};

const setCurrentLocation = dispatch => (newLocation) => {
    console.log('CALLED: setCurrentLocation')
    dispatch({ type: 'set_current_location', payload: newLocation})
}

const updateFavorites = dispatch => (updatedFavoritesList) => {
    console.log('CALLED: updateFavorites')
    saveFavorites(updatedFavoritesList)
    dispatch({ type: 'update_favorites_list', payload: updatedFavoritesList})
}

const getCurrentConditions = dispatch => async (locationKey) => {
    console.log('CALLED: getCurrentConditions. locationKey: ', locationKey)
    if (!locationKey) return

    const res = await WeatherApi.getCurrentConditions(locationKey)
    if (!res) return
    dispatch({ type: 'update_current_conditions', payload: res })
}

const get5DaysDailyForecasts = dispatch => async (locationKey) => {
    console.log('CALLED: get5DaysDailyForecasts. locationKey: ', locationKey)
    if (!locationKey) return

    const res = await WeatherApi.get5DaysDailyForecasts(locationKey, mock=true)
    dispatch({ type: 'update_5Days_forecasts', payload: res })
}

const toggleTempUnits = dispatch => () => {
    dispatch({ type: 'toggle_temp_units', payload: ''})
}

const toggleThemeColor = dispatch => () => {
    dispatch({ type: 'toggle_theme_color', payload: ''})
}

const saveFavorites = async (favoritesList) => {
    try {
        const jsonValue = JSON.stringify(favoritesList)
        await AsyncStorage.setItem('@favorites_list', jsonValue)
    } catch (e) {
        console.log(error)
    }
}


export const { Context, Provider } = createDataContext(
    weatherReducer,
    { setCurrentLocation, updateFavorites, getCurrentConditions, get5DaysDailyForecasts, toggleTempUnits, toggleThemeColor },
    { 
        // favoritesList: [{"Version":1,"Key":"221483","Type":"City","Rank":75,"LocalizedName":"Jerusalem","EnglishName":"Jerusalem","PrimaryPostalCode":"","Region":{"ID":"CAC","LocalizedName":"Central America","EnglishName":"Central America"},"Country":{"ID":"JM","LocalizedName":"Jamaica","EnglishName":"Jamaica"},"AdministrativeArea":{"ID":"10","LocalizedName":"Westmoreland","EnglishName":"Westmoreland","Level":1,"LocalizedType":"Parish","EnglishType":"Parish","CountryID":"JM"},"TimeZone":{"Code":"EST","Name":"America/Jamaica","GmtOffset":-5,"IsDaylightSaving":false,"NextOffsetChange":null},"GeoPosition":{"Latitude":18.317,"Longitude":-78.233,"Elevation":{"Metric":{"Value":188,"Unit":"m","UnitType":5},"Imperial":{"Value":616,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Radar"]},{"Version":1,"Key":"3496636","Type":"City","Rank":85,"LocalizedName":"Jerusalem","EnglishName":"Jerusalem","PrimaryPostalCode":"","Region":{"ID":"OCN","LocalizedName":"Oceania","EnglishName":"Oceania"},"Country":{"ID":"AU","LocalizedName":"Australia","EnglishName":"Australia"},"AdministrativeArea":{"ID":"SA","LocalizedName":"South Australia","EnglishName":"South Australia","Level":1,"LocalizedType":"State","EnglishType":"State","CountryID":"AU"},"TimeZone":{"Code":"ACST","Name":"Australia/Adelaide","GmtOffset":9.5,"IsDaylightSaving":false,"NextOffsetChange":"2020-10-03T16:30:00Z"},"GeoPosition":{"Latitude":-33.976,"Longitude":137.717,"Elevation":{"Metric":{"Value":55,"Unit":"m","UnitType":5},"Imperial":{"Value":180,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[{"Level":2,"LocalizedName":"Copper Coast","EnglishName":"Copper Coast"}],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Alerts","FutureRadar","MinuteCast","Radar"]},{"Version":1,"Key":"1376675","Type":"City","Rank":85,"LocalizedName":"Jerusalem","EnglishName":"Jerusalem","PrimaryPostalCode":"","Region":{"ID":"EUR","LocalizedName":"Europe","EnglishName":"Europe"},"Country":{"ID":"CZ","LocalizedName":"Czechia","EnglishName":"Czechia"},"AdministrativeArea":{"ID":"20","LocalizedName":"Central Bohemian","EnglishName":"Central Bohemian","Level":1,"LocalizedType":"Region","EnglishType":"Region","CountryID":"CZ"},"TimeZone":{"Code":"CEST","Name":"Europe/Prague","GmtOffset":2,"IsDaylightSaving":true,"NextOffsetChange":"2020-10-25T01:00:00Z"},"GeoPosition":{"Latitude":49.662,"Longitude":14.037,"Elevation":{"Metric":{"Value":558,"Unit":"m","UnitType":5},"Imperial":{"Value":1831,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[{"Level":2,"LocalizedName":"Příbram","EnglishName":"Příbram"},{"Level":3,"LocalizedName":"Háje","EnglishName":"Háje"}],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Alerts","ForecastConfidence","FutureRadar","MinuteCast","Radar"]},{"Version":1,"Key":"3537004","Type":"City","Rank":85,"LocalizedName":"Jerusalem","EnglishName":"Jerusalem","PrimaryPostalCode":"","Region":{"ID":"EUR","LocalizedName":"Europe","EnglishName":"Europe"},"Country":{"ID":"IE","LocalizedName":"Ireland","EnglishName":"Ireland"},"AdministrativeArea":{"ID":"KE","LocalizedName":"County Kildare","EnglishName":"County Kildare","Level":1,"LocalizedType":"County","EnglishType":"County","CountryID":"IE"},"TimeZone":{"Code":"IST","Name":"Europe/Dublin","GmtOffset":1,"IsDaylightSaving":true,"NextOffsetChange":"2020-10-25T01:00:00Z"},"GeoPosition":{"Latitude":52.891,"Longitude":-6.935,"Elevation":{"Metric":{"Value":50,"Unit":"m","UnitType":5},"Imperial":{"Value":164,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Alerts","ForecastConfidence","FutureRadar","MinuteCast","Radar"]},{"Version":1,"Key":"1062987","Type":"City","Rank":85,"LocalizedName":"Jerusalem","EnglishName":"Jerusalem","PrimaryPostalCode":"","Region":{"ID":"NAM","LocalizedName":"North America","EnglishName":"North America"},"Country":{"ID":"MX","LocalizedName":"Mexico","EnglishName":"Mexico"},"AdministrativeArea":{"ID":"DUR","LocalizedName":"Durango","EnglishName":"Durango","Level":1,"LocalizedType":"State","EnglishType":"State","CountryID":"MX"},"TimeZone":{"Code":"CDT","Name":"America/Monterrey","GmtOffset":-5,"IsDaylightSaving":true,"NextOffsetChange":"2020-10-25T07:00:00Z"},"GeoPosition":{"Latitude":25.809,"Longitude":-103.358,"Elevation":{"Metric":{"Value":1091,"Unit":"m","UnitType":5},"Imperial":{"Value":3578,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[{"Level":2,"LocalizedName":"Gómez Palacio","EnglishName":"Gómez Palacio"}],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Radar"]}], 
        favoritesList: [],
        currentLocation: null, 
        currentConditions: [],
        fiveDaysForecasts: [],
        themePreference: 1,
        tempUnit: UNIT_CELSIUS,
    }
);