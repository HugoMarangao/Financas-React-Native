//aqui colocaremos as configuracoes de rotas que o usuario estara logado (deshbord )
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import Registrar from '../Pages/Registrar';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes(){
    return(
        <AppDrawer.Navigator
            drawerStyle={{
                backgroundColor:'#171717'
            }}
            drawerContentOptions={{
                labelStyle:{
                    fontWeight:'bold'
                },
                activeTintColor:'white',
                activeBackgroundColor:'#00b94a',
                inactiveBackgroundColor:'#000',
                inactiveTintColor:'#ddd',
                itemStyle:{
                    marginVertical:6
                }
            }}
        >
            <AppDrawer.Screen name="Home" component={Home}/>
            <AppDrawer.Screen name="Registrar" component={Registrar}/>
            <AppDrawer.Screen name="Profile" component={Profile}/>
            
        </AppDrawer.Navigator>
    );
}

