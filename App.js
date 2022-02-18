import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Routes from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/Contexts/auth';


console.disableYellowBox=true;

export default function App() {

  

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="auto" />
        <Routes/>
      </AuthProvider>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'white'
  }
});
