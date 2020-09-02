import createDataContext from './createDataContext';
import WeatherApi from '../api/weatherApi';
import AsyncStorage from '@react-native-community/async-storage'
import { UNIT_FAHRENHEIT, UNIT_CELSIUS } from '../constants'


const weatherReducer = (state, action) => {
    switch (action.type) {

        case 'set_current_location':
            const excludeCond1 = !action.payload.Key
            const excludeCond2 = state.currentLocation && state.currentLocation.Key === action.payload.Key
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

    const res = await WeatherApi.get5DaysDailyForecasts(locationKey)
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

const tryLoadSavedFavorites = dispatch => async () => {
    console.log("tryLoadSavedFavorites")
    try {
        const value = await AsyncStorage.getItem('@favorites_list')
        if (value !== null) {
            saveFavorites(JSON.parse(value))
            dispatch({ type: 'update_favorites_list', payload: JSON.parse(value)})
        }
        
      } catch(e) {

    }
}

export const { Context, Provider } = createDataContext(
    weatherReducer,
    { setCurrentLocation,
        updateFavorites,
        getCurrentConditions,
        get5DaysDailyForecasts,
        toggleTempUnits,
        toggleThemeColor,
        tryLoadSavedFavorites 
    },
    { 
        favoritesList: [],
        currentLocation: null, 
        currentConditions: [],
        fiveDaysForecasts: [],
        themePreference: 1,
        tempUnit: UNIT_CELSIUS,
    }
);