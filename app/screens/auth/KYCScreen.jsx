import { useState } from 'react';
import { fonts, colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsButton, ClientsLayout } from '@/components';

const KYCScreen = ({ navigation }) => {
    const [terms, setTerms] = useState(false);

    return (
        <ClientsLayout title="KYC Verification">
            <View style={styles.section}>
                <View style={styles.header}>
                    <Ionicons name="briefcase" size={22} color={colors.yellow1} />
                    <Text style={styles.headerText}>Verify CAC Documents</Text>
                </View>

                <ClientsInput darkLabel="CAC Registration Number" placeholder="e.g. RC1234567" />

                <View style={styles.upload}>
                    <Text style={styles.uploadText}>Upload Call to Bar Certificate (PDF)</Text>
                    <Pressable style={styles.button}>
                        <FontAwesome6 name="upload" size={15} color={colors.white} />
                        <Text style={styles.buttonText}>Choose File</Text>
                    </Pressable>
                </View>
                <View style={styles.upload}>
                    <Text style={styles.uploadText}>Upload CAC Certificate (PDF, JPG, PNG)</Text>
                    <Pressable style={styles.button}>
                        <FontAwesome6 name="upload" size={15} color={colors.white} />
                        <Text style={styles.buttonText}>Choose File</Text>
                    </Pressable>
                </View>
                <View style={styles.upload}>
                    <Text style={styles.uploadText}>Upload Recent Photo</Text>
                    <Pressable style={styles.button}>
                        <FontAwesome name="photo" size={15} color={colors.white} />
                        <Text style={styles.buttonText}>Upload Photo</Text>
                    </Pressable>
                </View>

                <Pressable onPress={() => setTerms(prev => !prev)} style={styles.terms}>
                    <View style={[styles.termsCircle, terms && styles.termsChecked]}>
                        {terms && <Ionicons name="checkmark" size={12} color={colors.white} />}
                    </View>
                    <Text style={styles.termsText}>I accept the terms and privacy policy</Text>
                </Pressable>

                <ClientsButton leftIcon="help-circle-outline" text="Submit for Verification" onPress={() => navigation.navigate('Verification')} />
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
    upload: { gap: 2, marginTop: 10 },
    uploadText: {
        ...fonts.medium(),
        color: colors.grey1,
    },
    button: {
        gap: 8,
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.grey6,
    },
    buttonText: {
        ...fonts.medium(),
        color: colors.white,
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
        marginTop: 60,
        ...fonts.light(12),
        textAlign: 'center',
        color: colors.grey4,
    },
});

export default KYCScreen;
