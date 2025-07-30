import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Platform, PermissionsAndroid, ToastAndroid, Alert, Linking } from 'react-native';

const showToast = (message) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        console.warn(message);
    }
};

const askPermission = async (permission, rationale) => {
    try {
        const result = await PermissionsAndroid.request(permission, rationale);

        if (result === PermissionsAndroid.RESULTS.GRANTED) { return true; }

        if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
                'Permission Required',
                'Please enable this permission manually from settings to use this feature.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() },
                ]
            );
        }

        return false;
    } catch (e) {
        console.error('Permission request failed', e);
        return false;
    }
};

export const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
        const permission = Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await askPermission(permission, {
            title: 'Gallery Permission',
            message: 'We need access to your photos to update your profile picture.',
            buttonPositive: 'OK',
        });

        if (!granted) { showToast('Gallery permission denied'); }
        return granted;
    }

    return true;
};

export const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await askPermission(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Camera Permission',
            message: 'We need access to your camera to take profile photos.',
            buttonPositive: 'OK',
        });

        if (!granted) { showToast('Camera permission denied'); }
        return granted;
    }

    return true;
};

export const openCamera = async () => {
    const granted = await requestCameraPermission();
    if (!granted) { return { denied: true }; }

    const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });

    if (result.didCancel) { return null; }
    if (result.errorCode) {
        console.error('Camera error:', result.errorMessage);
        showToast('Camera failed to open');
        return null;
    }

    if (result.assets?.length > 0) {
        return result.assets[0];
    }

    showToast('No photo captured');
    return null;
};

export const openGallery = async () => {
    const granted = await requestGalleryPermission();
    if (!granted) { return { denied: true }; }

    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });

    if (result.didCancel) { return null; }
    if (result.errorCode) {
        console.error('Gallery error:', result.errorMessage);
        showToast('Gallery failed to open');
        return null;
    }

    if (result.assets?.length > 0) {
        return result.assets[0];
    }

    showToast('No image selected');
    return null;
};
