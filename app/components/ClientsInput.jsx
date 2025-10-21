import { fonts, colors } from '@/theme';
import { useState, forwardRef } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';

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
  cac: { type: 'custom', options: { mask: 'BN/999999' } },
  scn: { type: 'custom', options: { mask: '9999999999' } },
  nin: { type: 'custom', options: { mask: '99999999999' } },
  currency: {
    type: 'money',
    options: {
      unit: '₦',
      precision: 2,
      separator: '.',
      delimiter: ',',
      suffixUnit: '',
    },
  },
};

const getAutoCapitalize = (type, userDefined) => {
  if (userDefined !== undefined) {
    return userDefined;
  }
  return ['email', 'password', 'nin', 'scn', 'cac'].includes(type) ? 'none' : 'words';
};

const ClientsInput = forwardRef(
  (
    {
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
    },
    ref,
  ) => {
    const [secure, setSecure] = useState(!!isPassword);

    const mask = maskTypeMap[type];
    const masked = !!maskTypeMap[type];
    const Input = masked ? TextInputMask : TextInput;
    const labelColor = darkLabel ? colors.grey1 : colors.white;
    const inputBg = darkMode ? colors.black : colors.offWhite0;
    const displayLabel = typeof darkLabel === 'string' ? darkLabel : label;
    const icon = (name) => name && <IconComponent name={name} size={20} color={iconColor} />;

    const right = isPassword ? (
      <Pressable onPress={() => setSecure(!secure)}>
        <IconComponent name={secure ? 'eye-off' : 'eye'} size={20} color={iconColor} />
      </Pressable>
    ) : rightIcon ? (
      onRightIconPress ? <Pressable onPress={onRightIconPress}>{icon(rightIcon)}</Pressable> : icon(rightIcon)
    ) : null;

    return (
      <View style={styles.container}>
        {displayLabel && <Text style={[styles.label, { color: labelColor }]}>{displayLabel}</Text>}
        <View style={[styles.inputContainer, { backgroundColor: inputBg }, extraStyle]}>
          {icon(leftIcon)}
          <Input
            ref={ref}
            {...props}
            value={value}
            placeholder={placeholder}
            multiline={props.multiline}
            onChangeText={onChangeText}
            placeholderTextColor={colors.grey2}
            autoCorrect={props.autoCorrect ?? false}
            textAlignVertical={props.multiline ? 'top' : 'center'} 
            keyboardType={masked ? 'numeric' : keyboardTypeMap[type]}
            style={[styles.input, props.multiline && styles.multiline]}
            autoCapitalize={getAutoCapitalize(type, props.autoCapitalize)}
            numberOfLines={props.numberOfLines ?? (props.multiline ? 6 : 1)}
            {...(masked ? { type: mask.type, options: mask.options } : { secureTextEntry: secure })}
          />
          {right}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  multiline: {
    height: 110,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
  label: {
    marginBottom: 2,
    ...fonts.medium(),
  },
});

export default ClientsInput;
