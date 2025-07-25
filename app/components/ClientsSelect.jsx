import { fonts, colors } from '@/theme';
import { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, Modal, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ClientsSelect = ({ darkMode, label, value, onSelect, options = [] }) => {
    const boxRef = useRef();
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(options[0]);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

    const selected = value ?? internalValue;
    const themed = (light, dark) => (darkMode ? dark : light);

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
            {label && <Text style={[styles.label, themed(null, styles.labelDark)]}>{label}</Text>}

            <Pressable
                ref={boxRef}
                onPress={openDropdown}
                style={[styles.box, themed(null, styles.boxDark)]}
            >
                <Text style={[styles.text, themed(null, styles.textDark)]}>{selected}</Text>
                <Icon name="chevron-down" size={18} color={themed(colors.grey9, colors.white)} />
            </Pressable>

            {open && (
                <Modal transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                        <View style={StyleSheet.absoluteFill}>
                            <View
                                style={[
                                    dropdownPos,
                                    styles.dropdown,
                                    themed(null, styles.dropdownDark),
                                ]}
                            >
                                {options.slice(1).map((opt, i) => (
                                    <Pressable key={i} onPress={() => handleSelect(opt)} style={styles.option}>
                                        <Text style={[styles.optionText, themed(null, styles.optionTextDark)]}>
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
    label: { marginBottom: 4, ...fonts.medium() },
    labelDark: { color: colors.white },
    box: {
        padding: 14,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: colors.grey3,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
    boxDark: { backgroundColor: colors.grey1, borderColor: colors.grey7 },
    text: { ...fonts.regular(14), color: colors.grey2 },
    textDark: { color: colors.white },
    dropdown: {
        zIndex: 999,
        elevation: 4,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'absolute',
        backgroundColor: colors.white,
    },
    dropdownDark: { backgroundColor: colors.grey1 },
    option: { padding: 14 },
    optionText: { ...fonts.regular(14), color: colors.grey9 },
    optionTextDark: { color: colors.white },
});

export default ClientsSelect;
