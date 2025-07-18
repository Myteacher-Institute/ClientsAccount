import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const AccountBalance = () => {
    const { user } = useUser();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.account}>Account Balance</Text>
                <Text style={styles.money}>₦{user?.wallet?.accountBalance}</Text>
                <Icon name="scale-balanced" size={60} color={colors.grey1} style={styles.scale} />
            </View>
            <View style={styles.button}>
                <ClientsButton rounded isLight text="Top Up" iconSize={15} IconComponent={Icon} leftIcon="arrow-up-from-bracket" onPress={() => navigation.navigate('TopUpScreen')} />
                <ClientsButton rounded outline text="Withdraw" iconSize={15} IconComponent={Icon} leftIcon="arrow-down" onPress={() => navigation.navigate('WithdrawFunds')} />
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
