import { fonts, colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const ClientsButton = ({
    text,
    space,
    onPress,
    bgColor,
    leftIcon,
    rightIcon,
    extraStyle,
    textColor,
    iconSize = 20,
    extraTextStyle,
    isLight = false,
    rounded = false,
    outline = false,
    loading = false,
    IconComponent = Ionicons,
    ...rest
}) => {
    const finalBgColor = bgColor ?? (isLight ? colors.white : colors.black);
    const finalTextColor = textColor ?? (isLight ? colors.black : colors.white);

    const containerStyle = [
        {
            marginTop: space || 0,
            borderWidth: outline ? 1 : 0,
            borderRadius: rounded ? 50 : 8,
            borderColor: outline ? finalTextColor : 'transparent',
            backgroundColor: outline ? 'transparent' : finalBgColor,
        },
        styles.container,
        extraStyle,
    ];

    const renderIcon = (iconName) => iconName ? <IconComponent name={iconName} size={iconSize} color={finalTextColor} /> : null;

    return (
        <TouchableOpacity
            {...rest}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
            style={containerStyle}
        >
            {loading ? (
                <ActivityIndicator size="small" color={finalTextColor} />
            ) : (
                <View style={styles.content}>
                    {leftIcon && renderIcon(leftIcon)}
                    <Text style={[fonts.medium(16), { color: finalTextColor }, extraTextStyle]}>{text}</Text>
                    {rightIcon && renderIcon(rightIcon)}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    content: {
        gap: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default ClientsButton;
