import { useState } from 'react';
import { fonts, colors } from '@/theme';
import terms from '@/assets/texts/terms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsModal, ClientsButton, ClientsLayout } from '@/components';

const KYCScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleCheckboxPress = () => {
        termsAccepted ? setTermsAccepted(false) : setModalVisible(true);
    };

    const handleAcceptTerms = () => {
        setTermsAccepted(true);
        setModalVisible(false);
    };

    const uploadOptions = [
        { label: 'Upload Call to Bar Certificate (PDF)' },
        { label: 'Upload CAC Certificate (PDF, JPG, PNG)' },
        { label: 'Upload Recent Photo', isPhoto: true },
    ];

    return (
        <ClientsLayout title="KYC Verification">
            <View style={styles.section}>
                <View style={styles.header}>
                    <Ionicons name="briefcase" size={22} color={colors.yellow1} />
                    <Text style={styles.headerText}>Verify CAC Documents</Text>
                </View>

                <ClientsInput darkLabel="CAC Registration Number" placeholder="e.g. RC1234567" />

                {uploadOptions.map((item, index) => (
                    <View key={index} style={styles.upload}>
                        <Text style={styles.uploadText}>{item.label}</Text>
                        <Pressable style={styles.button}>
                            {item.isPhoto ?
                                <FontAwesome name="photo" size={15} color={colors.white} />
                                : <FontAwesome6 name="upload" size={15} color={colors.white} />}
                            <Text style={styles.buttonText}>Choose File</Text>
                        </Pressable>
                    </View>
                ))}

                <Pressable onPress={handleCheckboxPress} style={styles.terms}>
                    <View style={[styles.termsCircle, termsAccepted && styles.termsChecked]}>
                        {termsAccepted && <Ionicons name="checkmark" size={12} color={colors.white} />}
                    </View>
                    <Text style={styles.termsText}>I accept the terms and privacy policy</Text>
                </Pressable>

                <ClientsButton
                    leftIcon="help-circle-outline"
                    text="Submit for Verification"
                onPress={() => navigation.navigate('Verification')}
                />
            </View>

            <Text style={styles.footer}>© 2025 Clients Account. All rights reserved.</Text>

            <ClientsModal
                isLight
                scrollable
                mode="fullscreen"
                visible={modalVisible}
                title="Terms and Conditions"
                onClose={() => setModalVisible(false)}
                footer={<ClientsButton text="I Agree" onPress={handleAcceptTerms} />}
            >
                {terms.map((item, index) => (
                    item.type === 'section' ? (
                        <View key={index}>
                            <Text style={styles.modalSection}>{item.number}. {item.title}</Text>
                            {item.content.map((line, idx) => (
                                <Text key={idx} style={styles.modalText}>{line}</Text>
                            ))}
                        </View>
                    ) : <Text key={index} style={styles.modalText}>{item.text}</Text>
                ))}
            </ClientsModal>
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
    header: {
        gap: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: { ...fonts.medium(18), color: colors.grey3 },
    upload: { gap: 2, marginTop: 10 },
    uploadText: { ...fonts.medium(), color: colors.grey1 },
    button: {
        gap: 8,
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.grey6,
    },
    buttonText: { ...fonts.medium(), color: colors.white },
    terms: {
        gap: 6,
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    termsText: { ...fonts.italic(), color: colors.grey3 },
    termsCircle: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 10, borderColor: colors.grey2,
    },
    termsChecked: { borderColor: colors.yellow2, backgroundColor: colors.yellow2 },
    footer: {
        marginTop: 60,
        ...fonts.light(12),
        textAlign: 'center',
        color: colors.grey4,
    },
    modalSection: { ...fonts.bold(16), marginTop: 10 },
    modalText: { ...fonts.medium(), marginLeft: 15, marginTop: 2 },
});

export default KYCScreen;
