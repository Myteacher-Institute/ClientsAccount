import ImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermission, requestGalleryPermission } from './permissions';

export const selectImage = async (source) => {
    try {
        const opts = {
            cropping: true,
            mediaType: 'photo',
            hideBottomControls: true,
            compressImageQuality: 0.9,
            cropperCircleOverlay: true,
            freeStyleCropEnabled: true,
        };

        if (source === 'camera') {
            const granted = await requestCameraPermission();
            if (!granted) { return null; }
            const img = await ImagePicker.openCamera(opts);
            return { uri: img.path };
        } else {
            const granted = await requestGalleryPermission();
            if (!granted) { return null; }
            const img = await ImagePicker.openPicker(opts);
            return { uri: img.path };
        }
    } catch (err) {
        console.error('Image select error:', err);
        return null;
    }
};
