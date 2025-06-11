import { useState } from 'react';
import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const CreateAccount = ({ navigation }) => {
    const [hasChamberName, setHasChamberName] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const onPressChamber = choice => hasChamberName !== choice && setHasChamberName(choice);

    return (
        <ClientsLayout title="Create Account">

            <View style={styles.section}>
                <ClientsInput label="Full Name" placeholder="Enter your full name" />

                <Text style={styles.questionText}>
                    Do you have an already existing/registered Chamber Name?
                </Text>

                <View style={styles.radioGroupContainer}>
                    {['yes', 'no'].map((value) => {
                        const isSelected = hasChamberName === value;
                        const label = value === 'yes' ? 'Yes' : 'No';
                        return (
                            <TouchableOpacity
                                key={value}
                                activeOpacity={0.7}
                                onPress={() => onPressChamber(value)}
                                style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
                            >
                                <Icon
                                    size={22}
                                    color={isSelected ? colors.primary : '#777'}
                                    name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                                />
                                <Text style={[styles.radioText, isSelected && styles.radioTextSelected]}>{label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <ClientsInput placeholder="Enter a Chamber Name" />

                <ClientsInput
                    type="scn"
                    placeholder="Enter SCN Number"
                    label="Supreme Court Enrollment Number"
                />

                <Text style={styles.genderLabel}>Gender</Text>
                <View style={styles.genderRadioGroup}>
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
                </View>
                <ClientsInput type="nin" label="NIN" placeholder="Enter NIN" />
                <ClientsInput type="email" label="Email" />
                <ClientsInput type="phone" label="Phone" />
                <ClientsInput isPassword label="Create Password" placeholder="Create a password" />

                <ClientsButton space={20} text="Continue" onPress={() => navigation.navigate('KYCScreen')} />
            </View>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    section: {
        gap: 15,
        paddingBottom: '10%',
    },
    questionText: {
        color: colors.black,
        ...fonts.regular(10),
    },
    radioGroupContainer: {
        gap: 10,
        flexDirection: 'row',
    },
    radioButton: {
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.background,
    },
    radioButtonSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.lightPrimary,
    },
    radioText: {
        color: colors.black,
        ...fonts.regular(),
    },
    radioTextSelected: {
        color: colors.primary,
    },
    genderLabel: {
        ...fonts.regular(),
        color: colors.black,
    },
    genderRadioGroup: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderRadioButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.background,
        justifyContent: 'center',
    },
    genderRadioButtonSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.lightPrimary,
    },
    genderRadioText: {
        ...fonts.regular(),
        color: colors.black,
    },
    genderRadioTextSelected: {
        color: colors.primary,
    },
});

export default CreateAccount;
