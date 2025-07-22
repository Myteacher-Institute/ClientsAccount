import { fonts, colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';

const ClientsButton = ({
    text,
    space,
    bgColor,
    onPress,
    leftIcon,
    rightIcon,
    textColor,
    textStyle,
    extraStyle,
    iconSize = 20,
    isLight = false,
    loading = false,
    outline = false,
    rounded = false,
    IconComponent = Ionicons,
    ...rest
}) => {
    const finalBgColor = bgColor ?? (isLight ? colors.white : colors.black);
    const finalTextColor = textColor ?? (isLight ? colors.black : colors.white);
    const marginStyles = {
        marginTop: typeof space === 'number' ? space : space?.top || 0,
        marginBottom: typeof space === 'object' ? space?.bottom || 0 : 0,
    };

    const containerStyle = [
        {
            backgroundColor: outline ? 'transparent' : finalBgColor,
            borderColor: outline ? finalTextColor : 'transparent',
            borderRadius: rounded ? 50 : 8,
            borderWidth: outline ? 1 : 0,
        },
        styles.container,
        marginStyles,
        extraStyle,
    ];

    const renderIcon = iconName => iconName ? <IconComponent name={iconName} size={iconSize} color={finalTextColor} /> : null;

    return (
        <Pressable
            {...rest}
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => [containerStyle, { opacity: loading ? 1 : pressed ? 0.85 : 1 }]}
        >
            {loading ? (
                <ActivityIndicator size="small" color={finalTextColor} />
            ) : (
                <View style={styles.content}>
                    {leftIcon && renderIcon(leftIcon)}
                    <Text style={[fonts.medium(16), { color: finalTextColor }, textStyle]}>{text}</Text>
                    {rightIcon && renderIcon(rightIcon)}
                </View>
            )}
        </Pressable>
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
