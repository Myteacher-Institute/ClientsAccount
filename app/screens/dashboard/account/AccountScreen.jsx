import AccountInfo from './components/AccountInfo';
import ClientsLayout from '@/components/ClientsLayout';
import AccountProfile from './components/AccountProfile';

const AccountScreen = () => {
    return (
        <ClientsLayout>
            <AccountProfile />
            <AccountInfo />
        </ClientsLayout>
    );
};

export default AccountScreen;
