import { colors } from '@/theme';
import AccountInfo from './components/AccountInfo';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import AccountProfile from './components/AccountProfile';

const AccountScreen = () => {
    return (
        <ClientsLayout>
            <AccountProfile />
            <AccountInfo />
            <ClientsButton space={40} text="Logout" bgColor={colors.red1} textColor={colors.red4} />
        </ClientsLayout>
    );
};

export default AccountScreen;
