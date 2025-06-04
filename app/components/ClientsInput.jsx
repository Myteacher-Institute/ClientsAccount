import { useState } from 'react';
import { fonts, colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';

const keyboardTypeMap = {
    number: 'numeric',
    default: 'default',
    email: 'email-address',
};

const ClientsInput = ({
    label,
    value,
    isPassword,
    placeholder,
    onChangeText,
    extraTextStyle,
    extraContainerStyle,
    inputType = 'default',
    ...props
}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(isPassword || false);

    const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

    return (
        <View style={extraContainerStyle}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    {...props}
                    value={value}
                    placeholder={placeholder}
                    cursorColor={colors.white}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={colors.grey3}
                    style={[styles.input, extraTextStyle]}
                    keyboardType={keyboardTypeMap[inputType] || 'default'}
                />

                {isPassword && (
                    <Pressable style={styles.iconContainer} onPress={toggleSecureEntry}>
                        <Ionicons size={20} color={colors.white} name={secureTextEntry ? 'eye-off' : 'eye'} />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: 10,
        ...fonts.light(15),
        color: colors.white,
    },
    inputContainer: {
        gap: 10,
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        backgroundColor: colors.grey2,
    },
    input: {
        flex: 1,
        height: 50,
        color: colors.white,
        paddingVertical: 12,
        ...fonts.regular(16),
    },
    iconContainer: {
        padding: 10,
    },
});

export default ClientsInput;
