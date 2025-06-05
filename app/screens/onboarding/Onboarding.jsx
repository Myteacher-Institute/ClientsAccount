import { colors } from '@/theme';
import { useRef, useEffect } from 'react';
import ClientsLayout from '@/components/ClientsLayout';
import ClientsButton from '@/components/ClientsButton';
import { View, Animated, StyleSheet, ImageBackground } from 'react-native';

const Onboarding = () => {
    const translateY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    return (
        <ClientsLayout dark Screen={[styles.container]}>
            <ImageBackground source={require('@/assets/images/account.png')} style={styles.bg}>
                <Animated.Image source={require('@/assets/images/logo.png')} style={[styles.logo, { transform: [{ translateY }] }]} />
                <View style={styles.form}>
                    <ClientsButton text="Sign In" bgColor={colors.white} textColor={colors.black} extraStyle={styles.button} />
                    <ClientsButton outline space={20} text="Create Account" extraStyle={styles.button} />
                </View>
            </ImageBackground>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    bg: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        top: 200,
        position: 'absolute',
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

export default Onboarding;
