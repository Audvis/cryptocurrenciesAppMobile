import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Picker } from '@react-native-picker/picker';

const formulario = () => {

    const[loaded] = useFonts({
        LatoBlack: require('../assets/fonts/Lato-Black.ttf'),
        LatoRegular: require('../assets/fonts/Lato-Regular.ttf'),
    });

    if(!loaded){
        return null;
    }
 

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker>
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Dolar Americano" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    label: {
        fontFamily: 'LatoBlack',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    }
});

export default formulario
