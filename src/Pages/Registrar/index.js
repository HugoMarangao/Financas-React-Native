import React, { useContext } from 'react';
import { View,Text, StyleSheet, TextInput, TouchableOpacity,Keyboard,Alert,SafeAreaView } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Header from '../../Components/Header'
import Picker from '../../Components/Picker';
import firebase from '../../services/firebaseConnection';
import {format} from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../Contexts/auth'
export default function Registrar() {

  const navigation = useNavigation();
  const[valor,setValor] = useState('');
  const [tipo,setTipo] = useState('receita');
  const { user: usuario } = useContext(AuthContext);
  function handleSubmit(){
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || tipo === null){
      alert('Preencha todos os campos!');
      return;
    }
  
    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)} `,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  
   }

  async function handleAdd(){
    let uid = usuario.uid

    let key = await firebase.database().ref('historico').child(uid).push().key;

    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
      
    });

    //atualizar nosso saldo 
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot)=>{
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);

    })
    setValor('');
    Keyboard.dismiss();
    navigation.navigate('Home')
  }

 return (
   <SafeAreaView style={styles.background}>
     <Header/>    
     <View style={{alignItems:'center'}}>
       <TextInput style={styles.input} placeholder='Valor Desejado'
        keyboardType="numeric" 
        returnKeyType="next" 
        onSubmitEditing={()=>Keyboard.dismiss()}
        value={valor}
        onChangeText={(text) => setValor(text)}
        />
        <Picker onChange={setTipo} tipo={tipo}/>
        <TouchableOpacity style={styles.submitButton}  onPress={handleSubmit}>
        <Text style={styles.submitText}>Registrar</Text>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:'#131313'
  },
  input:{
    height:50,
    width:'90%',
    backgroundColor:'rgba(255,255,255,0.9)',
    marginTop:30,
    fontSize:17,
    padding:10
  },
  submitButton:{
    height:50,
    width:200,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#00b94a'
  },
  submitText:{
    fontSize:22,
    fontWeight:'bold',
    color:'white'
  }
});

