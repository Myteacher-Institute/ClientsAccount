import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ClientsHeader = ({
    label,
    style,
    onPress,
    textStyle,
    iconSize = 22,
    showLeft = true,
    rightIcon = null,
    showRight = false,
    onRightPress = null,
    centerContent = null,
    leftIcon = 'arrow-back',
    iconColor = colors.black,
    backgroundColor = '#fff', // default white background
    navigation: navigationProp,
}) => {
    const navigation = useNavigation() || navigationProp;
    const handleLeftPress = () => (onPress ? onPress() : navigation.goBack());

    return (
        <View style={[styles.container, { backgroundColor }, style]}>
            {showLeft ? (
                <TouchableOpacity onPress={handleLeftPress} style={styles.iconButton}>
                    <Icon name={leftIcon} size={iconSize} color={iconColor} />
                </TouchableOpacity>
            ) : (
                <View style={styles.iconButton} />
            )}

            {centerContent ? (
                centerContent
            ) : (
                label && <Text style={[styles.text, styles.center, textStyle]}>{label}</Text>
            )}

            {showRight && rightIcon ? (
                <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                    <Icon name={rightIcon} size={iconSize} color={iconColor} />
                </TouchableOpacity>
            ) : (
                <View style={styles.iconButton} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        textAlign: 'center',
    },
    text: {
        color: colors.black,
        ...fonts.medium(18),
    },
});

export default ClientsHeader;
