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
    titleColor = colors.white,
}) => {
    const backdropClosable = mode !== 'fullscreen';
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            duration: 200,
            useNativeDriver: true,
            toValue: visible ? 1 : 0,
        }).start();
    }, [visible, opacity]);

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={backdropClosable ? onClose : undefined}>
                <Animated.View style={[styles.overlay, styles[`${mode}Overlay`], { opacity }]}>
                    <View style={[styles[mode], modalStyle]} onStartShouldSetResponder={() => true}>
                        {mode === 'fullscreen' ? (
                            <>
                                {title ? <Text style={[styles.title, styles.sticky, { color: titleColor }]}>{title}</Text> : null}

                                <ScrollView
                                    style={styles.overlay}
                                    keyboardDismissMode="on-drag"
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={[styles.sticky, bodyStyle]}
                                >
                                    {children}
                                </ScrollView>

                                {footer ? <View style={[styles.sticky, footerStyle]}>{footer}</View> : null}
                            </>
                        ) : <View style={bodyStyle}>{children}</View>}
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1 },
    fullscreenOverlay: { backgroundColor: colors.black },
    centerOverlay: { justifyContent: 'center', backgroundColor: colors.black },
    bottomOverlay: { backgroundColor: colors.offWhite1, justifyContent: 'flex-end' },
    sticky: { padding: 12 },
    bottom: {
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colors.white,
    },
    fullscreen: { flex: 1, backgroundColor: colors.black },
    center: { width: '100%', backgroundColor: colors.white },
    title: { textAlign: 'center', ...fonts.medium(18) },
});

export default ClientsModal;
