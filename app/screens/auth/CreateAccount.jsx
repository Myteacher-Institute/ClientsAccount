import { useState } from 'react';
import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';

const CreateAccount = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState(null);

    return (
        <ClientsLayout title="Create Account">

            <View style={styles.section}>
                <ClientsInput darkLabel="Full Name" placeholder="Enter your full name" />
                <ClientsInput placeholder="Enter a Chamber Name" darkLabel="Enter a desired/registered Chamber Name?" />
                <ClientsInput type="scn" placeholder="Enter SCN Number" darkLabel="Supreme Court Enrollment Number" />

                <Text style={styles.text}>Gender</Text>
                <View style={styles.gender}>
                    {['male', 'female', 'other'].map((gender) => {
                        const isSelected = selectedGender === gender;
                        const genderSymbols = { male: '♂', female: '♀', other: '○' };
                        return (
                            <ClientsButton
                                outline
                                key={gender}
                                text={gender}
                                onPress={() => setSelectedGender(gender)}
                                extraStyle={[styles.genderButton, isSelected && styles.genderButtonSelected]}
                                extraTextStyle={[styles.genderText, isSelected && styles.genderTextSelected]}
                            />
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
        color: colors.grey1,
    },
    gender: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderButton: {
        flex: 1,
        borderColor: colors.grey2,
    },
    genderButtonSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.yellow,
    },
    genderText: {
        ...fonts.regular(),
        color: colors.grey1,
    },
    genderTextSelected: {
        color: colors.white,
    },
});

export default CreateAccount;
