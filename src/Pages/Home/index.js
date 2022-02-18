import React,{useContext,useEffect} from 'react';
import { View,Text, StyleSheet, FlatList,Alert,Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react/cjs/react.development';
import Header from '../../Components/Header';
import {AuthContext} from '../../Contexts/auth';
import List from '../../Components/List';
import firebase from '../../services/firebaseConnection';
import { format,isBefore } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from '../../Components/DatePicker';

export default function Home() {

  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapshot)=>{
        setHistorico([]);
        snapshot.forEach((childItem) => {
          let list ={
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date
          };

          setHistorico(oldArray => [...oldArray, list].reverse())
        })
      })

    }
    loadList();
  },[newDate])

  function handleDelete(data){

    //Pegando data do item:
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    console.log(dateItem);

    //Pegando data hoje:
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);
    console.log(dateHoje);

    

    if( isBefore(dateItem, dateHoje) ){
      // Se a data do registro jÃ¡ passou vai entrar aqui!
      alert('Voce nao pode excluir um registro antigo!');
      return;
    }

    Alert.alert(
      'Cuidado AtenÃ§ao!',
      `VocÃª deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )

  }

  async function handleDeleteSuccess(data){
    await firebase.database().ref('historico')
    .child(uid).child(data.key).remove()
    .then( async ()=>{
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  }

 return (
   <SafeAreaView style={styles.background}>
      <Header/>
      <View style={styles.container}>
          <Text style={styles.nome}>{user && user.nome}</Text>
          <Text style={styles.saldo}>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={handleShowPicker}>
          <MaterialIcons name="date-range" size={40} color="white" style={{paddingLeft:10,marginBottom:15}}/>
        </TouchableOpacity>
        <Text style={styles.title}>Ultimas Movimentações</Text>
        </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item})=> (<List data={item} deleteItem={handleDelete}/>)}
    />
     {show && (
        <DatePicker
        onClose={handleClose}
        date={newDate}
        onChange={onChange}
        />
      )}
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:'#131313'
  },
  container:{
    marginLeft:15,
    marginBottom:15
  },
  nome:{
    fontSize:30,
    color:'white',
    fontStyle:'italic'
  },
  saldo:{
    marginTop:15,
    fontSize:50,
    color:'white',
    fontWeight:'bold'
  },
  title:{
    marginLeft:15,
    fontSize:20,
    color:'#00b94a',
    marginBottom:10
  },
  list:{
    paddingTop:15,
    backgroundColor:'white',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    marginLeft:8,
    marginRight:8
  }
});
