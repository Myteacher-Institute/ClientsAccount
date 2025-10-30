import QuickAccess from './components/QuickAccess';
import ClientsLayout from '@/components/ClientsLayout';
import AccountBalance from './components/AccountBalance';
import AccountDetails from './components/AccountDetails';
import RecentTransactions from './components/RecentTransactions';

const HomeScreen = () => {
    return (
        <ClientsLayout>
            <AccountBalance />
            <AccountDetails />
            <QuickAccess />
            <RecentTransactions />
        </ClientsLayout>
    );
};

export default HomeScreen;
