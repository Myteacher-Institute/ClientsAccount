import { colors } from '../theme';
import { Platform, Keyboard, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

const ClientsLayout = ({
    dark,
    Screen,
    Scroll,
    children,
    backgroundColor,
    contentContainerStyle,
    Keyboard: KeyboardMode,
    showsVerticalScrollIndicator = false,
}) => {
    const props = KeyboardMode || Scroll || Screen;
    const propArray = Array.isArray(props) ? props : [props];
    const gap = propArray.find(p => p === 'gap' || p?.gap !== undefined);
    const mode = KeyboardMode ? 'keyboard' : Scroll ? 'scroll' : 'screen';
    const customStyle = propArray.find(p => typeof p === 'object' && !p?.gap);

    const layoutContent = (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={contentContainerStyle}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        >
            {children}
        </ScrollView>
    );

    const layout = mode === 'keyboard' ? (
        <KeyboardAvoidingView
            style={styles.flex}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {layoutContent}
        </KeyboardAvoidingView>
    ) : mode === 'scroll' ? layoutContent : children;

    const background = backgroundColor ?? (dark ? colors.black : colors.white);
    const gapStyle =
        typeof gap === 'number' ? { gap } : gap === 'gap' || gap?.gap ? styles.defaultGap : null;

    return (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
            <SafeAreaView style={[gapStyle, styles.base, customStyle, { backgroundColor: background }]}>
                {layout}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    flex: { flex: 1 },
    defaultGap: { gap: 40 },
});

export default ClientsLayout;
