import { useState } from 'react';
import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const CreateAccount = ({ navigation }) => {
    const [hasChamberName, setHasChamberName] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const onPressChamber = choice => hasChamberName !== choice && setHasChamberName(choice);

    return (
        <ClientsLayout title="Create Account">
            <ClientsInput label="Full Name" placeholder="Enter your full name" />

            <Text style={styles.questionText}>
                Do you have an already existing/registered Chamber Name?
            </Text>

            <TouchableOpacity style={styles.radioGroupContainer}>
                {['yes', 'no'].map((value) => {
                    const isSelected = hasChamberName === value;
                    const label = value === 'yes' ? 'Yes' : 'No';
                    return (
                        <TouchableOpacity
                            key={value}
                            style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
                            onPress={() => onPressChamber(value)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.radioText, isSelected && styles.radioTextSelected]}>{label}</Text>
                            <Icon
                                name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                                size={24}
                                color={isSelected ? colors.primary : '#777'}
                            />
                        </TouchableOpacity>
                    );
                })}
            </TouchableOpacity>

            <ClientsInput placeholder="Enter a Chamber Name" />

            <ClientsInput
                type="scn"
                label="Supreme Court Enrollment Number"
                placeholder="Enter SCN Number"
            />

            <Text style={styles.genderLabel}>Gender</Text>
            <TouchableOpacity style={styles.genderRadioGroup}>
                {['male', 'female', 'other'].map((gender) => {
                    const isSelected = selectedGender === gender;
                    const genderSymbols = { male: '♂', female: '♀', other: '○' };
                    return (
                        <TouchableOpacity
                            key={gender}
                            style={[styles.genderRadioButton, isSelected && styles.genderRadioButtonSelected]}
                            onPress={() => setSelectedGender(gender)}
                        >
                            <Text style={[styles.genderRadioText, isSelected && styles.genderRadioTextSelected]}>
                                {genderSymbols[gender]} {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </TouchableOpacity>

            <ClientsInput type="nin" label="NIN" placeholder="Enter NIN" />
            <ClientsInput type="email" label="Email" />
            <ClientsInput type="phone" label="Phone" />
            <ClientsInput isPassword label="Create Password" placeholder="Create a password" />

            <ClientsButton text="Continue" onPress={() => navigation.navigate('KYCScreen')} />
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    questionText: {
        ...fonts.regular(14),
        color: colors.text,
        marginBottom: 10,
        marginTop: 15,
    },
    radioGroupContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
        marginRight: 10,
        backgroundColor: colors.background,
    },
    radioButtonSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.lightPrimary,
    },
    radioText: {
        ...fonts.regular(14),
        color: colors.text,
        marginRight: 8,
    },
    radioTextSelected: {
        color: colors.primary,
    },
    genderLabel: {
        ...fonts.regular(14),
        color: colors.text,
        marginBottom: 10,
        marginTop: 15,
    },
    genderRadioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    genderRadioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.background,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    genderRadioButtonSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.lightPrimary,
    },
    genderRadioText: {
        ...fonts.regular(14),
        color: colors.text,
    },
    genderRadioTextSelected: {
        color: colors.primary,
    },
});

export default CreateAccount;
