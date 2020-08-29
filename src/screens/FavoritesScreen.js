import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import { Context as WeatherContext } from '../context/WeatherContext'
import LocItem from '../components/FavoritesLocThumbnail'
import { theme1, theme2 } from '../resources'

const FavoritesScreen = ({ navigation }) => {
    const { state: { favoritesList, themePreference } } = useContext(WeatherContext)
    
    const theme = themePreference ? theme1 : theme2
    
    const renderItem = ({ item }) => {
        return <LocItem 
            currentItem={item}
            nav={navigation}
        />
    }

    return <SafeAreaView style={[styles.container, { backgroundColor: theme.favoritesBackground }]}>

            <View style={[styles.headerContainer, { borderBottomColor: theme.borders }]}>
                <Text style={[styles.headerText, { color: theme.titles }]}>SAVED LOCATIONS</Text>
            </View>
            {
                (Array.isArray(favoritesList) && favoritesList.length)
                ? <FlatList
                
                data={favoritesList}
                renderItem={renderItem}
                keyExtractor={item => item.Key}
                />
                : <View style={{ alignItems: 'center', paddingTop: 50, paddingHorizontal: 30}}>
                    <Text style={{ fontSize: 18}}>No Saved Locations... Yet!</Text>
                    <Text style={{ textAlign: 'center'}}>You can add new locations from Main page by pressing the 'star' button</Text>
                </View>
                
            }
            
     
    </SafeAreaView>
}

FavoritesScreen.navigationOptions = {
    title: 'Favorites',
    tabBarIcon: <FontAwesome name="star" size={20} />,
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        
        
    },
    headerContainer: {
        alignSelf: 'center',
        marginBottom: 10,
        borderBottomWidth: 2,
        
        
    },
    headerText: {
        fontSize: 24,
        
    }
   
});

export default FavoritesScreen;