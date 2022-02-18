import React, {useState,useContext} from 'react';
import { View,Text,StyleSheet, Image, TextInput,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import {AuthContext} from '../../Contexts/auth';

export default function Signin() {

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {user} = useContext(AuthContext)
  const navigation = useNavigation();
  const {signIn,loadingAuth} = useContext(AuthContext);
  function handleLogin(){
   signIn(email,password)
  }

 return (
   <View style={styles.background}>
     <View style={styles.container}>
       <Image style={styles.logo} source={require('../../../assets/Logo.png')}/>
       <View style={styles.areaInput}>
         <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor="rgba(255,255,2555,0.20)" style={styles.input}/>
       </View>
       <View style={styles.areaInput}>
         <TextInput placeholder="Senha" value={password} onChangeText={(text) => setPassword(text)}  placeholderTextColor="rgba(255,255,2555,0.20)" style={styles.input} secureTextEntry={true}/>
       </View>
       <TouchableOpacity style={styles.submitButton} onPress={()=> handleLogin()}>
         {
           loadingAuth ? (
             <ActivityIndicator size={20} color="#fff"/>
           ) : (
            <Text style={styles.submitButtonText}>Acessar</Text>
           )

         }
         
       </TouchableOpacity>
       <TouchableOpacity style={styles.link} onPress={()=> navigation.navigate('SigninUp')}>
         <Text style={styles.linkText}>Criar uma conta</Text>
       </TouchableOpacity>
     </View>
   </View>
  );
}

const styles = StyleSheet.create({
 background:{
  flex:1,
  backgroundColor:'#131313'
 },
 container:{
   flex:1,
   alignItems:'center',
   justifyContent:'center'
 },
 logo:{
   marginBottom:15
 },
 areaInput:{
   flexDirection:'row',
 },
 input:{
   backgroundColor:'rgba(0,0,0,0.20)',
   width:'90%',
   fontSize:17,
   color:'white',
   marginBottom:15,
   padding:10,
   borderRadius:7
 },
 submitButton:{
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'#00b94a',
   width:200,
   height:45,
   borderRadius:7,
   marginTop:10
 },
 submitButtonText:{
   color:'#131313',
   fontSize:20
 },
 link:{
   marginTop:15,
   marginBottom:9
 },
 linkText:{
   color:'white'
 }

});
