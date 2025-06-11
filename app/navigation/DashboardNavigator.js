import { fonts, colors } from '@/theme';
import HomeNavigator from './HomeNavigator';
import StorageNavigator from './StorageNavigator';
import AccountNavigator from './AccountNavigator';
import ResourcesNavigator from './ResourcesNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardHeader from '@/components/DashboardHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    header: () => <DashboardHeader />,
    tabBarActiveTintColor: colors.grey1,
    tabBarInactiveTintColor: colors.grey8,
    tabBarLabelStyle: { ...fonts.regular(12) },
    tabBarStyle: {
        height: 60,
        elevation: 0,
        shadowOpacity: 0,
        borderTopWidth: 0,
        backgroundColor: colors.white,
    },
    tabBarIcon: ({ color, size, focused }) => {
        let iconName;

        switch (route.name) {
            case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
            case 'Storage':
                iconName = focused ? 'cart' : 'cart-outline';
                break;
            case 'Resources':
                iconName = focused ? 'search' : 'search-outline';
                break;
            case 'Account':
                iconName = focused ? 'person' : 'person-outline';
                break;
            default:
                iconName = 'ellipse-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

const DashboardNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Storage" component={StorageNavigator} />
            <Tab.Screen name="Resources" component={ResourcesNavigator} />
            <Tab.Screen name="Account" component={AccountNavigator} />
        </Tab.Navigator>
    );
};

export default DashboardNavigator;
