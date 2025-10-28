import SupportScreen from '@/screens/dashboard/support/SupportScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function SupportNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SupportScreen" component={SupportScreen} />
        </Stack.Navigator>
    );
}
