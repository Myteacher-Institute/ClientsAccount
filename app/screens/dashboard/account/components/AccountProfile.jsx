import { useState } from 'react';
import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View, Text, Image, Modal, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const AccountProfile = () => {
    const { user } = useUser();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image source={require('@/assets/images/profile.png')} style={styles.profileImg} />
                    <Pressable style={styles.cameraIcon} onPress={() => setModalVisible(true)}>
                        <Icon name="camera" size={14} color={colors.white} />
                    </Pressable>
                </View>

                <View style={styles.info}>
                    <Text style={styles.name}>{user?.fullName}</Text>
                    <Text numberOfLines={1} style={styles.title}>{user?.chamberName}</Text>
                </View>

                <View style={styles.button}>
                    <View style={[styles.pill, { backgroundColor: colors.green5 }]}>
                        <Icon name="circle-check" solid size={12} color={colors.green4} />
                        <Text style={[styles.pillText, { color: colors.green4 }]}>Verified Lawyer</Text>
                    </View>
                    <View style={[styles.pill, { backgroundColor: colors.blue8 }]}>
                        <Icon name="wallet" size={12} color={colors.blue4} />
                        <Text style={[styles.pillText, { color: colors.blue4 }]}>Active Wallet</Text>
                    </View>
                </View>
            </View>

            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Pressable style={styles.modalItem}>
                                    <Text style={styles.modalText}>Take Photo</Text>
                                </Pressable>
                                <Pressable style={styles.modalItem}>
                                    <Text style={styles.modalText}>Choose from Gallery</Text>
                                </Pressable>
                                <Pressable style={styles.modalItem}>
                                    <Text style={styles.modalText}>View Photo</Text>
                                </Pressable>
                                <Pressable style={styles.modalItem} onPress={() => setModalVisible(false)}>
                                    <Text style={{ ...fonts.medium() }}>Cancel</Text>
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 24,
        borderRadius: 16,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    imageWrapper: { position: 'relative' },
    profileImg: {
        width: 80,
        height: 80,
        borderWidth: 4,
        borderRadius: 50,
        resizeMode: 'cover',
        borderColor: colors.blue3,
    },
    cameraIcon: {
        right: 3,
        bottom: 3,
        padding: 6,
        borderRadius: 50,
        position: 'absolute',
        backgroundColor: colors.black,
    },
    info: { alignItems: 'center' },
    name: {
        color: colors.grey3,
        ...fonts.semiBold(20),
    },
    title: {
        ...fonts.regular(),
        color: colors.grey6,
    },
    button: {
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    pill: {
        gap: 4,
        borderRadius: 50,
        paddingVertical: 4,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    pillText: {
        color: colors.grey6,
        ...fonts.regular(12),
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.offWhite1,
    },
    modalContent: {
        paddingVertical: 2,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colors.white,
    },
    modalItem: {
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: colors.grey10,
    },
    modalText: { ...fonts.medium(16) },
});

export default AccountProfile;
