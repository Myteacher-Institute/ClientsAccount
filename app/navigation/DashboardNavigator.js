import { fonts, colors } from '@/theme';
import HomeNavigator from './HomeNavigator';
import StorageNavigator from './StorageNavigator';
import AccountNavigator from './AccountNavigator';
import ResourcesNavigator from './ResourcesNavigator';
import DashboardHeader from '@/components/DashboardHeader';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    header: () => <DashboardHeader />,
    tabBarActiveTintColor: colors.blue1,
    tabBarInactiveTintColor: colors.grey4,
    tabBarLabelStyle: { ...fonts.medium(12) },
    tabBarStyle: {
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
            case 'Storage':
                iconName = focused ? 'folder-open' : 'folder-open-outline';
                break;
            case 'Resources':
                iconName = focused ? 'text-box' : 'text-box-outline';
                break;
            case 'Account':
                iconName = focused ? 'account' : 'account-outline';
                break;
            default:
                iconName = 'ellipse-outline';
        }

        return <Ionicons name={iconName} size={24} color={color} />;
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
