import { fonts, colors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';

const DashboardHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable style={styles.profile} onPress={() => navigation.navigate('Account')}>
                <Image source={require('@/assets/images/profile.png')} style={styles.profileImg} />
                <Text style={styles.profileName}>Hi, Charles</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('KYCScreen')}>
                <Icon name="bell-badge-outline" size={24} color={colors.black} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    },
    profile: {
        gap: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    profileImg: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderRadius: 50,
        resizeMode: 'cover',
        borderColor: colors.blue2,
    },
    profileName: {
        color: colors.grey5,
        ...fonts.medium(18),
    },
});

export default DashboardHeader;
