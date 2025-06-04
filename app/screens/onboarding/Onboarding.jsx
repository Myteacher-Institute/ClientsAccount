import { fonts, colors } from '@/theme';
import ClientsLayout from '@/components/ClientsLayout';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const Onboarding = () => {
    return (
        <ClientsLayout>
            <ImageBackground source={require('@/assets/images/logoImg.png')} style={styles.bg}>
                <View style={styles.container}>
                    <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.buttonOutline}>
                            <Text style={styles.buttonOutlineText}>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#eee',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.white,
        ...fonts.regular(20),
    },
    buttonOutline: {
        borderColor: '#fff',
        borderWidth: 1,
        padding: 15,
        width: '100%',
        borderRadius: 10,
    },
    buttonOutlineText: {
        textAlign: 'center',
        color: colors.white,
        ...fonts.regular(20),
    },
});

export default Onboarding;
