import React,{useContext} from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../../Contexts/auth';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Profile() {

  const {user,signout} = useContext(AuthContext);
  const navigation = useNavigation();
 return (
   <SafeAreaView style={styles.container}>
     <Header/>
     <Text style={styles.nome}>{user && user.nome}</Text>
     <TouchableOpacity style={styles.newLink} onPress={()=> navigation.navigate('Registrar')}>
       <Text style={styles.newLinkText}>Registrar Gasto</Text>
     </TouchableOpacity>
     <View>
       <TouchableOpacity style={styles.Logout} onPress={()=> signout()}>
         <Text style={styles.LogoutText}>Sair</Text>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#171717'
  },
  nome:{
    textAlign:'center',
    fontSize:28,
    marginTop:15,
    marginBottom:25,
    color:'white'
  },
  newLink:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00b94a',
    width:300,
    height:45,
    borderRadius:10,
    marginBottom:10
  },
  newLinkText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },
  Logout:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#c62c36',
    width:300,
    height:45,
    borderRadius:10,
    marginBottom:10
  },
  LogoutText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  }

});
