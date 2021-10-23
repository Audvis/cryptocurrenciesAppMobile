import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, Text } from 'react-native';
import axios from 'axios'
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';


export default function App() {

  const [Moneda, setMoneda] = useState("");
  const [Criptomoneda, setCriptomoneda] = useState("");
  const [ConsultarApi, setConsultarApi] = useState(false);
  const [Resultado, setResultado] = useState({});
  const [Cargando, setCargando] = useState(false);

  useEffect(() => {
    if (ConsultarApi) {
      const cotizar = async () => {
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Criptomoneda}&tsyms=${Moneda}`;
        const resultado = await axios.get(URL);
        setCargando(true);
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[Criptomoneda][Moneda]);
          setCargando(false);
          setConsultarApi(false);

        }, 3000);
      };
      cotizar();
    }

  }, [ConsultarApi])

  const componente = Cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion
    Resultado={Resultado}
  />

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View
          style={styles.contenido}
        >
          <Formulario
            Moneda={Moneda}
            setMoneda={setMoneda}
            Criptomoneda={Criptomoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarApi={setConsultarApi}
          />
        </View>
        <View style={{ marginTop: 40}}>
          {componente}
        </View>

      </ScrollView>

    </>
  );

}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});
