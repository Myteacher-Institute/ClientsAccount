import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, View, Image, StyleSheet } from 'react-native';

const AccountProfile = () => {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/profile.png')} style={styles.profileImg} />
            <View style={styles.info}>
                <Text style={styles.name}>{user?.fullName}</Text>
                <Text numberOfLines={1} style={styles.title}>{user?.chamberName}</Text>
            </View>
            <View style={styles.button}>
                <View style={[styles.pill, styles.button, { backgroundColor: colors.green5 }]}>
                    <Icon name="circle-check" size={12} color={colors.green4} />
                    <Text style={[styles.pillText, { color: colors.green4 }]}>Verified Lawyer</Text>
                </View>
                <View style={[styles.pill, styles.button, { backgroundColor: colors.blue8 }]}>
                    <Icon name="wallet" size={12} color={colors.blue4} />
                    <Text style={[styles.pillText, { color: colors.blue4 }]}>Active Wallet</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 24,
        borderRadius: 16,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    profileImg: {
        width: 80,
        height: 80,
        borderWidth: 4,
        borderRadius: 50,
        resizeMode: 'cover',
        borderColor: colors.blue3,
    },
    info: {
        alignItems: 'center',
    },
    name: {
        color: colors.grey3,
        ...fonts.semiBold(20),
    },
    title: {
        ...fonts.regular(),
        color: colors.grey6,
    },
    button: {
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    pill: {
        gap: 4,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    pillText: {
        color: colors.grey6,
        ...fonts.regular(12),
    },
});

export default AccountProfile;
