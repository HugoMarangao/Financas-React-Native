import React from 'react';
import { View,StyleSheet,TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export default function Header() {

    const navigation = useNavigation();

 return (
   <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.toggleDrawer()}>
        <EvilIcons name="navicon" size={55} color="white" />
      </TouchableOpacity>
   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        marginBottom:15,
        marginTop:30,
        marginLeft:15,
        width:'100%',
        height:50
    },
    button:{}
});
