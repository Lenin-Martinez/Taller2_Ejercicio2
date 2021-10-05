import React, { useState } from 'react';
import { Text, TextInput, Button, View, FlatList, StyleSheet, TouchableWithoutFeedback, Animated, Modal, Image, TouchableHighlight, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from "@react-native-community/picker";
import { round } from 'react-native-reanimated';


const Drawer = createDrawerNavigator();

function Integrantes({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
      <Text style={styles.item}>Marroquin Echegoyen, Erika Alondra ME180102</Text>
      <Text style={styles.item}>ME180102</Text>
      <Text>_________________________________</Text>

      <Text style={styles.item}>Martinez Huezo, Lenin Steven MH180095</Text>
      <Text style={styles.item}>MH180095</Text>
      <Text>_________________________________</Text>
      <Text>{'\n\n'}</Text>

    <View style={{marginLeft: '35%'}}>
      <Button style={{alignItems: 'center'}} onPress={() => navigation.goBack()} title="Ir al clima" />
      </View>
    </View>
  );
}

function Clima(){
  const [Estado, setEstado] = useState('Normal');
  const Colores = [
  {"name": "Calor", "Color": "#B22222", "url": require('./assets/Calor.png')},
  {"name": "Normal", "Color": "transparent", "url": require('./assets/Normal.png')},
  {"name": "Frio", "Color": "blue", "url": require('./assets/Frio.png')},];

  const [CiudadElegida, setCiudadElegida] = useState();
  const [DatosCiudad, setDatosCiudad] = useState({
      "Nombre": '',
      "TempA": '', 
      "TempMin": '', 
      "TempMax": '', 
      "Humedad": '', 
      "Viento": ''});

  function ConsultaClima(ciudad){
   setCiudadElegida(ciudad)

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ ciudad +',sv&APPID=1227061584198fc729bed1a7dd33f6ca', {
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
      const listado=responseJson;
      setDatosCiudad({
        "Nombre": listado.name,
        "TempA": Math.round(parseFloat(listado.main.temp) - (273.15)), 
        "TempMin": Math.round(parseFloat(listado.main.temp_min) - (273.15)), 
        "TempMax": Math.round(parseFloat(listado.main.temp_max) - (273.15)),
        "Humedad": listado.main.humidity, 
        "Viento": listado.wind.speed});

        if (Math.round(parseFloat(listado.main.temp) - (273.15)) < 18) {
          setEstado('Frio')
        }
        else if ((Math.round(parseFloat(listado.main.temp) - (273.15)) > 17) && (Math.round(parseFloat(listado.main.temp) - (273.15)) < 26) ) {
          setEstado('Normal')
        }
        else{
          setEstado('Calor')
        }
   })
   .catch((error) => {
      console.error(error);
   });
  }

  return(
    <>
    <View style={{backgroundColor: (Colores.find((Fila) => Fila.name === Estado)).Color, height: '100%'}}>
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10,marginRight:10}}>Ciudades de la capital</Text>
         <Text></Text>
      <Picker
        onValueChange={(ciudad) => ConsultaClima(ciudad)}
        selectedValue={CiudadElegida}
        style={{fontSize:18,
          height: 40,
          width: '70%',
          marginTop:10,
          backgroundColor:'lightgray',
          marginLeft: '15%',
        }}
        >
        <Picker.Item label="--seleccione una ciudad--" value=""/>
        <Picker.Item label="Aguilares" value="Aguilares"/>
        <Picker.Item label="Apopa" value="Apopa" />
        <Picker.Item label="Ayutuxtepeque" value="Ayutuxtepeque" />
        <Picker.Item label="Ciudad Delgado" value="Ciudad Delgado" />
        <Picker.Item label="Cuscatancingo" value="Cuscatancingo" />
        <Picker.Item label="El Paisnal" value="El Paisnal" />
        <Picker.Item label="Guazapa" value="Guazapa" />
        <Picker.Item label="Ilopango" value="Ilopango" />
        <Picker.Item label="Mejicanos" value="Mejicanos" />
        <Picker.Item label="Nejapa" value="Nejapa" />
        <Picker.Item label="Panchimalco" value="Panchimalco" />
        <Picker.Item label="Rosario de Mora" value="Rosario de Mora" />
        <Picker.Item label="San Marcos" value="San Marcos" />
        <Picker.Item label="San Martín" value="San Martín" />
        <Picker.Item label="San Salvador" value="San Salvador" />
        <Picker.Item label="Santiago Texacuangos" value="Santiago Texacuangos" />
        <Picker.Item label="Santo Tomás" value="Santo Tomás" />
        <Picker.Item label="Soyapango" value="Soyapango" />
        <Picker.Item label="Tonacatepeque" value="Tonacatepeque" />
      </Picker>


      <Text></Text>
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10,marginRight:10}}>Clima en {DatosCiudad.Nombre}</Text>
      <Text></Text>

      <View style={{marginLeft: '15%'}}>
        <View style={{width:'60%', marginLeft: '8%', backgroundColor: 'rgba(1,1,1,0.5)'}}>
          <Image 
            source={Colores.find((emoji) => emoji.name === Estado).url}
            style={{width:200, height:200}}
          />
        </View>

          <Text style={styles.item}>Temperatura actual: {DatosCiudad.TempA + 'º'}</Text>
          <Text style={styles.item}>Temperatura minima: {DatosCiudad.TempMin + 'º'}</Text>
          <Text style={styles.item}>Temperatura maxima: {DatosCiudad.TempMax + 'º'}</Text>
          <Text style={styles.item}>Humedad: {DatosCiudad.Humedad + '%'}</Text>
          <Text style={styles.item}>Velocidad del viento: {DatosCiudad.Viento + ' Km/h'}</Text>
        </View>

    </View>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Clima" component={Clima} />
        <Drawer.Screen name="Integrantes" component={Integrantes} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 22,
    height: 44,
    fontWeight: 'bold',
  },
ViewModalSup:
{   width: '100%',
    height: '100%',
    flex:1,
    backgroundColor: 'rgba(1,1,1,0.8)',
    justifyContent: 'center',
    alignItems:'center',
},
ViewModalInf:
{
    height:'90%',
    width:'90%',
    backgroundColor: '#fff',
},
Encabezado:
{
  height: 80,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
},
flechaAtras:
{
  width: 50,
  height: 50,
  margin: 10,
},
datosPokemon:
{
  textAlign: 'center',
  fontSize: 25,
  fontStyle: 'italic'
}
});
