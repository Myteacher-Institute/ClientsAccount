import { fonts, colors } from '@/theme';
import { useRef, useEffect } from 'react';
import { Text, View, Modal, Animated, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ClientsModal = ({
    onClose,
    children,
    title = '',
    footer = null,
    mode = 'center',
    bodyStyle = {},
    visible = false,
    modalStyle = {},
    footerStyle = {},
    isLight = false,   // 👈 new boolean flag, default = false (dark mode)
}) => {
    const backdropClosable = mode !== 'fullscreen';
    const opacity = useRef(new Animated.Value(0)).current;

    // derive colors from flag
    const backgroundColor = isLight ? colors.white : colors.black;
    const textColor = isLight ? colors.black : colors.white;

    useEffect(() => {
        Animated.timing(opacity, {
            duration: 200,
            useNativeDriver: true,
            toValue: visible ? 1 : 0,
        }).start();
    }, [visible, opacity]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
            presentationStyle="overFullScreen"
        >
            <TouchableWithoutFeedback onPress={backdropClosable ? onClose : undefined}>
                <Animated.View style={[styles.overlay, styles[`${mode}Overlay`], { opacity }]}>
                    <View style={[styles[mode], { backgroundColor }, modalStyle]} onStartShouldSetResponder={() => true}>
                        {mode === 'fullscreen' ? (
                            <>
                                {title ? (
                                    <Text style={[styles.title, styles.sticky, { color: textColor }]}>{title}</Text>
                                ) : null}

                                <ScrollView
                                    style={styles.fullscreen}
                                    keyboardDismissMode="on-drag"
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={[styles.sticky, bodyStyle]}
                                >
                                    {children}
                                </ScrollView>

                                {footer ? <View style={[styles.sticky, footerStyle]}>{footer}</View> : null}
                            </>
                        ) : (
                            <View style={bodyStyle}>{children}</View>
                        )}
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1 },
    centerOverlay: { justifyContent: 'center', backgroundColor: colors.black },
    bottomOverlay: { backgroundColor: colors.offWhite1, justifyContent: 'flex-end' },
    sticky: { padding: 12 },
    bottom: {
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colors.white,
    },
    center: { width: '100%' },
    fullscreen: { flex: 1 },
    title: { textAlign: 'center', ...fonts.medium(18) },
});

export default ClientsModal;
