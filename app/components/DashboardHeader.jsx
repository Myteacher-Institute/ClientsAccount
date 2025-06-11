import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const DashboardHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.name}>Hi, Charles</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('KYCScreen')}>
                <Icon name="notifications" size={20} color={colors.black} />
            </TouchableOpacity>
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
    },
    name: {
        color: colors.grey5,
        ...fonts.medium(18),
    },
});

export default DashboardHeader;
