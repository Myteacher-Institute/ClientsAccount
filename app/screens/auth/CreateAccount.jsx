import { fonts, colors } from '@/theme';
import { Text, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';

const CreateAccount = ({ navigation }) => {

    return (
        <ClientsLayout Scroll>
            <ClientsButton space={20} text="Continue" onPress={() => navigation.navigate('KYCScreen')} />
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    heading: {
        padding: 20,
        color: colors.white,
        ...fonts.regular(20),
    },
});

export default CreateAccount;
