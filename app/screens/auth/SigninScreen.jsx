import { fonts, colors } from '@/theme';
import ClientsInput from '@/components/ClientsInput';
import ClientsButton from '@/components/ClientsButton';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';

const SigninScreen = ({ navigation }) => {

    return (
        <ImageBackground source={require('@/assets/images/advocate.png')} style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.headerText]}>Sign In</Text>
                <Text style={[styles.text, styles.helpText]}>Help</Text>
            </View>
            <View style={styles.section}>
                <Image source={require('@/assets/images/brand.png')} style={styles.brand} />

                <ClientsInput type="email" name="mail" label="Email Address" placeholder="you@email.com" />
                <ClientsInput isPassword label="Password" placeholder="Enter your password" />

                <View style={styles.header}>
                    <Text style={[styles.text, styles.optionText]}>Remember me</Text>
                    <Text style={[styles.text, styles.helpText]}>Forgot?</Text>
                </View>

                <ClientsButton
                    text="Sign In"
                    bgColor={colors.white}
                    textColor={colors.black}
                    onPress={() => navigation.navigate('Dashboard')}
                />
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text, styles.footerText]}>Don't have an account?</Text>
                <Text style={[styles.text, styles.signText]} onPress={() => navigation.navigate('CreateAccount')}>Sign Up</Text>
            </View>
        </ImageBackground>
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
    text: { color: colors.white },
    headerText: { ...fonts.semiBold(18) },
    helpText: { ...fonts.medium(12) },
    section: {
        gap: 20,
    },
    brand: { marginBottom: 80, alignSelf: 'center' },
    optionText: { ...fonts.light(12) },
    footer: {
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: { ...fonts.light(12), color: colors.grey4 },
    signText: { ...fonts.regular(12) },
});

export default SigninScreen;
