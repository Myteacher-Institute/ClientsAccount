import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import Icon from 'react-native-vector-icons/FontAwesome6';


const AccountBalance = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.account}>Account Balance</Text>
                <Text style={styles.money}>N8,250.00</Text>
                <Icon name="scale-balanced" size={60} color={colors.grey1} style={styles.scale} />
            </View>
            <View style={styles.button}>
                <ClientsButton rounded isLight text="Top Up" iconSize={15} IconComponent={Icon} leftIcon="arrow-up-from-bracket" />
                <ClientsButton rounded outline text="Withdraw" iconSize={15} IconComponent={Icon} leftIcon="arrow-down" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        backgroundColor: colors.black,
    },
    account: {
        ...fonts.regular(),
        color: colors.white,
    },
    money: {
        marginTop: -10,
        color: colors.white,
        ...fonts.semiBold(30),
    },
    scale: {
        right: 0,
        position: 'absolute',
    },
    button: {
        gap: 15,
        width: '100%',
        flexDirection: 'row',
    },
});

export default AccountBalance;
