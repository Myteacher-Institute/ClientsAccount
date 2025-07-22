import { fonts, colors } from '@/theme';
import { useApi, useForm } from '@/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { ClientsInput, ClientsButton, ClientsLayout } from '@/components';

const CreateAccount = ({ navigation }) => {
    const initialValues = {
        nin: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        fullName: '',
        chamberName: '',
        enrolleeNumber: '',
    };

    const { loading, call: callApi } = useApi('post');
    const { bind, values, validate, setField } = useForm(initialValues, Object.keys(initialValues));

    const formatChamberName = name => name.trim() ? `${name.trim().replace(/\s+and\s+/gi, ' & ').replace(/\s+Chambers?$/i, '')} Chamber` : '';

    const onSubmit = async () => {
        if (!validate()) { return; }

        try {
            const response = await callApi({
                requiresAuth: false,
                endpoint: 'register',
                onSuccessMessage: 'User registered successfully!',
                data: { ...values, chamberName: formatChamberName(values.chamberName) },
            });

            if (response) { navigation.navigate('KYCScreen'); }
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    const genderOptions = [
        { key: 'male', label: 'Male', icon: 'male', color: colors.blue4 },
        { key: 'female', label: 'Female', icon: 'female', color: colors.red2 },
        { key: 'other', label: 'Other', icon: 'ellipse-outline', color: colors.grey4 },
    ];

    return (
        <ClientsLayout title="Create Account">
            <View style={styles.section}>
                <ClientsInput darkLabel="Full Name" placeholder="Enter full name" {...bind('fullName')} />
                <ClientsInput
                    darkLabel="Chamber?"
                    {...bind('chamberName')}
                    placeholder="Chamber Name"
                    onBlur={() => setField('chamberName', formatChamberName(values.chamberName))}
                />
                <ClientsInput type="scn" darkLabel="SCN" placeholder="SCN Number" {...bind('enrolleeNumber')} />

                <Text style={styles.text}>Gender</Text>
                <View style={styles.gender}>
                    {genderOptions.map(({ key, icon, label, color }) => {
                        const selected = values.gender === key;
                        return (
                            <Pressable
                                key={key}
                                onPress={() => setField('gender', key)}
                                style={[styles.genderOption, selected && styles.genderOptionSelected]}
                            >
                                <Icon name={icon} size={15} color={color} />
                                <Text style={[styles.genderLabel, selected && styles.genderLabelSelected]}>{label}</Text>
                            </Pressable>
                        );
                    })}
                </View>

                <ClientsInput type="nin" darkLabel="NIN" placeholder="Enter NIN" {...bind('nin')} />
                <ClientsInput type="email" darkLabel="Email" placeholder="Enter email" {...bind('email')} />
                <ClientsInput type="phone" darkLabel="Phone" placeholder="Enter phone" {...bind('phone')} />
                <ClientsInput isPassword type="password" darkLabel="Password" placeholder="Create password" {...bind('password')} />

                <ClientsButton space={20} text="Continue" loading={loading} onPress={onSubmit} />
            </View>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    section: { gap: 15, paddingBottom: '10%' },
    text: { ...fonts.medium(), marginBottom: -15, color: colors.grey1 },
    gender: { gap: 15, flexDirection: 'row', justifyContent: 'space-between' },
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
        borderColor: colors.black,
        backgroundColor: colors.black,
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
