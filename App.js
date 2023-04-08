import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GroceryShopScreen from './screens/GroceryShopScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import PreparingOrderScreen from './screens/PreparingOrderScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
    <TailwindProvider>
   <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GroceryShop" component={GroceryShopScreen}/>
      <Stack.Screen name="Basket" component={BasketScreen} 
      options={{ presentation: "modal", headerShown: false}}/>
      <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen}
      options={{ presentation: "fullScreenModal", headerShown: false}}/>
      <Stack.Screen name="Delivery" component={DeliveryScreen}
      options={{ presentation: "fullScreenModal", headerShown: false}}/>

   </Stack.Navigator>
    </TailwindProvider>
    </Provider>
    </NavigationContainer>
  );
}


