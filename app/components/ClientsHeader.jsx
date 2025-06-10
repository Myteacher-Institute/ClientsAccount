import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ClientsHeader = ({
    title,
    rightIcon,
    onBackPress,
    onRightPress,
}) => {
    const navigation = useNavigation();

    const handleBack = () => onBackPress ? onBackPress() : navigation.goBack();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack}>
                <Icon name="arrow-back" size={20} color={colors.black} />
            </TouchableOpacity>

            <Text style={styles.title}>{title ?? ''}</Text>

            {rightIcon && (
                <TouchableOpacity onPress={onRightPress}>
                    <Icon name={rightIcon} size={20} color={colors.black} />
                </TouchableOpacity>
            )}
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
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    },
    title: {
        flex: 1,
        color: colors.grey3,
        textAlign: 'center',
        ...fonts.medium(18),
    },
});

export default ClientsHeader;
