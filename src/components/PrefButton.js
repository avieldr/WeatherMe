import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'


const PrefButton = (props) => {
    const { title, onPressCallback, additionalStyle, additionalTextStyle } = props
    return <TouchableOpacity
    style={[styles.container, additionalStyle]}
    onPress={onPressCallback}
    >
        <Text style={[styles.text, additionalTextStyle]}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingVertical: 10,
        backgroundColor: '#96BBCD'
    },
    text: {
        alignSelf: 'center',
        color: 'white'
    }
  
});

export default PrefButton