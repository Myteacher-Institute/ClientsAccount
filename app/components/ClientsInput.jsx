import { useState } from 'react';
import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from 'react-native-masked-text';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';

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
    currency: { type: 'money', options: { precision: 2, separator: '.', delimiter: ',', unit: '₦', suffixUnit: '' } },
};

const ClientsInput = ({
    label,
    value,
    leftIcon,
    rightIcon,
    isPassword,
    placeholder,
    onChangeText,
    extraTextStyle,
    type = 'default',
    extraContainerStyle,
    iconPosition = 'left',
    ...props
}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(isPassword || false);

    const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);
    const maskConfig = maskTypeMap[type];
    const isMasked = !!maskConfig;

    const renderLeftIcon = () => {
        if (!leftIcon || isPassword) { return null; }
        return <View style={styles.iconContainer}>{leftIcon}</View>;
    };

    const renderRightIcon = () => {
        if (isPassword) {
            return (
                <Pressable style={styles.iconContainer} onPress={toggleSecureEntry}>
                    <Icon size={20} color={colors.grey2} name={secureTextEntry ? 'eye-off' : 'eye'} />
                </Pressable>
            );
        }
        if (rightIcon && !isPassword) {
            return <View style={styles.iconContainer}>{rightIcon}</View>;
        }
        return null;
    };

    return (
        <View style={extraContainerStyle}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                {iconPosition === 'left' && renderLeftIcon()}

                {isMasked ? (
                    <TextInputMask
                        {...props}
                        value={value}
                        type={maskConfig.type}
                        keyboardType="numeric"
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        options={maskConfig.options}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={colors.grey2}
                        style={[styles.input, extraTextStyle]}
                    />
                ) : (
                    <TextInput
                        {...props}
                        value={value}
                        placeholder={placeholder}
                        cursorColor={colors.grey2}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={colors.grey2}
                        style={[styles.input, extraTextStyle]}
                        textContentType={props.textContentType}
                        autoCorrect={props.autoCorrect ?? false}
                        autoCapitalize={props.autoCapitalize || 'none'}
                        keyboardType={keyboardTypeMap[type] || 'default'}
                    />
                )}

                {iconPosition === 'right' || isPassword ? renderRightIcon() : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        ...fonts.medium(),
        color: colors.grey1,
    },
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
        color: colors.grey2,
        paddingVertical: 12,
        ...fonts.regular(16),
    },
    iconContainer: {
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ClientsInput;
