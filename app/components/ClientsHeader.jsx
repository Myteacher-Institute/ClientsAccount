import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable, StyleSheet } from 'react-native';

const ClientsHeader = ({ title, rightIcon, onBackPress, onRightPress, backgroundColor }) => {
    const navigation = useNavigation();

    const handleBack = () => onBackPress ? onBackPress() : navigation.goBack();

    const isDark = backgroundColor === colors.black;
    const textColor = isDark ? colors.white : colors.black;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Pressable onPress={handleBack}>
                <Icon name="arrow-back" size={20} color={textColor} />
            </Pressable>

            <Text style={[styles.title, { color: textColor }]}>{title ?? ''}</Text>

            {rightIcon && (
                <Pressable onPress={onRightPress}>
                    <Icon name={rightIcon} size={20} color={textColor} />
                </Pressable>
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
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        ...fonts.medium(18),
    },
});

export default ClientsHeader;
