import { colors } from '@/theme';
import { clearToken } from '@/auth/token';
import { useUser } from '@/context/UserContext';
import AccountInfo from './components/AccountInfo';
import AccountProfile from './components/AccountProfile';
import { ClientsButton, ClientsLayout } from '@/components';

const AccountScreen = ({ navigation }) => {
    const { setUser } = useUser();

    const handleLogout = async () => {
        try {
            await clearToken();
            setUser(null);
            navigation.reset({ index: 0, routes: [{ name: 'SigninScreen' }] });
        } catch (error) {
            console.error('[Logout Error]', error);
        }
    };

    return (
        <ClientsLayout>
            <AccountProfile />
            <AccountInfo />
            <ClientsButton text="Logout" bgColor={colors.red1} space={{ bottom: 40 }} onPress={handleLogout} textColor={colors.red4} />
        </ClientsLayout>
    );
};

export default AccountScreen;
