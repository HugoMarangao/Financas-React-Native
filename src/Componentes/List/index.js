import React from 'react';
import { View,Text,StyleSheet,TouchableWithoutFeedback,  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';


export default function List({data,deleteItem}) {
 return (
     <TouchableWithoutFeedback onLongPress={ () => deleteItem(data)}>
            <View style={styles.container}>
                <View style={styles.tipo}>
                        <IconView tipo={data.tipo}>
                                <AntDesign name={data.tipo === 'despesa' ? 'arrowdown' : 'arrowup'} size={24} color="white" />
                                <Text style={styles.tipoText}>{data.tipo}</Text>
                        </IconView>
                </View>
                <Text style={styles.valor}>R$ {data.valor}</Text>
            </View>
   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container:{
        marginBottom:5,
        padding:10,
        backgroundColor:'white',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
       
    },
    tipo:{
        flexDirection:'row',
        
    },
    valor:{
        fontSize:20,
        margin:6,
        fontWeight:'bold'
    },
    tipoText:{
        fontSize:20,
        color:'white',
        padding:5,
        fontWeight:'bold'
    }
});

const IconView = styled.View`
flex-direction:row;
background-color: ${props => props.tipo === 'despesa' ? '#C62c36' : '#049301'};
padding-bottom: 3px;
padding-top: 3px;
padding-left: 8px;
padding-right: 8px;
border-radius: 7px;
`;
