import KYCScreen from '@/screens/auth/KYCScreen';
import CreateAccount from '@/screens/auth/CreateAccount';
import SplashScreen from '@/screens/splashscreen/SplashScreen';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="KYCScreen" component={KYCScreen} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
