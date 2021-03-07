import React, { useState } from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Dialog from "react-native-dialog";
import LottieView from 'lottie-react-native'

import api from '../services/api';

export default function Login({navigation}) {
  const [code, setCode] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [order , setOrder] = useState()

  const handleSearchCode = async () => {
    const response = await api.get( `/tracking/${code}`);

    const { message } = response.data;

    setOrder(message[0])
    setShowModal(true)
  };
  
  return (
    <View style={styles.container}>
        {
          order ?
          <View style={styles.orderBorder}>
            <>
              <Text style={styles.orderDetails}>{order.code}</Text>
              {order.tracks &&
                order.tracks.map(track => (
                  <>
                    <Text style={styles.orderDetails}>{track.locale}</Text>
                    <Text>{track.status}</Text>
                    <Text>{track.trackedAt}</Text>
                  </>
                ))
              }
              <Text>{order.isDelivered && 'Entrege'}</Text>
            </>
            </View>
          :
            <View style={styles.animation}>
              <LottieView source={require('../assets/order.json')} autoPlay loop />
            </View> 
        }
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.button}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        <Modal 
          visible={showModal} 
          hiddenModal={() => 
          setShowModal(false)}
          searchPackage={handleSearchCode}
          value={code}
          onSetCode={setCode}
        />
    </View>
  );
} 

const Modal = props => {
  return (
    <View>
      <Dialog.Container visible={props.visible}>
        <Dialog.Title>Rastrear pacote</Dialog.Title>
        <Dialog.Input
          value={props.value}
          onChangeText={value => props.onSetCode(value)}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Informe o codigo de rastreio.." 
          placeholderTextColor='#999'
          style={styles.input}
        />
        <Dialog.Button onPress={props.hiddenModal} label="Cancel" />
        <Dialog.Button onPress={props.searchPackage} label="Pesquisar" />
      </Dialog.Container>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
   height: 46,
   alignSelf: 'stretch',
   backgroundColor: '#fff',
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 4,
  //  marginTop: 20,
   paddingHorizontal: 15,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#f5f5',
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11
  },
  animation:{
   height: '40%',
   width: 400, 
  },
  orderDetails:{
   color: '#fff',
   justifyContent: 'space-between'
  },
  orderBorder:{
    borderColor: '#DDD' ,
    borderWidth: 1,
    borderRadius: 8,
    margin: 15,
    padding: 15,
    // overflow: 'hidden',
    // position: 'absolute',

  }
});
