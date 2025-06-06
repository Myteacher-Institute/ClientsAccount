import { colors } from '@/theme';
import RNBootSplash from 'react-native-bootsplash';
import { useRef, useState, useEffect } from 'react';
import ClientsButton from '@/components/ClientsButton';
import { View, Easing, Animated, StatusBar, StyleSheet, ImageBackground } from 'react-native';

const HOLD = 300, DUR_BG = 400, DUR_EL = 600;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const animateParallel = (anime) => new Promise((resolve) => Animated.parallel(anime).start(resolve));
const fadeTo = (anim, to, duration = DUR_EL, delay = 0, easing = Easing.inOut(Easing.ease)) =>
    Animated.timing(anim, { toValue: to, duration, delay, easing, useNativeDriver: true });

const SplashScreen = ({ navigation }) => {
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
        StatusBar.setHidden(true);

        const run = async () => {
            await RNBootSplash.hide({ fade: true });

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
                fadeTo(logoTranslateY, -33, DUR_EL * 0.7),
                fadeTo(logoTranslateX, -52, DUR_EL * 0.7),
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

            setAllowInteraction(true);
        };

        run();
        return () => StatusBar.setHidden(false);
    }, [
        screen1,
        screen2,
        screen3,
        logoScale,
        logoOpacity,
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
        logo: { width: 80, height: 80, zIndex: 4 },
        brand: { top: '40%', position: 'absolute' },
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
            </Animated.View>
        </View>
    );
};

export default SplashScreen;
