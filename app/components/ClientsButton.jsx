import { fonts, colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const ClientsButton = ({
    text,
    space,
    onPress,
    leftIcon,
    leftText,
    rightIcon,
    rightText,
    extraStyle,
    iconSize = 20,
    extraTextStyle,
    rounded = false,
    outline = false,
    loading = false,
    fitContent = false,
    iconType = 'ionicon',
    bgColor = colors.black,
    textColor = colors.white,
    ...rest
}) => {
    const containerStyle = [
        {
            borderWidth: outline ? 1 : 0,
            borderRadius: rounded ? 50 : 8,
            ...(space ? { marginTop: space } : {}),
            alignSelf: fitContent ? 'flex-start' : 'stretch',
            borderColor: outline ? textColor : 'transparent',
            backgroundColor: outline ? 'transparent' : bgColor,
        },
        styles.container,
        extraStyle,
    ];

    const renderIcon = (icon, position) => {
        if (!icon) { return null; }
        const iconStyle = { position: 'absolute', [position]: 15 };
        return iconType === 'image'
            ? <Image source={icon} style={[styles.iconImage, iconStyle]} />
            : <Ionicons name={icon} size={iconSize} color={textColor} style={iconStyle} />;
    };

    return (
        <TouchableOpacity
            {...rest}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
            style={containerStyle}
        >
            {loading ? (
                <ActivityIndicator size="small" color={textColor} />
            ) : leftText && rightText ? (
                <View style={styles.dualText}>
                    <Text style={[{ ...fonts.medium(16) }, { color: textColor }, extraTextStyle]}>{leftText}</Text>
                    <Text style={[{ ...fonts.medium(16) }, { color: textColor }, extraTextStyle]}>{rightText}</Text>
                </View>
            ) : (
                <View style={styles.inner}>
                    {renderIcon(leftIcon, 'left')}
                    <Text style={[{ ...fonts.medium(16) }, { color: textColor }, extraTextStyle]}>{text}</Text>
                    {renderIcon(rightIcon, 'right')}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        padding: 12,
        justifyContent: 'center',
    },
    inner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dualText: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

export default ClientsButton;
