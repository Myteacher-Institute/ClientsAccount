// onboarding navigation imports
import KYCScreen from '@/screens/auth/KYCScreen';
import Onboarding from '@/screens/onboarding/Onboarding';
import CreateAccount from '@/screens/auth/CreateAccount';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="KYCScreen" component={KYCScreen} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
