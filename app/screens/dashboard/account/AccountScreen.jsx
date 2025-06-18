import { colors } from '@/theme';
import AccountInfo from './components/AccountInfo';
import AccountProfile from './components/AccountProfile';
import { ClientsButton, ClientsLayout } from '@/components';

const AccountScreen = () => {
    return (
        <ClientsLayout>
            <AccountProfile />
            <AccountInfo />
            <ClientsButton space={{ bottom: 40 }} text="Logout" bgColor={colors.red1} textColor={colors.red4} />
        </ClientsLayout>
    );
};

export default AccountScreen;
