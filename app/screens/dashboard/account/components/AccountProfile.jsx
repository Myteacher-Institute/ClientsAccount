import { useState } from 'react';
import { useApi } from '@/hooks';
import { colors, fonts } from '@/theme';
import { useUser } from '@/context/UserContext';
import { openCamera, openGallery } from '@/utils/media';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, View, Image, Modal, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const AccountProfile = () => {
    const { user, setUser } = useUser();
    const { call: uploadApi } = useApi('patch');
    const [modalType, setModalType] = useState(null);
    const [photoUri, setPhotoUri] = useState(user?.avatar || null);

    const closeModal = () => setModalType(null);

    const uploadAvatar = async (asset) => {
        try {
            const res = await uploadApi({
                requiresAuth: true,
                dynamicId: user?._id,
                data: { avatar: asset },
                endpoint: 'updateAvatar',
                onSuccessMessage: 'Profile photo updated!',
            });

            if (res?.url) {
                setUser((prev) => ({ ...prev, avatar: res.url }));
                setPhotoUri(res.url);
            }
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const handleTakePhoto = async () => {
        const asset = await openCamera();
        if (asset?.denied) { return; }

        if (asset?.uri) {
            const uri = `${asset.uri}?t=${Date.now()}`;
            setPhotoUri(uri);
            await uploadAvatar({ ...asset, uri });
        } else {
            console.warn('No photo returned from camera');
        }

        closeModal();
    };

    const handlePickGallery = async () => {
        const asset = await openGallery();
        if (asset?.denied) { return; }

        if (asset?.uri) {
            const uri = `${asset.uri}?t=${Date.now()}`;
            setPhotoUri(uri);
            await uploadAvatar({ ...asset, uri });
        } else {
            console.warn('No image returned from gallery');
        }

        closeModal();
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image style={styles.profileImg} source={photoUri ? { uri: photoUri } : require('@/assets/images/profile.png')} />
                <Pressable style={styles.cameraIcon} onPress={() => setModalType('options')}>
                    <Icon name="camera" size={14} color={colors.white} />
                </Pressable>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{user?.fullName}</Text>
                <Text numberOfLines={1} style={styles.title}>{user?.chamberName}</Text>
            </View>

            <Modal transparent animationType="fade" visible={!!modalType} onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={modalType === 'photo' ? styles.photoOverlay : styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            {modalType === 'options' ? (
                                <View style={styles.modalContent}>
                                    <Pressable style={styles.modalItem} onPress={handleTakePhoto}>
                                        <Text style={styles.modalText}>Take Photo</Text>
                                    </Pressable>
                                    <Pressable style={styles.modalItem} onPress={handlePickGallery}>
                                        <Text style={styles.modalText}>Choose from Gallery</Text>
                                    </Pressable>
                                    <Pressable style={styles.modalItem} onPress={() => setModalType('photo')}>
                                        <Text style={styles.modalText}>View Photo</Text>
                                    </Pressable>
                                    <Pressable style={styles.modalItem} onPress={closeModal}>
                                        <Text style={{ ...fonts.medium() }}>Cancel</Text>
                                    </Pressable>
                                </View>
                            ) : <Image style={styles.photo} source={photoUri ? { uri: photoUri } : require('@/assets/images/profile.png')} />}
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 24,
        borderRadius: 16,
        marginBottom: 25,
        alignItems: 'center',
        backgroundColor: colors.white,
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
    name: { color: colors.grey3, ...fonts.semiBold(20) },
    title: { ...fonts.regular(), color: colors.grey6 },
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
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: colors.grey10,
    },
    modalText: { ...fonts.medium(16) },
    photoOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
    },
    photo: {
        height: 400,
        width: '100%',
        resizeMode: 'cover',
    },
});

export default AccountProfile;
