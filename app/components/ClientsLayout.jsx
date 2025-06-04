import { colors } from '../theme';
import { Platform, Keyboard, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

const ClientsLayout = ({
    Screen,
    Scroll,
    children,
    contentContainerStyle,
    Keyboard: KeyboardMode,
    showsVerticalScrollIndicator = false,
}) => {
    const mode = KeyboardMode ? 'keyboard' : Scroll ? 'scroll' : 'screen';
    const props = KeyboardMode || Scroll || Screen;

    let gap, style;
    (Array.isArray(props) ? props : [props]).forEach(item => {
        if (item === 'gap') { gap = true; }
        else if (item?.gap !== undefined) { gap = item.gap; }
        else if (item) { style = item; }
    });

    const gapStyle = typeof gap === 'number' ? { gap } : gap ? styles.defaultGap : null;

    const content = (
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
            {content}
        </KeyboardAvoidingView>
    ) : mode === 'scroll' ? content : children;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.base, gapStyle, style]}>
                {layout}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.black,
    },
    flex: { flex: 1 },
    defaultGap: { gap: 40 },
});

export default ClientsLayout;
