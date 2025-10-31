import { useToast } from '@/hooks';
import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

const AccountDetails = () => {
    const toast = useToast();
    const { user } = useUser();
    const navigation = useNavigation();

    const handlePress = () => {
        if (user?.kyc) {
            Clipboard.setString(user?.wallet?.accountNumber ?? '');
            toast.showSuccess('Copied to clipboard!');
        } else { navigation.navigate('KYCScreen', { data: user }); }
    };

    return (
        <View style={[{ backgroundColor: (!user?.kyc ? colors.red4 : colors.white) }, styles.container]}>
            <View>
                {user?.kyc && <Text style={styles.account}>Account Details</Text>}
                {!user?.kyc && <Text style={styles.kyc}>Verification Alert</Text>}
                {user?.kyc && <Text style={styles.number}>{user?.wallet?.accountNumber}</Text>}
                {user?.kyc && <Text style={styles.name}>{user?.wallet?.accountName}</Text>}
                {user?.kyc && <Text style={styles.name}>{user?.wallet?.bankName}</Text>}
                {!user?.kyc && <Text style={[styles.account, { color: colors.white }]}>
                    {'Proceed to complete\nyour KYC to be verified.\nThank you!'}
                </Text>}
            </View>
            <ClientsButton
                iconSize={14}
                onPress={handlePress}
                text={user?.kyc ? 'Copy' : 'Verify'}
                bgColor={user?.kyc ? colors.grey9 : colors.white}
                textColor={user?.kyc ? colors.grey7 : colors.red4}
                leftIcon={user?.kyc ? 'copy' : 'shield-checkmark'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 16,
        marginBottom: 18,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    account: {
        color: colors.grey6,
        ...fonts.regular(12),
    },
    number: {
        marginTop: 5,
        marginBottom: -5,
        color: colors.grey5,
        ...fonts.medium(16),
    },
    name: {
        marginBottom: -5,
        color: colors.grey4,
        ...fonts.regular(12),
    },
    kyc: {
        marginBottom: 10,
        color: colors.white,
        ...fonts.medium(16),
    },
});

export default AccountDetails;
