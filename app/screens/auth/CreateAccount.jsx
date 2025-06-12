import { useState } from 'react';
import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import Icon from 'react-native-vector-icons/Ionicons';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const CreateAccount = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState(null);

    const genderOptions = [
        { key: 'male', label: 'Male', icon: 'male', color: colors.blue4 },
        { key: 'female', label: 'Female', icon: 'female', color: colors.red2 },
        { key: 'other', label: 'Other', icon: 'ellipse-outline', color: colors.grey4 },
    ];

    return (
        <ClientsLayout title="Create Account">
            <View style={styles.section}>
                <ClientsInput darkLabel="Full Name" placeholder="Enter your full name" />
                <ClientsInput placeholder="Enter a Chamber Name" darkLabel="Enter a desired/registered Chamber Name?" />
                <ClientsInput type="scn" placeholder="Enter SCN Number" darkLabel="Supreme Court Enrollment Number" />

                <Text style={styles.text}>Gender</Text>
                <View style={styles.gender}>
                    {genderOptions.map(({ key, icon, color, label }) => {
                        const isSelected = selectedGender === key;
                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => setSelectedGender(key)}
                                style={[styles.genderOption, isSelected && styles.genderOptionSelected]}
                            >
                                <Icon name={icon} size={15} color={color} />
                                <Text style={[styles.genderLabel, isSelected && styles.genderLabelSelected]}>{label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <ClientsInput type="nin" darkLabel="NIN" placeholder="Enter NIN" />
                <ClientsInput type="email" darkLabel="Email" placeholder="Enter your email address" />
                <ClientsInput type="phone" darkLabel="Phone" placeholder="Enter your phone number" />
                <ClientsInput isPassword darkLabel="Create Password" placeholder="Create a password" />

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
    text: {
        ...fonts.medium(),
        marginBottom: -15,
        color: colors.grey1,
    },
    gender: {
        gap: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderOption: {
        gap: 5,
        flex: 1,
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: colors.grey2,
    },
    genderOptionSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.yellow,
    },
    genderLabel: {
        marginTop: 4,
        ...fonts.regular(),
        color: colors.grey1,
    },
    genderLabelSelected: {
        color: colors.white,
    },
});

export default CreateAccount;
