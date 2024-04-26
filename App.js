import { StyleSheet, Text, View } from 'react-native';

import { AuthProvider } from './app/context/AuthContext';
import Navigation from './app/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
       
     <Navigation />
    </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
