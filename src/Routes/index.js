//sera oque chamaremos no app (ele que vai descidir se esta logado todas as rotas de app.routes/ se nao vai ser do auth.routes)
import React, {useContext} from "react";
import {AuthContext} from '../Contexts/auth'
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { ActivityIndicator, View } from "react-native";

export default function Routes(){

    const {signed,loading} = useContext(AuthContext);
    
    if(loading){
      return(
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color='#131313'/>
        </View>
      )
    }

    return(
      signed ? <AppRoutes/> : <AuthRoutes/> 
    )
}