import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const KYCScreen = ({ navigation }) => {

    return (
        <ClientsLayout title="KYC Verification">
            <View style={styles.section}>
                <Text>Verify CAC Documents</Text>
                <ClientsInput type="cac" label="CAC Registration Number" placeholder="e.g. RC1234567" />

                <ClientsButton space={20} text="Submit for Verification" onPress={() => navigation.navigate('Verification')} />
            </View>
            <Text style={styles.footer}>© 2025 Clients Account. All rights reserved.</Text>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    section: {
        gap: 15,
        marginTop: 10,
        borderRadius: 16,
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
    },
    footer: {
        marginTop: 80,
        ...fonts.light(12),
        color: colors.grey4,
        textAlign: 'center',
    },
});

export default KYCScreen;
