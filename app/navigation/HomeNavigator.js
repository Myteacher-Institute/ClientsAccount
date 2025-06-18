import HomeScreen from '@/screens/dashboard/home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopUpScreen from '@/screens/dashboard/home/components/TopUpScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
        </Stack.Navigator>
    );
}
