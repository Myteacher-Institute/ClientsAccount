import { fonts, colors } from '@/theme';
import RNBootSplash from 'react-native-bootsplash';
import { useRef, useState, useEffect } from 'react';
import ClientsButton from '@/components/ClientsButton';
import { View, Easing, Animated, StatusBar, StyleSheet, ImageBackground, Text } from 'react-native';

const HOLD = 700, DUR_BG = 900, DUR_EL = 1000;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const animateParallel = (anime) => new Promise((resolve) => Animated.parallel(anime).start(resolve));
const fadeTo = (anim, to, duration = DUR_EL, delay = 0, easing = Easing.inOut(Easing.ease)) =>
    Animated.timing(anim, { toValue: to, duration, delay, easing, useNativeDriver: true });

const SplashScreen = ({ route, navigation }) => {
    const skipAnimation = route?.params?.skipAnimation ?? false;
    const [allowInteraction, setAllowInteraction] = useState(false);

    const screen1 = useRef(new Animated.Value(0)).current;
    const screen2 = useRef(new Animated.Value(0)).current;
    const screen3 = useRef(new Animated.Value(0)).current;

    const logoScale = useRef(new Animated.Value(1)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoTranslateX = useRef(new Animated.Value(0)).current;
    const logoTranslateY = useRef(new Animated.Value(0)).current;

    const screen3BrandScale = useRef(new Animated.Value(0)).current;
    const screen2BrandOpacity = useRef(new Animated.Value(0)).current;
    const screen3BrandOpacity = useRef(new Animated.Value(0)).current;
    const screen3ButtonsOpacity = useRef(new Animated.Value(0)).current;
    const screen3BrandTranslateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        StatusBar.setHidden(true, 'fade');

        const run = async () => {
            await RNBootSplash.hide({ fade: true });

            if (skipAnimation) {
                logoOpacity.setValue(0);
                screen1.setValue(0);
                screen2.setValue(0);
                screen3.setValue(1);
                logoScale.setValue(1.2);
                logoTranslateX.setValue(0);
                logoTranslateY.setValue(-10);
                screen2BrandOpacity.setValue(0);
                screen3BrandTranslateY.setValue(-50);
                screen3BrandOpacity.setValue(1);
                screen3BrandScale.setValue(0.8);
                screen3ButtonsOpacity.setValue(1);

                StatusBar.setHidden(false, 'fade');
                setAllowInteraction(true);
                return;
            }

            await animateParallel([
                fadeTo(logoOpacity, 1),
                fadeTo(screen1, 1, DUR_BG * 1.2),
                fadeTo(logoScale, 2),
            ]);
            await wait(HOLD);

            await animateParallel([
                fadeTo(screen1, 0, DUR_BG, DUR_BG * 0.2),
                fadeTo(screen2, 1, DUR_BG),
                fadeTo(logoScale, 1.2, DUR_EL * 0.7),
                fadeTo(logoTranslateY, -10, DUR_EL * 0.7),
                fadeTo(logoTranslateX, -51, DUR_EL * 0.7),
                fadeTo(logoOpacity, 0, 500),
                fadeTo(screen2BrandOpacity, 1, 500),
            ]);
            await wait(HOLD);

            await animateParallel([
                fadeTo(screen2, 0, DUR_BG, DUR_BG * 0.2),
                fadeTo(screen3, 1, DUR_BG),
                fadeTo(screen2BrandOpacity, 0, DUR_BG * 0.8),
                fadeTo(screen3BrandTranslateY, -50),
                fadeTo(screen3BrandOpacity, 1),
                fadeTo(screen3BrandScale, 0.8, DUR_EL),
                fadeTo(screen3ButtonsOpacity, 1, DUR_EL, DUR_EL * 0.5),
                fadeTo(logoTranslateX, 0, DUR_BG * 0.8),
            ]);

            StatusBar.setHidden(false, 'fade');
            setAllowInteraction(true);
        };

        run();
        return () => StatusBar.setHidden(false, 'fade');
    }, [
        screen1,
        screen2,
        screen3,
        logoScale,
        logoOpacity,
        skipAnimation,
        logoTranslateX,
        logoTranslateY,
        screen3BrandScale,
        screen2BrandOpacity,
        screen3BrandOpacity,
        screen3ButtonsOpacity,
        screen3BrandTranslateY,
    ]);

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
        text: {
            bottom: '5%',
            color: colors.white,
            ...fonts.medium(16),
            position: 'absolute',
        },
        logo: { width: 80, height: 80, zIndex: 4 },
        brand: { top: '40%', position: 'absolute' },
        form: {
            gap: 20,
            width: '100%',
            marginTop: 190,
            paddingHorizontal: 20,
        },
        button: {
            shadowRadius: 4,
            borderRadius: 15,
            shadowOpacity: 1,
            shadowOffset: { width: 5, height: 5 },
            shadowColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '5px 5px 4px 0px rgba(255, 255, 255, 0.25)',
        },
    });

    const logoStyle = {
        opacity: logoOpacity,
        transform: [
            { scale: logoScale },
            { translateX: logoTranslateX },
            { translateY: logoTranslateY },
        ],
    };

    return (
        <View style={styles.container} pointerEvents={allowInteraction ? 'auto' : 'none'}>
            <Animated.Image source={require('@/assets/images/logo.png')} style={[styles.logo, logoStyle]} />

            <AnimatedImageBackground source={require('@/assets/images/gavel.png')} style={[styles.bg, { opacity: screen1 }]} />

            <AnimatedImageBackground source={require('@/assets/images/advocate.png')} style={[styles.bg, { opacity: screen2 }]}>
                <Animated.Image source={require('@/assets/images/brand.png')} style={{ opacity: screen2BrandOpacity, transform: [{ scale: 1 }] }} />
                <Text style={styles.text}>Account For Lawyers</Text>
            </AnimatedImageBackground>

            <Animated.View style={[styles.bg, { opacity: screen3 }]}>
                <Animated.Image
                    source={require('@/assets/images/brand.png')}
                    style={{
                        ...styles.brand,
                        opacity: screen3BrandOpacity,
                        transform: [{ scale: screen3BrandScale }, { translateY: screen3BrandTranslateY }],
                    }}
                />
                <View style={styles.form}>
                    <ClientsButton
                        isLight
                        text="Sign In"
                        extraStyle={styles.button}
                        onPress={() => navigation.navigate('SigninScreen')}
                    />
                    <ClientsButton
                        outline
                        text="Create Account"
                        extraStyle={styles.button}
                        onPress={() => navigation.navigate('CreateAccount')}
                    />
                </View>
            </Animated.View>
        </View>
    );
};

export default SplashScreen;
