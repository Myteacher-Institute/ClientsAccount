import { useState } from 'react';
import { fonts, colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    extraStyle,
    isPassword,
    placeholder,
    onChangeText,
    type = 'default',
    darkMode = false,
    iconColor = colors.grey2,
    IconComponent = Ionicons,
    ...props
}) => {
    const [secureEntry, setSecureEntry] = useState(isPassword || false);

    const maskConfig = maskTypeMap[type];
    const isMasked = !!maskConfig;
    const resolvedLabel = darkLabel || label;
    const toggleSecureEntry = () => setSecureEntry(!secureEntry);
    const inputBackground = darkMode ? colors.black : colors.offWhite1;
    const renderIcon = iconName => iconName && <IconComponent name={iconName} size={20} color={iconColor} />;
    const labelStyle = { marginBottom: 2, ...fonts.medium(), color: darkLabel ? colors.grey1 : colors.white };

    return (
        <View>
            {resolvedLabel && <Text style={labelStyle}>{resolvedLabel}</Text>}

            <View style={[styles.inputContainer, { backgroundColor: inputBackground }, extraStyle]}>
                {renderIcon(leftIcon)}

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
                        secureTextEntry={secureEntry}
                        placeholderTextColor={colors.grey2}
                    />
                ) : (
                    <TextInput
                        {...props}
                        value={value}
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        secureTextEntry={secureEntry}
                        placeholderTextColor={colors.grey2}
                        textContentType={props.textContentType}
                        autoCorrect={props.autoCorrect ?? false}
                        autoCapitalize={props.autoCapitalize || 'none'}
                        keyboardType={keyboardTypeMap[type] || 'default'}
                    />
                )}

                {isPassword ? (
                    <Pressable onPress={toggleSecureEntry}>
                        <IconComponent size={20} color={iconColor} name={secureEntry ? 'eye-off' : 'eye'} />
                    </Pressable>
                ) : renderIcon(rightIcon)}
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
        paddingVertical: 12,
        color: colors.grey2,
        ...fonts.regular(16),
    },
});

export default ClientsInput;
