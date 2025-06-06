import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, ImageBackground } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import { fonts, colors } from '@/theme';

const HOLD = 1000;
const DUR_BG = 1000;
const DUR_EL = 1200;

const fadeTo = (anim, toValue, duration = DUR_EL, delay = 0) =>
    Animated.timing(anim, { toValue, duration, delay, useNativeDriver: true });

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const animateParallel = (anims) => new Promise((resolve) => Animated.parallel(anims).start(resolve));

const SplashScreen = ({ navigation }) => {
    const [allowInteraction, setAllowInteraction] = useState(false);

    const screen0 = useRef(new Animated.Value(1)).current;
    const screen1 = useRef(new Animated.Value(0)).current;
    const screen2 = useRef(new Animated.Value(0)).current;
    const screen3 = useRef(new Animated.Value(0)).current;

    const logoScale = useRef(new Animated.Value(1)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoTranslateX = useRef(new Animated.Value(0)).current;
    const logoTranslateY = useRef(new Animated.Value(0)).current;

    const screen2TextOpacity = useRef(new Animated.Value(0)).current;
    const screen2BrandOpacity = useRef(new Animated.Value(0)).current;
    const screen2BrandScale = useRef(new Animated.Value(0.5)).current;
    const screen2BrandTranslateY = useRef(new Animated.Value(0)).current;

    const screen3BrandOpacity = useRef(new Animated.Value(0)).current;
    const screen3ButtonsOpacity = useRef(new Animated.Value(0)).current;
    const screen3BrandTranslateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        StatusBar.setHidden(true);

        const sequence = async () => {
            await animateParallel([fadeTo(logoOpacity, 1)]);
            await new Promise((r) => setTimeout(r, HOLD));

            await animateParallel([
                fadeTo(screen0, 0, DUR_BG, DUR_BG * 0.2),
                fadeTo(screen1, 1, DUR_BG),
                fadeTo(logoScale, 1.5),
            ]);
            await new Promise((r) => setTimeout(r, HOLD));

            await animateParallel([
                fadeTo(screen1, 0, DUR_BG, DUR_BG * 0.2),
                fadeTo(screen2, 1, DUR_BG),
                fadeTo(logoOpacity, 0, DUR_EL * 0.7),
                fadeTo(logoScale, 0.8, DUR_EL * 0.7),
                fadeTo(screen2BrandOpacity, 1, DUR_EL, DUR_EL * 0.2),
                fadeTo(screen2BrandScale, 1, DUR_EL, DUR_EL * 0.2),
                fadeTo(screen2BrandTranslateY, 0),
                fadeTo(screen2TextOpacity, 1, DUR_EL, DUR_EL * 0.5),
            ]);
            await new Promise((r) => setTimeout(r, HOLD));

            await animateParallel([
                fadeTo(screen2, 0, DUR_BG, DUR_BG * 0.2),
                fadeTo(screen3, 1, DUR_BG),
                fadeTo(screen2BrandOpacity, 0, DUR_BG * 0.8),
                fadeTo(screen2TextOpacity, 0, DUR_BG * 0.8),
                fadeTo(screen3BrandTranslateY, -50),
                fadeTo(screen3BrandOpacity, 1),
                fadeTo(screen3ButtonsOpacity, 1, DUR_EL, DUR_EL * 0.5),
            ]);

            setAllowInteraction(true);
        };

        sequence();

        return () => StatusBar.setHidden(false);
    }, [
        screen0,
        screen1,
        screen2,
        screen3,
        logoScale,
        navigation,
        logoOpacity,
        logoTranslateX,
        logoTranslateY,
        screen2BrandScale,
        screen2TextOpacity,
        screen2BrandOpacity,
        screen3BrandOpacity,
        screen3ButtonsOpacity,
        screen2BrandTranslateY,
        screen3BrandTranslateY,
    ]);

    const animatedStyles = {
        logo: {
            opacity: logoOpacity,
            transform: [
                { scale: logoScale },
                { translateX: logoTranslateX },
                { translateY: logoTranslateY },
            ],
        },
        screen2Brand: {
            opacity: screen2BrandOpacity,
            transform: [
                { scale: screen2BrandScale },
                { translateY: screen2BrandTranslateY },
            ],
        },
        screen3Brand: {
            opacity: screen3BrandOpacity,
            transform: [{ translateY: screen3BrandTranslateY }],
        },
    };

    return (
        <View style={styles.container} pointerEvents={allowInteraction ? 'auto' : 'none'}>
            <Animated.Image source={require('@/assets/images/logo.png')} style={[styles.logo, animatedStyles.logo]} />

            <Animated.View style={{ opacity: screen0 }} />

            <AnimatedImageBackground source={require('@/assets/images/gavel.png')} style={[styles.bg, { opacity: screen1 }]} />

            <AnimatedImageBackground source={require('@/assets/images/advocate.png')} style={[styles.bg, { opacity: screen2 }]}>
                <Animated.Image source={require('@/assets/images/brand.png')} style={animatedStyles.screen2Brand} />
                <Text style={styles.text}>Account For Lawyers</Text>
            </AnimatedImageBackground>

            <AnimatedImageBackground source={require('@/assets/images/account.png')} style={[styles.bg, styles.screen3, { opacity: screen3 }]}>
                <Animated.Image source={require('@/assets/images/brand.png')} style={[styles.brand, animatedStyles.screen3Brand]} />
                <View style={styles.form}>
                    <ClientsButton
                        text="Sign In"
                        bgColor={colors.white}
                        textColor={colors.black}
                        extraStyle={styles.button}
                    />
                    <ClientsButton
                        outline
                        text="Create Account"
                        extraStyle={styles.button}
                        onPress={() => navigation.navigate('CreateAccount')}
                    />
                </View>
            </AnimatedImageBackground>
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
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        zIndex: 4,
        height: 80,
    },
    brand: {
        top: '30%',
        position: 'absolute',
    },
    text: {
        marginTop: 35,
        ...fonts.bold(24),
        color: colors.white,
    },
    screen3: { zIndex: 5 },
    form: {
        gap: 20,
        width: '100%',
        marginTop: 190,
        paddingHorizontal: 20,
    },
    button: {
        elevation: 5,
        shadowRadius: 4,
        borderRadius: 15,
        shadowOpacity: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'rgba(255, 255, 255, 0.25)',
        boxShadow: '5px 5px 4px 0px rgba(255, 255, 255, 0.25)',
    },
});

export default SplashScreen;
