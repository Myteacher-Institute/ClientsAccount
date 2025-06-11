import StorageScreen from '@/screens/dashboard/storage/StorageScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StorageNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StorageScreen" component={StorageScreen} />
        </Stack.Navigator>
    );
}
