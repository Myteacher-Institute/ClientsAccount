import ClientsLayout from '@/components/ClientsLayout';
import UnlockPremium from './components/UnlockPremium';
import LegalResources from './components/LegalResources';
import ResourcesDetails from './components/ResourcesDetails';

const ResourcesScreen = () => {
    return (
        <ClientsLayout>
            <ResourcesDetails />
            <LegalResources />
            <UnlockPremium />
        </ClientsLayout>
    );
};

export default ResourcesScreen;
