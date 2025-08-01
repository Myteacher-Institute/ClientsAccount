import ImagePicker from 'react-native-image-crop-picker';
import PhotoManipulator from 'react-native-photo-manipulator';
import { requestCameraPermission, requestGalleryPermission } from './permissions';

const pickImage = async (source) => {
    if (source === 'camera') {
        const granted = await requestCameraPermission();
        if (!granted) { return null; }
        return ImagePicker.openCamera({ cropping: false, compressImageQuality: 0.8 });
    } else {
        const granted = await requestGalleryPermission();
        if (!granted) { return null; }
        return ImagePicker.openPicker({ cropping: false, compressImageQuality: 0.8 });
    }
};

export const selectAndCropImage = async (source) => {
    const raw = await pickImage(source);
    if (!raw) { return null; }
    return { uri: raw.path, mime: raw.mime, width: raw.width, height: raw.height };
};

export const cropCircularImage = async (uri, size = 400) => {
    try {
        return await PhotoManipulator.crop(uri, { x: 0, y: 0, width: size, height: size });
    } catch (err) {
        console.error('Crop failed:', err);
        return uri;
    }
};
