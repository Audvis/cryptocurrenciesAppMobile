import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const formulario = ( { Moneda, setMoneda, Criptomoneda, setCriptomoneda, setConsultarApi } ) => {
  
  const [Criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarApi();
  }, []);

  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
  });

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCrypto = (crypto) => {
    setCriptomoneda(crypto);
  };

  const cotizarPrecio = () => {
   if(Moneda.trim() === '' || Criptomoneda.trim() === ''){
       mostrarAlerta();
       return;
   }
   setConsultarApi(true);
  };

  const mostrarAlerta = () => {
    Alert.alert(
        'Error...',
        'Ambos campos son obligatorios',
        [
            {text:'OK'}
        ]
    )
  };

  if (!loaded) {
    return null;
  }
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={Moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
      >
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar Americano" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={Criptomoneda}
        onValueChange={(moneda) => obtenerCrypto(moneda)}
      >
        <Picker.Item label="- Seleccione -" value="" />
        {Criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>

      <TouchableHighlight
        onPress={() => cotizarPrecio()}
        style={styles.btnCotizar}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "LatoBlack",
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: "#5E49E2",
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "LatoBlack",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default formulario;
