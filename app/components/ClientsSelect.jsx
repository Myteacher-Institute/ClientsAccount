import { fonts, colors } from '@/theme';
import { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, Modal, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ClientsSelect = ({
    label,
    value,
    onSelect,
    darkLabel,
    extraStyle,
    options = [],
    darkMode = false,
}) => {
    const boxRef = useRef();
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(options[0]);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

    const selected = value ?? internalValue;
    const themed = (light, dark) => (darkMode ? dark : light);
    const displayLabel = typeof darkLabel === 'string' ? darkLabel : label;

    const handleSelect = (opt) => {
        onSelect?.(opt);
        if (value === undefined) { setInternalValue(opt); }
        setOpen(false);
    };

    const openDropdown = () => {
        boxRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownPos({ top: y + height + 3, left: x, width });
            setOpen(true);
        });
    };

    return (
        <View>
            {displayLabel && (
                <Text style={[styles.label, { color: darkLabel ? colors.grey1 : colors.white }]}>
                    {displayLabel}
                </Text>
            )}

            <Pressable
                ref={boxRef}
                onPress={openDropdown}
                style={[
                    {
                        backgroundColor: themed(colors.offWhite0, colors.black),
                        borderColor: themed(colors.grey2, colors.grey7),
                    },
                    styles.inputContainer,
                    extraStyle,
                ]}
            >
                <Text style={[styles.text, { color: themed(colors.grey2, colors.white) }]}>
                    {selected}
                </Text>
                <Icon name="chevron-down" size={18} color={themed(colors.grey2, colors.white)} />
            </Pressable>

            {open && (
                <Modal transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                        <View style={StyleSheet.absoluteFill}>
                            <View
                                style={[
                                    dropdownPos,
                                    styles.dropdown,
                                    { backgroundColor: themed(colors.offWhite0, colors.black) },
                                ]}
                            >
                                {options.slice(1).map((opt, i) => (
                                    <Pressable key={i} onPress={() => handleSelect(opt)} style={styles.option}>
                                        <Text style={{ color: themed(colors.grey4, colors.white), ...fonts.regular(14) }}>
                                            {opt}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: 2,
        ...fonts.medium(),
    },
    inputContainer: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    text: {
        flex: 1,
        ...fonts.regular(16),
    },
    dropdown: {
        zIndex: 999,
        elevation: 4,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'absolute',
    },
    option: { padding: 14 },
});

export default ClientsSelect;
