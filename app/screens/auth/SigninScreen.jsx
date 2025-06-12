import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import ClientsButton from '@/components/ClientsButton';
import { Text, View, Image, Keyboard, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';

const SigninScreen = ({ navigation }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground source={require('@/assets/images/advocate.png')} style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.text, styles.headerText]}>Sign In</Text>
                    <Text style={[styles.text, styles.helpText]}>Help</Text>
                </View>
                <View style={styles.section}>
                    <Image source={require('@/assets/images/brand.png')} style={styles.brand} />

                    <ClientsInput type="email" name="mail" label="Email Address" placeholder="you@email.com" leftIcon="mail-outline" />
                    <ClientsInput isPassword label="Password" placeholder="Enter your password" leftIcon="lock-closed" />

                    <Text style={[styles.text, styles.helpText]}>Forgot Password?</Text>

                    <ClientsButton isLight text="Sign In" onPress={() => navigation.navigate('Dashboard')} />
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
