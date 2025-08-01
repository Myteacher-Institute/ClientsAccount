import { colors, fonts } from '@/theme';
import { usePhoto } from '@/hooks/usePhoto';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsModal, ClientsButton } from '@/components';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';

const AccountProfile = () => {
    const {
        user,
        modal,
        loading,
        photoUri,
        tempImage,
        closeModal,
        openOptions,
        handleSelect,
        handleUpload,
        openViewPhoto,
    } = usePhoto();

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image style={styles.profileImg} source={photoUri ? { uri: photoUri } : require('@/assets/images/profile.png')} />
                <Pressable style={styles.cameraIcon} onPress={openOptions}>
                    <Icon name="camera" size={14} color={colors.white} />
                </Pressable>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{user?.fullName}</Text>
                <Text numberOfLines={1} style={styles.title}>{user?.chamberName}</Text>
            </View>

            <ClientsModal
                visible={!!modal}
                onClose={closeModal}
                title={modal === 'crop' ? 'Crop' : modal === 'view' ? 'Profile Photo' : ''}
                mode={modal === 'options' ? 'bottom' : modal === 'crop' ? 'fullscreen' : 'center'}
            >
                {modal === 'options' && (
                    <>
                        <Pressable style={styles.modalItem} onPress={() => handleSelect('camera')}>
                            <Text style={styles.modalText}>Take Photo</Text>
                        </Pressable>
                        <Pressable style={styles.modalItem} onPress={() => handleSelect('gallery')}>
                            <Text style={styles.modalText}>Choose from Gallery</Text>
                        </Pressable>
                        <Pressable style={styles.modalItem} onPress={openViewPhoto}>
                            <Text style={styles.modalText}>View Photo</Text>
                        </Pressable>
                        <Pressable style={styles.modalItem} onPress={closeModal}>
                            <Text style={{ ...fonts.medium() }}>Cancel</Text>
                        </Pressable>
                    </>
                )}

                {modal === 'view' && <Image style={styles.preview} source={photoUri ? { uri: photoUri } : require('@/assets/images/profile.png')} />}

                {modal === 'crop' && (
                    <>
                        <Image style={styles.cropImage} source={{ uri: tempImage }} />
                        <View style={styles.cropActions}>
                            <ClientsButton isLight text="Cancel" onPress={closeModal} extraStyle={styles.button} />
                            <ClientsButton text="Save" loading={loading} onPress={handleUpload} bgColor={colors.yellow1} extraStyle={styles.button} />
                        </View>
                    </>
                )}
            </ClientsModal>
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
    modalItem: {
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: colors.grey10,
    },
    modalText: { ...fonts.medium(16) },
    preview: {
        height: 360,
        width: '100%',
        resizeMode: 'cover',
    },
    cropImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        resizeMode: 'cover',
    },
    cropActions: {
        gap: 10,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    button: { flex: 1 },
});

export default AccountProfile;
