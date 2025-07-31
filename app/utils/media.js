import { Platform, PermissionsAndroid, ToastAndroid, Alert, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoManipulator from 'react-native-photo-manipulator';

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

/**
 * ✅ Opens camera or gallery, returns raw image
 */
const pickImage = async (source) => {
    try {
        if (source === 'camera') {
            const granted = await requestCameraPermission();
            if (!granted) { return { denied: true }; }
            return await ImagePicker.openCamera({ cropping: false, compressImageQuality: 0.8 });
        } else {
            const granted = await requestGalleryPermission();
            if (!granted) { return { denied: true }; }
            return await ImagePicker.openPicker({ cropping: false, compressImageQuality: 0.8 });
        }
    } catch (err) {
        console.error(`${source} error:`, err);
        showToast(`${source} failed`);
        return null;
    }
};

/**
 * ✅ Main function to use in AccountProfile
 * Handles selection & circular crop
 */
export const selectAndCropImage = async (source) => {
    const raw = await pickImage(source);
    if (!raw || raw.didCancel) { return null; }

    // Return raw image path for preview, cropping happens in modal
    return {
        uri: raw.path,
        width: raw.width,
        height: raw.height,
        mime: raw.mime,
    };
};

/**
 * ✅ Crops the image circularly
 */
export const cropCircularImage = async (uri, size = 400) => {
    try {
        const result = await PhotoManipulator.crop(uri, { x: 0, y: 0, width: size, height: size });
        return result;
    } catch (err) {
        console.error('Circular crop failed:', err);
        return uri;
    }
};
