import { fonts, colors } from '@/theme';
import { useApi, useForm } from '@/hooks';
import { ClientsInput, ClientsButton } from '@/components';
import { Text, View, Image, Keyboard, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';

const SigninScreen = ({ navigation }) => {
    const initialValues = {
        email: '',
        password: '',
    };

    const required = Object.keys(initialValues);
    const { loading, call: callApi } = useApi('post');
    const { bind, values, validate } = useForm(initialValues, required);

    const onSubmit = async () => {
        if (!validate()) { return; }

        try {
            const response = await callApi({
                data: values,
                endpoint: 'login',
                requiresAuth: false,
                onSuccessMessage: 'Sign in successful!',
            });

            console.log('API response:', response);
            if (response) {
                navigation.navigate('Dashboard');
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground source={require('@/assets/images/advocate.png')} style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.text, styles.headerText]}>Sign In</Text>
                    <Text style={[styles.text, styles.helpText]}>Help</Text>
                </View>
                <View style={styles.section}>
                    <Image source={require('@/assets/images/brand.png')} style={styles.brand} />

                    <ClientsInput type="email" name="mail" label="Email Address" placeholder="you@email.com" leftIcon="mail-outline" {...bind('email')} />
                    <ClientsInput isPassword type="password" label="Password" placeholder="Enter your password" leftIcon="lock-closed" {...bind('password')} />

                    <Text style={[styles.text, styles.helpText]}>Forgot Password?</Text>

                    <ClientsButton isLight text="Sign In" loading={loading} onPress={onSubmit} />
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.text, styles.footerText]}>Don't have an account?</Text>
                    <Text style={[styles.text, styles.signText]} onPress={() => navigation.navigate('CreateAccount')}>Sign Up</Text>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    section: { gap: 20 },
    text: { color: colors.white },
    helpText: { ...fonts.medium(12) },
    signText: { ...fonts.regular(12) },
    headerText: { ...fonts.semiBold(18) },
    brand: { marginBottom: 80, alignSelf: 'center' },
    footerText: { ...fonts.light(12), color: colors.grey4 },
});

export default SigninScreen;
