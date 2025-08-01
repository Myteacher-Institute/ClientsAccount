import { Alert, Linking, Platform, PermissionsAndroid } from 'react-native';

const askPermission = async (permission, rationale) => {
    try {
        const result = await PermissionsAndroid.request(permission, rationale);
        if (result === PermissionsAndroid.RESULTS.GRANTED) { return true; }

        if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
                'Permission Required',
                'Please enable this permission in settings.',
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
        return await askPermission(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Camera Permission',
            message: 'We need access to your camera to take profile photos.',
            buttonPositive: 'OK',
        });
    }
    return true;
};

export const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
        const permission = Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        return await askPermission(permission, {
            title: 'Gallery Permission',
            message: 'We need access to your photos to update your profile picture.',
            buttonPositive: 'OK',
        });
    }
    return true;
};
