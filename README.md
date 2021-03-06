# WeatherMe

This project is a simple weather application with react-native.

The app consists of three screens: Main, Favorites and User-Preferences

## Important:
    App makes use on a free weather apiKey which allows limited daily use.
    when max limit reached, the app will display an error message 503 - service not available.
    You are able to manually change the ApiKey from the 'Preferences' screen.
    
## 1. Main screen - For a given location, it displays the current weather and a five-day-daily-forecast.
    Allows searching a location with auto-complete, save/remove a location to/from favorites,
    set location using device's location services and toggeling between Celsius to Fahrenheit display
    
<p float="left">
    <img src="https://github.com/avieldr/WeatherMe/blob/master/screenshots/home1.jpg" width="200"  />
    <img src="https://github.com/avieldr/WeatherMe/blob/master/screenshots/search.jpg" width="200" />
</p>
   
## 2. Favorites screen - displays the favorites list with their current weather brief. 
    Has the ability to remove items from the list and set item as main location on the main screen.
    
    
<img src="https://github.com/avieldr/WeatherMe/blob/master/screenshots/fav.jpg" width="200"  />

## 3. User Preferences - 
    Enables to toggle between light/dark theme colors, enables changing the apiKey (select from exists or insert manually).
<p float="left">
    <img src="https://github.com/avieldr/WeatherMe/blob/master/screenshots/home-dark.jpg" width="200"  />
    <img src="https://github.com/avieldr/WeatherMe/blob/master/screenshots/fav-dark1.jpg" width="200"  />
</p>
<img src="https://github.com/avieldr/WeatherMe/blob/master/screenshots/user_pref.jpg" width="200"  />
