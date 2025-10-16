import { useRef, useState } from 'react';
import { useApi, useToast } from '@/hooks';
import { selectImage } from '@/utils/media';
import { useUser } from '@/context/UserContext';

export const useMedia = () => {
    const cropRef = useRef(null);
    const { user, setUser } = useUser();
    const { patch, loading } = useApi();
    const [modal, setModal] = useState(null);
    const { showError, showSuccess } = useToast();
    const [tempImage, setTempImage] = useState(null);
    const [photoUri, setPhotoUri] = useState(user?.avatar || null);

    const closeModal = () => {
        console.log('[Media] Closing modal');
        setModal(null);
        setTempImage(null);
    };

    const pickImage = async (source) => {
        console.log('[Media] Picking image from:', source);
        const asset = await selectImage(source);
        console.log('[Media] Image selected:', asset);
        if (!asset?.uri) {
            showError('No image selected');
            return;
        }
        setTempImage(asset.uri);
        setModal('crop');
    };

    const saveCrop = () => {
        if (!cropRef.current) {
            console.log('[Media] CropRef is not ready');
            return;
        }
        console.log('[Media] Triggering saveImage...');
        cropRef.current.saveImage(true, 100); // no await, fires onImageCrop
    };

    const onImageCrop = async (result) => {
        console.log('[Media] onImageCrop fired with:', result);
        if (!result?.uri) {
            showError('No cropped image returned');
            return;
        }
        await upload(result.uri);
    };

    const upload = async (uri) => {
        console.log('[Media] Uploading image:', uri);

        try {
            const normalizedUri = uri.startsWith('file://') ? uri : `file://${uri}`;
            const formData = new FormData();
            formData.append('avatar', {
                uri: normalizedUri,
                type: 'image/jpeg',
                name: 'avatar.jpg',
            });

            console.log('[Media] FormData built with normalized URI:', normalizedUri);

            const res = await patch({
                data: formData,
                requiresAuth: true,
                dynamicId: user?._id,
                endpoint: 'updateAvatar',
            });

            console.log('[Media] API response:', res);

            const newAvatar = res?.url || res?.user?.avatar || res?.updatedUser?.avatar;
            if (newAvatar) {
                setUser(prev => ({ ...prev, avatar: newAvatar }));
                setPhotoUri(`${newAvatar}?t=${Date.now()}`);
                showSuccess('Profile photo updated!');
                closeModal();
            } else {
                console.warn('[Media] No avatar URL returned in response');
                showError('Failed to update photo');
            }
        } catch (err) {
            console.error('[Media] ❌ Upload failed:', err.message);
            showError('Upload failed');
        }
    };

    return {
        user,
        modal,
        cropRef,
        loading,
        photoUri,
        saveCrop,
        tempImage,
        pickImage,
        closeModal,
        onImageCrop,
        openViewPhoto: () => setModal('view'),
        openOptions: () => setModal('options'),
    };
};
