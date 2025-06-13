import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';

const transactions = [
    { status: colors.green2, icon: 'arrow-up', type: 'Top Up', amount: '+ N2,000', date: 'May 27, 2025', bgColor: colors.blue6, iconColor: colors.blue7 },
    { status: colors.red3, icon: 'arrow-down', type: 'Withdraw', amount: '- N500', date: 'May 24, 2025', bgColor: colors.green3, iconColor: colors.green4 },
    { status: colors.green2, icon: 'briefcase', type: 'Client Funds', amount: '+ N1,250', date: 'May 20, 2025', bgColor: colors.purple1, iconColor: colors.purple2 },
];

const RecentTransactions = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerRecent}>Recent Transactions</Text>
                <Text style={styles.headerLink}>See All</Text>
            </View>
            <View>
                {transactions.map(({ date, icon, type, amount, status, bgColor, iconColor }) => (
                    <View key={icon} style={[styles.header, styles.recent]}>
                        <View style={styles.header}>
                            <View style={[styles.icon, { backgroundColor: bgColor }]}>
                                <Icon name={icon} size={15} color={iconColor} />
                            </View>
                            <View>
                                <Text style={styles.type}>{type}</Text>
                                <Text style={styles.date}>{date}</Text>
                            </View>
                        </View>
                        <Text style={[styles.money, { color: status }]}>{amount}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerRecent: {
        color: colors.grey5,
        ...fonts.medium(16),
    },
    headerLink: {
        color: colors.blue5,
        ...fonts.medium(12),
    },
    recent: { paddingVertical: 12 },
    border: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBlockColor: colors.grey9,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    type: {
        marginLeft: 10,
        marginBottom: -5,
        ...fonts.regular(),
        color: colors.grey1,
    },
    date: {
        marginLeft: 10,
        ...fonts.regular(12),
        color: colors.grey4,
    },
    money: { ...fonts.medium() },
});

export default RecentTransactions;
