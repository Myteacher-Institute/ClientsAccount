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
    currency: { type: 'money', options: { unit: '₦', precision: 2, separator: '.', delimiter: ',', suffixUnit: '' } },
};

const ClientsInput = ({
    label,
    value,
    leftIcon,
    rightIcon,
    darkLabel,
    isPassword,
    placeholder,
    onChangeText,
    type = 'default',
    darkMode = false,
    extraContainerStyle,
    iconPosition = 'left',
    ...props
}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(isPassword || false);

    const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);
    const renderNamedIcon = name => name ? <Icon name={name} size={20} color={colors.grey2} /> : null;

    const maskConfig = maskTypeMap[type];
    const isMasked = !!maskConfig;

    const resolvedLabel = darkLabel || label;
    const inputBackground = darkMode ? colors.black : colors.offWhite1;
    const labelColor = { ...fonts.medium(), marginBottom: 2, color: darkLabel ? colors.grey1 : colors.white };

    return (
        <View style={extraContainerStyle}>
            {resolvedLabel && <Text style={labelColor}>{resolvedLabel}</Text>}

            <View style={[styles.inputContainer, { backgroundColor: inputBackground }]}>
                {iconPosition === 'left' && renderNamedIcon(leftIcon)}

                {isMasked ? (
                    <TextInputMask
                        {...props}
                        value={value}
                        style={styles.input}
                        type={maskConfig.type}
                        keyboardType="numeric"
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        options={maskConfig.options}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={colors.grey2}
                    />
                ) : (
                    <TextInput
                        {...props}
                        value={value}
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={colors.grey2}
                        textContentType={props.textContentType}
                        autoCorrect={props.autoCorrect ?? false}
                        autoCapitalize={props.autoCapitalize || 'none'}
                        keyboardType={keyboardTypeMap[type] || 'default'}
                    />
                )}

                {(isPassword || iconPosition === 'right') &&
                    (isPassword ? (
                        <Pressable onPress={toggleSecureEntry}>
                            <Icon size={20} color={colors.grey2} name={secureTextEntry ? 'eye-off' : 'eye'} />
                        </Pressable>
                    ) : renderNamedIcon(rightIcon))}
            </View>
        </View>
    );
};

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
        color: colors.grey2,
        paddingVertical: 12,
        ...fonts.regular(16),
    },
});

export default ClientsInput;
