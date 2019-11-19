import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import LottieView from 'lottie-react-native'

export default class Login extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.animation}>
              <LottieView
                source={require('../assets/order.json')} autoPlay loop
            />
        </View>
        <TextInput 
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Informe o codigo de rastreio.." 
        placeholderTextColor='#999'
        style={styles.input}
        />
       <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Pesquisar</Text>
       </TouchableOpacity>
    </View>
     
    );
  } 
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
  }
});
