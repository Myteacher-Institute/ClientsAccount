import { fonts, colors } from '@/theme';
import { useRef, useEffect } from 'react';
import ClientsButton from '@/components/ClientsButton';
import { Text, View, Animated, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    return (
        <View style={styles.container}>
            <Animated.Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            <ImageBackground source={require('@/assets/images/gavel.png')} style={styles.bg}>
                <Animated.Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            </ImageBackground>
            <ImageBackground source={require('@/assets/images/advocate.png')} style={styles.bg}>
                <Animated.Image source={require('@/assets/images/brand.png')} />
                <Text style={styles.text}>Account For Lawyers</Text>
            </ImageBackground>
            <ImageBackground source={require('@/assets/images/account.png')} style={styles.bg}>
                <Animated.Image source={require('@/assets/images/brand.png')} style={[styles.brand, { transform: [{ translateY }] }]} />
                <View style={styles.form}>
                    <ClientsButton text="Sign In" bgColor={colors.white} textColor={colors.black} extraStyle={styles.button} />
                    <ClientsButton outline space={20} text="Create Account" extraStyle={styles.button} onPress={() => navigation.navigate('CreateAccount')} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
    },
    bg: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80,
    },
    brand: {
        top: 200,
        position: 'absolute',
    },
    text: {
        marginTop: 50,
        ...fonts.bold(24),
        color: colors.white,
    },
    form: {
        width: '100%',
        marginTop: 185,
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 15,
        boxShadow: '5px 5px 4px 0px rgba(255, 255, 255, 0.25)',
    },
});

export default SplashScreen;
