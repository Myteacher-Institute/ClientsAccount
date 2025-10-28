import { fonts, colors } from '@/theme';
import HomeNavigator from './HomeNavigator';
import AccountNavigator from './AccountNavigator';
import SupportNavigator from './SupportNavigator';
import DashboardHeader from '@/components/DashboardHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const rootScreens = {
    Home: 'HomeScreen',
    Account: 'AccountScreen',
    Support: 'SupportScreen',
};

const screenOptions = ({ route }) => {
    const activeRoute = getFocusedRouteNameFromRoute(route) ?? rootScreens[route.name];
    const hideTabBar = activeRoute !== rootScreens[route.name];

    return {
        tabBarActiveTintColor: colors.blue2,
        tabBarInactiveTintColor: colors.grey4,
        tabBarLabelStyle: { ...fonts.medium(12) },
        header: () => (!hideTabBar && <DashboardHeader />),
        tabBarStyle: hideTabBar ? { display: 'none' } :
            {
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0,
                backgroundColor: colors.white,
            },
        tabBarIcon: ({ color, focused }) => {
            let iconName;

            switch (route.name) {
                case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                case 'Account':
                    iconName = focused ? 'account' : 'account-outline';
                    break;
                case 'Support':
                    iconName = focused ? 'help-network' : 'help-network-outline';
                    break;
                default:
                    iconName = 'circle-half-full';
            }

            return <Icon name={iconName} size={24} color={color} />;
        },
    };
};

const DashboardNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Account" component={AccountNavigator} />
            <Tab.Screen name="Support" component={SupportNavigator} />
        </Tab.Navigator>
    );
};

export default DashboardNavigator;
