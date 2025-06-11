import KYCScreen from '@/screens/auth/KYCScreen';
import DashboardNavigator from './DashboardNavigator';
import Verification from '@/screens/auth/Verification';
import SigninScreen from '@/screens/auth/SigninScreen';
import CreateAccount from '@/screens/auth/CreateAccount';
import SplashScreen from '@/screens/splashscreen/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="KYCScreen" component={KYCScreen} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="SigninScreen" component={SigninScreen} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="Dashboard" component={DashboardNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
