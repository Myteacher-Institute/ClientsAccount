import { setToken } from '@/auth/token';
import { fonts, colors } from '@/theme';
import { useApi, useForm } from '@/hooks';
import { useUser } from '@/context/UserContext';
import { ClientsInput, ClientsButton } from '@/components';
import { Text, View, Image, Keyboard, Platform, ScrollView, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

const SigninScreen = ({ navigation }) => {
    const initialValues = { email: '', password: '' };

    const { fetchUser } = useUser();
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

            if (response?.token) {
                await setToken(response.token);
                console.log('Response Token.');
                await fetchUser(response.token);
                navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
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

                <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.section}>
                        <Image source={require('@/assets/images/brand.png')} style={styles.brand} />

                        <ClientsInput type="email" name="mail" {...bind('email')} label="Email Address" leftIcon="mail-outline" placeholder="you@email.com" />
                        <ClientsInput isPassword type="password" label="Password" {...bind('password')} leftIcon="lock-closed" placeholder="Enter your password" />

                        <Text style={[styles.text, styles.helpText]}>Forgot Password?</Text>

                        <ClientsButton isLight text="Sign In" loading={loading} onPress={onSubmit} />
                    </ScrollView>
                </KeyboardAvoidingView>

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
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    section: {
        gap: 20,
        flexGrow: 1,
        paddingVertical: 40,
        justifyContent: 'center',
    },
    text: { color: colors.white },
    helpText: { ...fonts.medium(12) },
    signText: { ...fonts.regular(12) },
    headerText: { ...fonts.semiBold(18) },
    brand: { marginBottom: 80, alignSelf: 'center' },
    footerText: { ...fonts.light(12), color: colors.grey4 },
});

export default SigninScreen;
