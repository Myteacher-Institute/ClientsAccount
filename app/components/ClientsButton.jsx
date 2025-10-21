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
    iconSize = 18,
    isLight = false,
    loading = false,
    outline = false,
    rounded = false,
    IconComponent = Ionicons,
    ...rest
}) => {
    const finalBg = bgColor ?? (isLight ? colors.white : colors.black);
    const finalText = textColor ?? (isLight ? colors.black : colors.white);
    const margin = {
        marginTop: typeof space === 'number' ? space : space?.top || 0,
        marginBottom: typeof space === 'object' ? space?.bottom || 0 : 0,
    };

    const containerStyle = [
        {
            backgroundColor: outline ? 'transparent' : finalBg,
            borderColor: outline ? finalText : 'transparent',
            borderRadius: rounded ? 50 : 8,
            borderWidth: outline ? 1 : 0,
        },
        styles.container,
        extraStyle,
        margin,
    ];

    const icon = (name) => name ? <IconComponent name={name} size={iconSize} color={finalText} /> : null;

    return (
        <Pressable
            {...rest}
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => [containerStyle, { opacity: loading ? 1 : pressed ? 0.85 : 1 }]}
        >
            {loading ? (
                <ActivityIndicator size="small" color={finalText} />
            ) : (
                <View style={styles.content}>
                    {icon(leftIcon)}
                    <Text style={[fonts.medium(16), { color: finalText }, textStyle]}>{text}</Text>
                    {icon(rightIcon)}
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
