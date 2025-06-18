import { fonts, colors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const infos = [
    {
        status: 'Filled',
        color: colors.purple3,
        bgColor: colors.purple1,
        icon: 'account-outline',
        screen: 'PersonalInfoScreen',
        title: 'Personal Information',
        content: 'Name, contact & firm details',
    },
    {
        status: 'Verified',
        color: colors.green4,
        bgColor: colors.green3,
        icon: 'progress-question',
        title: 'Verification Status',
        screen: 'VerificationScreen',
        content: 'Bar number & Documents',
    },
    {
        status: 'Active',
        color: colors.blue4,
        bgColor: colors.blue6,
        screen: 'WalletScreen',
        title: 'Wallet & Accounts',
        icon: 'folder-account-outline',
        content: 'Balance & linked bank',
    },
    {
        status: 'Secured',
        color: colors.grey1,
        icon: 'lock-outline',
        bgColor: colors.grey8,
        screen: 'SecurityScreen',
        title: 'Password & Security',
        content: 'Change password, 2FA',
    },
    {
        status: 'Linked',
        icon: 'link-variant',
        color: colors.green6,
        bgColor: colors.green5,
        title: 'Linked Accounts',
        screen: 'LinkedAccountsScreen',
        content: 'Google, Apple, Others',
    },
    {
        color: colors.brown3,
        icon: 'bell-outline',
        title: 'Notifications',
        screen: 'NotificationsScreen',
        content: 'Email & Push notifications',
    },
    {
        color: colors.purple4,
        title: 'Help & Support',
        screen: 'SupportCenter',
        icon: 'help-circle-outline',
        content: 'FAQs, Contact support',
    },
    {
        title: 'About App',
        color: colors.grey4,
        icon: 'alert-circle',
        screen: 'AboutScreen',
        content: 'Version & Legal',
    },
];

const AccountInfo = () => {
    const navigation = useNavigation();
    const groups = [infos.slice(0, 5), infos.slice(5)];

    return (
        <>
            {groups.map((group, idx) => (
                <View key={idx} style={styles.container}>
                    {group.map((item, index) => {
                        const isLast = index === group.length - 1;
                        return (
                            <TouchableOpacity
                                key={item.title}
                                style={[styles.info, !isLast && styles.border]}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate(item.screen)}
                            >
                                <View style={[styles.info, styles.mark]}>
                                    <Icon name={item.icon} size={20} color={item.color} />
                                    <View>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.content}>{item.content}</Text>
                                    </View>
                                </View>

                                <View style={[styles.info, styles.mark]}>
                                    {item.status && (
                                        <Text
                                            style={[
                                                styles.status,
                                                { color: item.color, backgroundColor: item.bgColor },
                                            ]}
                                        >
                                            {item.status}
                                        </Text>
                                    )}
                                    <Icon name="chevron-right" size={20} color={colors.grey4} />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        marginBottom: 25,
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.10), 0px 1px 3px rgba(0, 0, 0, 0.10)',
    },
    info: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    border: {
        borderBottomWidth: 1,
        borderColor: colors.grey10,
    },
    title: {
        color: colors.grey3,
        ...fonts.regular(16),
    },
    content: {
        marginTop: -5,
        ...fonts.light(12),
        color: colors.grey6,
    },
    mark: {
        gap: 10,
        padding: 0,
    },
    status: {
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 8,
        ...fonts.regular(12),
    },
});

export default AccountInfo;
