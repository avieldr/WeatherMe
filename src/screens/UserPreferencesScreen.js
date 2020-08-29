import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Text, Input } from 'react-native-elements'
import { Fontisto } from '@expo/vector-icons'
import { theme1, theme2 } from '../resources'
import Spacer from '../components/Spacer'
import Button from '../components/PrefButton'
import WeatherApi from '../api/weatherApi'
import { Context as WeatherContext } from '../context/WeatherContext'; 



const UserPreferencesScreen = () => {
    const { toggleThemeColor, state: { themePreference } } = useContext(WeatherContext)
    const [ state, setState] = useState({ showApiSelect: false, apiKey: 1, insertKeyManuallyMode: false, keyInput: '' })
    const theme = themePreference ? theme1 : theme2
    
    return <SafeAreaView style={[styles.container, { backgroundColor: theme.favoritesBackground }]}>

        <View style={[styles.headerContainer, { borderBottomColor: theme.borders }]}>
            <Text style={[styles.headerText, { color: theme.titles }]}>USER PREFERENCSE</Text>
        </View>

    

        <Button 
        title='Toggle Theme Color'
        onPressCallback={() => toggleThemeColor()}
        />

        <Spacer />

        <Button 
        title= { !state.showApiSelect ? 'Show AccuWeather api Key selection options' : 'Hide AccuWeather api Key selection options'}
        onPressCallback={() => setState({ ...state, showApiSelect: !state.showApiSelect })}
        />

        <Spacer />
        {
            state.showApiSelect && <View style={{ borderRadius: 10, padding: 20, backgroundColor: '#D3E2EA'}}>
            {
                !state.insertKeyManuallyMode 
                ? <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button 
                        additionalStyle={state.apiKey === 1 ? styles.selectedKeyButton : styles.nonSelectedKeyButton}
                        title='KEY 1'
                        onPressCallback={() => setState({ ...state, apiKey: 1 })}
                    />
                    <Spacer />
                    <Button 
                        additionalStyle={state.apiKey === 2 ? styles.selectedKeyButton : styles.nonSelectedKeyButton}
                        title='KEY 2'
                        onPressCallback={() => setState({ ...state, apiKey: 2 })}
                    />
                    <Spacer />
                    <Button 
                    additionalStyle={state.apiKey === 3 ? styles.selectedKeyButton : styles.nonSelectedKeyButton}
                        title='KEY 3'
                        onPressCallback={() => setState({ ...state, apiKey: 3 })}
                    />
                </View>
                : <Input 
                    // leftIcon={{ type: 'EvilIcons', name: 'search', color: theme.searchBar }}
                    rightIcon={ state.keyInput.length > 0 
                    ? { type: 'AntDesign', name: 'close', color: 'gray', onPress: () => setState({ ...state, keyInput: '' }) }
                    : null }
                    placeholder='Insert Key'
                    value={state.keyInput}
                    onChangeText={(text) => setState({ ...state, keyInput: text }) }
                    onEndEditing={() => {console.log('onEndEditing')}}
                    onSubmitEditing={query => {}}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            }
                
                <Spacer/>
                <Button 
                    title={ !state.insertKeyManuallyMode ? 'I have my own key (Insert manually)' : 'I do not have an AccuWeather ApiKey'}
                    onPressCallback={() => setState({ ...state, insertKeyManuallyMode: !state.insertKeyManuallyMode })}

                />
                <Spacer />
                <Spacer />

                <Button 
                    title="APPLY"
                    additionalTextStyle={{ color: 'red'}}
                    onPressCallback={() => {WeatherApi.setApiKey(state.insertKeyManuallyMode ? state.keyInput : state.apiKey)}}
                />

            </View>
        }
            

        </SafeAreaView>


    
}

UserPreferencesScreen.navigationOptions = {
    title: 'Preferences',
    tabBarIcon: <Fontisto name="player-settings" size={20} />,
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 10,
        justifyContent: 'flex-start'
        
    },
    headerContainer: {
        alignSelf: 'center',
        marginBottom: 30,
        borderBottomWidth: 2,
        
        
    },
    headerText: {
        fontSize: 24,
        
    },
    selectedKeyButton: {
        flex: 1,
        backgroundColor: 'red',
        backgroundColor: '#233944'
    },
    nonSelectedKeyButton: {
        flex: 1,
        backgroundColor: 'white',
        backgroundColor: '#96BBCD'
    }
   
});

export default UserPreferencesScreen;