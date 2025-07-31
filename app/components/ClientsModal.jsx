import { fonts, colors } from '@/theme';
import { useRef, useEffect } from 'react';
import { Text, View, Modal, Animated, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ClientsModal = ({
    onClose,
    children,
    title = '',
    mode = 'center',
    visible = false,
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
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={backdropClosable ? onClose : undefined}>
                <Animated.View style={[styles.modal, styles[`${mode}Overlay`], { opacity }]}>
                    <View style={styles[mode]} onStartShouldSetResponder={() => true}>
                        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles[mode]}>
                            {mode === 'fullscreen' && title && (<Text style={styles.title}>{title}</Text>)}
                            {children}
                        </ScrollView>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: { flex: 1, justifyContent: 'center' },
    centerOverlay: { backgroundColor: colors.black },
    bottomOverlay: { backgroundColor: colors.offWhite1 },
    fullscreen: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: colors.black,
        justifyContent: 'space-between',
    },
    bottom: {
        width: '100%',
        paddingTop: 8,
        borderRadius: 16,
        marginTop: 'auto',
        backgroundColor: colors.white,
    },
    title: {
        textAlign: 'center',
        color: colors.white,
        ...fonts.medium(18),
    },
});

export default ClientsModal;
