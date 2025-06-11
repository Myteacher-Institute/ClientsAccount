import AccountScreen from '@/screens/dashboard/account/AccountScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
        </Stack.Navigator>
    );
}
