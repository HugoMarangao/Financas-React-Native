//aqui nos criaremos a navegacao em stack (cadastro,login)
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Signin from '../Pages/Signin';
import SigninUp from '../Pages/SignUp';

const AuthStack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
            <AuthStack.Screen name="SigninUp" component={SigninUp} options={{headerStyle:{
                backgroundColor:'#131313',
                borderBottomWidth:1,
                borderBottomColor:'#00b94a'
            },
            headerTintColor:'white',
            headerBackTitleVisible:false,
            headerTitle:'Voltar'
            }}/>

        </AuthStack.Navigator>
    );
}