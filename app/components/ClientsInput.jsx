import { fonts, colors } from '@/theme';
import { useState, forwardRef } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const keyboardTypeMap = {
    url: 'url',
    number: 'numeric',
    phone: 'phone-pad',
    default: 'default',
    email: 'email-address',
    decimal: 'decimal-pad',
};

const maskTypeMap = {
    cpf: { type: 'cpf', options: {} },
    scn: { type: 'custom', options: { mask: 'AAA/9999' } },
    cac: { type: 'custom', options: { mask: 'BN/999999' } },
    nin: { type: 'custom', options: { mask: '99999999999' } },
    phone: { type: 'cel-phone', options: { withDDD: true, dddMask: '(999) ' } },
    currency: { type: 'money', options: { unit: '₦', precision: 2, separator: '.', delimiter: ',', suffixUnit: '' } },
};

const ClientsInput = forwardRef(({
    label,
    value,
    leftIcon,
    rightIcon,
    darkLabel,
    extraStyle,
    isPassword,
    placeholder,
    onChangeText,
    type = 'default',
    darkMode = false,
    onRightIconPress,
    iconColor = colors.grey2,
    IconComponent = Ionicons,
    ...props
}, ref) => {
    const [secure, setSecure] = useState(!!isPassword);

    const isMasked = !!maskTypeMap[type];
    const maskConfig = maskTypeMap[type];
    const inputBg = darkMode ? colors.black : colors.offWhite1;
    const labelColor = darkLabel ? colors.grey1 : colors.white;
    const InputComponent = isMasked ? TextInputMask : TextInput;
    const displayLabel = typeof darkLabel === 'string' ? darkLabel : label;

    const renderIcon = name => name && <IconComponent name={name} size={20} color={iconColor} />;
    const renderRightIcon = () =>
        isPassword ? (
            <Pressable onPress={() => setSecure(!secure)}>
                <IconComponent name={secure ? 'eye-off' : 'eye'} size={20} color={iconColor} />
            </Pressable>
        ) : rightIcon ? (
            onRightIconPress ? (
                <Pressable onPress={onRightIconPress}>{renderIcon(rightIcon)}</Pressable>
            ) : renderIcon(rightIcon)
        ) : null;

    return (
        <View>
            {displayLabel && <Text style={[styles.label, { color: labelColor }]}>{displayLabel}</Text>}
            <View style={[styles.inputContainer, { backgroundColor: inputBg }, extraStyle]}>
                {renderIcon(leftIcon)}
                <InputComponent
                    ref={ref}
                    {...props}
                    value={value}
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    placeholderTextColor={colors.grey2}
                    autoCorrect={props.autoCorrect ?? false}
                    autoCapitalize={props.autoCapitalize || 'none'}
                    keyboardType={isMasked ? 'numeric' : keyboardTypeMap[type]}
                    {...(isMasked ? { type: maskConfig?.type, options: maskConfig?.options } : { secureTextEntry: secure })}
                />
                {renderRightIcon()}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderColor: colors.grey2,
    },
    input: {
        flex: 1,
        height: 50,
        paddingVertical: 12,
        color: colors.grey2,
        ...fonts.regular(16),
    },
    label: {
        marginBottom: 2,
        ...fonts.medium(),
    },
});

export default ClientsInput;
