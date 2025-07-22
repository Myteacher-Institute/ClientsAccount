import { useToast } from '@/hooks';
import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Clipboard from '@react-native-clipboard/clipboard';

const AccountDetails = () => {
    const toast = useToast();
    const { user } = useUser();

    const handleCopy = () => {
        Clipboard.setString(user?.wallet?.accountNumber ?? '');
        toast.showSuccess('Copied to clipboard!');
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.account}>Account Details</Text>
                <Text style={styles.number}>{user?.wallet?.accountNumber}</Text>
                <Text style={styles.name}>{user?.wallet?.accountName}</Text>
                <Text style={styles.name}>{user?.wallet?.bankName}</Text>
            </View>
            <ClientsButton text="Copy" iconSize={15} bgColor={colors.grey9} textColor={colors.grey7} IconComponent={Icon} leftIcon="copy" onPress={handleCopy} />
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
        backgroundColor: colors.white,
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
});

export default AccountDetails;
