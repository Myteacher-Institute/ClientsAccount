import Folders from './components/Folders';
import RecentFiles from './components/RecentFiles';
import QuickActions from './components/QuickActions';
import ClientsLayout from '@/components/ClientsLayout';
import StorageDetails from './components/StorageDetails';

const StorageScreen = () => {
    return (
        <ClientsLayout>
            <StorageDetails />
            <QuickActions />
            <RecentFiles />
            <Folders />
        </ClientsLayout>
    );
};

export default StorageScreen;
