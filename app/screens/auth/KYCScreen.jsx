import { useState } from 'react';
import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import Icon from 'react-native-vector-icons/Ionicons';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import { Text, View, Pressable, StyleSheet } from 'react-native';

const KYCScreen = ({ navigation }) => {
    const [terms, setTerms] = useState(false);

    return (
        <ClientsLayout title="KYC Verification">
            <View style={styles.section}>
                <View style={styles.header}>
                    <Icon name="briefcase" size={22} color={colors.yellow} />
                    <Text style={styles.headerText}>Verify CAC Documents</Text>
                </View>

                <ClientsInput type="cac" darkLabel="CAC Registration Number" placeholder="e.g. RC1234567" />

                <Pressable onPress={() => setTerms(prev => !prev)} style={styles.terms}>
                    <View style={[styles.termsCircle, terms && styles.termsChecked]}>
                        {terms && <Icon name="checkmark" size={12} color={colors.white} />}
                    </View>
                    <Text style={styles.termsText}>I accept terms and privacy policy</Text>
                </Pressable>

                <ClientsButton space={20} leftIcon="help-circle-outline" text="Submit for Verification" onPress={() => navigation.navigate('Verification')} />
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
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    header: {
        gap: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        ...fonts.medium(18),
        color: colors.grey3,
    },
    terms: {
        gap: 6,
        alignItems: 'center',
        flexDirection: 'row',
    },
    termsText: {
        ...fonts.italic(),
        color: colors.grey3,
    },
    termsCircle: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.grey2,
    },
    termsChecked: {
        borderColor: colors.blue1,
        backgroundColor: colors.blue1,
    },
    footer: {
        marginTop: 80,
        ...fonts.light(12),
        textAlign: 'center',
        color: colors.grey4,
    },
});

export default KYCScreen;
