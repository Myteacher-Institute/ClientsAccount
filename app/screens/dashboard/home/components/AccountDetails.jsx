import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import Icon from 'react-native-vector-icons/FontAwesome6';


const AccountDetails = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.account}>Account Number</Text>
                <Text style={styles.number}>0123 4567 8910</Text>
                <Text style={styles.name}>John Doe & Sons Chamber</Text>
                <Text style={styles.name}>Wema Bank</Text>
            </View>
            <ClientsButton text="Copy" iconSize={15} bgColor={colors.grey9} textColor={colors.grey7} IconComponent={Icon} leftIcon="copy" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 16,
        marginBottom: 20,
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
        color: colors.grey5,
        ...fonts.medium(16),
    },
    name: {
        ...fonts.regular(12),
        color: colors.grey4,
    },
});

export default AccountDetails;
