// onboarding navigation imports
import Onboarding from '@/screens/onboarding/Onboarding';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>

                {/* onboarding screens */}
                <Stack.Screen name="Onboarding" component={Onboarding} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
