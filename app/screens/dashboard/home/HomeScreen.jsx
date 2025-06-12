import ClientsLayout from '@/components/ClientsLayout';
import AccountBalance from './components/AccountBalance';
import AccountDetails from './components/AccountDetails';

const HomeScreen = () => {
    return (
        <ClientsLayout>
            <AccountBalance />
            <AccountDetails />
        </ClientsLayout>
    );
};

export default HomeScreen;
