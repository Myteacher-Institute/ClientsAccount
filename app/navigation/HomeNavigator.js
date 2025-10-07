import HomeScreen from '@/screens/dashboard/home/HomeScreen';
import TopUpScreen from '@/screens/dashboard/home/components/TopUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentScreen from '@/screens/dashboard/home/components/PaymentScreen';
import WithdrawFunds from '@/screens/dashboard/home/components/WithdrawFunds';
import WithdrawToBank from '@/screens/dashboard/home/components/WithdrawToBank';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="WithdrawFunds" component={WithdrawFunds} />
      <Stack.Screen name="WithdrawToBank" component={WithdrawToBank} />
    </Stack.Navigator>
  );
}
