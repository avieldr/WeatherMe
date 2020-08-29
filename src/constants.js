export const weekDaysStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const UNIT_CELSIUS = 'C'
export const UNIT_FAHRENHEIT = 'F'




export const errors = {
    '503': {
        title: "Error 503 - Service Unavailable",
        message: "AccuWeather Api server temporarily unable to handle the request. This may be due to the current apiKey has reached its max limit requests.\nYou can replace the key in 'Preferences' section."
    },
    '401': {
        title: "Error 401 - Service Unauthorized",
        message: "This may be due to an incorrect/invalid apiKey.\nYou can replace the key in 'Preferences' section."
    }
}

export const jerusalemLocationExample = {
    "Version":1,
    "Key":"213225",
    "Type":"City",
    "Rank":30,
    "LocalizedName":"Jerusalem",
    "Country": {
        "ID":"IL",
        "LocalizedName":"Israel"
    },
    "AdministrativeArea": {
        "ID":"JM",
        "LocalizedName":"Jerusalem"
    }
}

export const jerusalemCurrentConditionsExample = {
    "LocalObservationDateTime":"2020-08-17T15:45:00+03:00",
    "EpochTime":1597668300,
    "WeatherText":"Sunny",
    "WeatherIcon":1,
    "HasPrecipitation":false,
    "PrecipitationType":null,
    "IsDayTime":true,
    "Temperature": {
        "Metric": {
            "Value":30.8,
            "Unit":"C",
            "UnitType":17
        },
        "Imperial":{
            "Value":87,
            "Unit":"F",
            "UnitType":18
        }
    },
    "MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us",
    "Link":"http://www.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us"
}

export const jeru5DaysExample = {
    "Headline":{
    "EffectiveDate":"2020-08-22T08:00:00+03:00",
    "EffectiveEpochDate":1598072400,
    "Severity":7,
    "Text":"Mostly sunny this weekend",
    "Category":"",
    "EndDate":null,
    "EndEpochDate":null,
    "MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/extended-weather-forecast/213225?lang=en-us",
    "Link":"http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date":"2020-08-17T07:00:00+03:00",
            "EpochDate":1597636800,
            "Temperature":{
                "Minimum":{
                    "Value":64,
                    "Unit":"F",
                    "UnitType":18
                },
                "Maximum":{
                    "Value":87,
                    "Unit":"F",
                    "UnitType":18
                }},
                "Day":{
                    "Icon":1,
                    "IconPhrase":"Sunny",
                    "HasPrecipitation":false
                },
                "Night":{
                    "Icon":33,
                    "IconPhrase":"Clear",
                    "HasPrecipitation":false
                },
                "Sources":["AccuWeather"],
                "MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=1&lang=en-us",
                "Link":"http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=1&lang=en-us"
        },
        {
            "Date":"2020-08-18T07:00:00+03:00",
            "EpochDate":1597723200,
            "Temperature":{
                "Minimum":{
                    "Value":66,
                    "Unit":"F",
                    "UnitType":18
                },
                "Maximum":{
                    "Value":85,"Unit":"F","UnitType":18}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=2&lang=en-us","Link":"http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=2&lang=en-us"},{"Date":"2020-08-19T07:00:00+03:00","EpochDate":1597809600,"Temperature":{"Minimum":{"Value":64,"Unit":"F","UnitType":18},"Maximum":{"Value":85,"Unit":"F","UnitType":18}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=3&lang=en-us","Link":"http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=3&lang=en-us"},{"Date":"2020-08-20T07:00:00+03:00","EpochDate":1597896000,"Temperature":{"Minimum":{"Value":67,"Unit":"F","UnitType":18},"Maximum":{"Value":86,"Unit":"F","UnitType":18}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=4&lang=en-us","Link":"http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=4&lang=en-us"},{"Date":"2020-08-21T07:00:00+03:00","EpochDate":1597982400,"Temperature":{"Minimum":{"Value":68,"Unit":"F","UnitType":18},"Maximum":{"Value":84,"Unit":"F","UnitType":18}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=5&lang=en-us",
                "Link":"http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=5&lang=en-us"}]}


