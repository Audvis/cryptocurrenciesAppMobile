import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { useFonts } from "expo-font";

const Cotizacion = ({ Resultado }) => {
  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  if (Object.keys(Resultado).length === 0) {
    return null;
  }
  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{Resultado.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        El precio màs alto del dìa:{" "}
        <Text style={styles.span}>{Resultado.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        El precio más bajo del día:{" "}
        <Text style={styles.span}>{Resultado.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Variación últimas 24 horas:{" "}
        <Text style={styles.span}>{Resultado.CHANGEPCT24HOUR} %</Text>
      </Text>
      <Text style={styles.texto}>
        Última Actualización:{" "}
        <Text style={styles.span}>{Resultado.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};

const styles = {
  resultado: {
    backgroundColor: "#5E49E2",
    padding: 20,
    marginTop: 20,
  },
  texto: {
    color: "#FFF",
    fontFamily: 'LatoRegular',
    fontSize: 18,
    marginBottom: 10
  },
  precio: {
    fontSize: 38
  },
  span: {
    fontFamily: 'LatoBlack',
  }
};

export default Cotizacion;
