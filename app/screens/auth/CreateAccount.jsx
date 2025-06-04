import { fonts, colors } from '@/theme';
import { Text, StyleSheet } from 'react-native';
import ClientsLayout from '@/components/ClientsLayout';

const CreateAccount = () => {

    return (
        <ClientsLayout>
            <Text style={styles.heading}/>
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
