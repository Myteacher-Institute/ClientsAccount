import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission, requestGalleryPermission } from './permissions';

export const selectImage = async (source) => {
    try {
        const options = {
            quality: 0.9,
            mediaType: 'photo',
            includeBase64: false,
        };

        if (source === 'camera') {
            const granted = await requestCameraPermission();
            if (!granted) { return null; }
            const res = await launchCamera(options);
            if (res.didCancel || !res.assets?.length) { return null; }
            return { uri: res.assets[0].uri };
        } else {
            const granted = await requestGalleryPermission();
            if (!granted) { return null; }
            const res = await launchImageLibrary(options);
            if (res.didCancel || !res.assets?.length) { return null; }
            return { uri: res.assets[0].uri };
        }
    } catch (err) {
        console.error('Image select error:', err);
        return null;
    }
};
