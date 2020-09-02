import React from 'react'
import { Alert } from 'react-native'
import { key1, key2, key3 } from './config'
import axios from 'axios'

import { errors } from '../constants'
import * as Location from 'expo-location';

class WeatherApi {

    constructor() {

        this.apiKey = key3
        this.autoCompleteCancelToken = undefined
        this.dailyForecastsCancelToken = undefined
        this.geopositionSearchCancelToken = undefined

        this.instance =  axios.create({
            baseURL: 'http://dataservice.accuweather.com'           
        });

        this.instance.interceptors.request.use(
            config => config,
            err => Promise.reject(err)
        );
        
        this.instance.interceptors.response.use(
            res => res,
            err => {
                if (axios.isCancel(err)) {
                    return
                }
                if (!err.response) {
                    Alert.alert("Error", err.message)
                } else {
                    const errStatusStr = err.response.status.toString()
                    switch (errStatusStr) {
                        case '503':
                            Alert.alert(errors['503'].title, errors['503'].message)
                            break
                        case '401':
                            Alert.alert(errors['401'].title, errors['401'].message)
                            break
                        default:
                            Alert.alert("Error - " + errStatusStr, err.message)
                    }   
                }
        
                return Promise.reject(err);        
            }
        )
    }

    getAutocompleteSearch = async (query) => {

        if (typeof this.autoCompleteCancelToken != typeof undefined) {
            this.autoCompleteCancelToken.cancel("Operation canceled due to new request.");
        }
        this.autoCompleteCancelToken = axios.CancelToken.source()

        try {
            
            const response = await this.instance.get(
                `/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${query}`,
                { cancelToken: this.autoCompleteCancelToken.token }
                )
            return response?.data

        } catch (error) {
            console.log('getAutocompleteSearch error: ', error.message)
        }
    }

    getCurrentConditions = async (locationKey, details=false) => {
        
        try {

            const response = await this.instance.get(`/currentconditions/v1/${locationKey}?apikey=${this.apiKey}&details=${details}`)
            return response?.data

        } catch (error) {
            console.log('getCurrentConditions error: ', error)
        }
    }

    get5DaysDailyForecasts = async (locationKey, details=false) => {

        if (typeof this.dailyForecastsCancelToken != typeof undefined) {
            this.dailyForecastsCancelToken.cancel("Operation canceled due to new request.");
        }
        this.dailyForecastsCancelToken = axios.CancelToken.source()

        try {
  
            const response = await this.instance.get(
                `/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&details=${details}`,
                { cancelToken: this.dailyForecastsCancelToken.token }
            )
            console.log('get5DaysDailyForecasts responded!')
            return response?.data
        } catch (error) {
            console.log('get5DaysDailyForecasts error: ', error)
        }
    }

    getGeopositionSearch = async () => {

        if (typeof this.geopositionSearchCancelToken != typeof undefined) {
            this.geopositionSearchCancelToken.cancel("Operation canceled due to new request.");
        }
        this.geopositionSearchCancelToken = axios.CancelToken.source()

        try {
            
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }

            const location = await Location.getCurrentPositionAsync({});
            const query = `${location.coords.latitude},${location.coords.longitude}`
            const response = await this.instance.get(
                `/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${query}`,
                { cancelToken: this.geopositionSearchCancelToken.token }
            )

            return response?.data
        } catch (error) {
            console.log('getGeopositionSearch error: ', error.message)
        }
    }

    setApiKey = (newKey) => {
        switch (newKey) {
            case 1:
                this.apiKey = key1
                console.log("1", this.apiKey)
    
                break
            case 2:
                this.apiKey = key2
                console.log("2", this.apiKey)

                break
            case 3:
                this.apiKey = key3
                console.log("3", this.apiKey)

                break
            default:
                this.apiKey = newKey
                console.log("4", this.apiKey)
        }
    }
}

const apiInstance = new WeatherApi()

export default apiInstance
