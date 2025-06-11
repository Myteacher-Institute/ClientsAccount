import ResourcesScreen from '@/screens/dashboard/resources/ResourcesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ResourcesNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} />
        </Stack.Navigator>
    );
}
