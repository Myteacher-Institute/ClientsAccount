import HomeScreen from '@/screens/dashboard/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Placeholder screens
const BrowseScreen = () => null;
const OrderScreen = () => null;
const AccountScreen = () => null;

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#888',
    tabBarStyle: {
        height: 70,
        paddingBottom: 10,
        borderTopColor: '#111',
        backgroundColor: '#000',
    },
    tabBarIcon: ({ color, size, focused }) => {
        let iconName;

        switch (route.name) {
            case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
            case 'Browse':
                iconName = focused ? 'compass' : 'compass-outline';
                break;
            case 'Order':
                iconName = focused ? 'cart' : 'cart-outline';
                break;
            case 'Account':
                iconName = focused ? 'person' : 'person-outline';
                break;
            default:
                iconName = 'ellipse-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 2,
    },
});

const DashboardNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Browse" component={BrowseScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
};

export default DashboardNavigator;
