import { fonts, colors } from '@/theme';
import { Text, StyleSheet } from 'react-native';
import ClientsLayout from '@/components/ClientsLayout';

const Onboarding = () => {
    return (
        <ClientsLayout>
            <Text style={styles.heading}>Clients Account</Text>
            <Text style={styles.paragraph}>Making payments to your chamber account easier.</Text>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    heading: {
        color: colors.white,
        ...fonts.semiBold(30),
    },
    paragraph: {
        ...fonts.regular(),
        color: colors.white,
    },
});

export default Onboarding;
