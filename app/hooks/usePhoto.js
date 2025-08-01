import { useState } from 'react';
import { useApi } from '@/hooks';
import { useToast } from '@/hooks/useToast';
import { useUser } from '@/context/UserContext';
import { selectAndCropImage, cropCircularImage } from '@/utils/media';
import { requestCameraPermission, requestGalleryPermission } from '@/utils/permissions';

export const usePhoto = () => {
    const { call } = useApi('patch');
    const { user, setUser } = useUser();
    const [modal, setModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showError, showSuccess } = useToast();
    const [tempImage, setTempImage] = useState(null);
    const [photoUri, setPhotoUri] = useState(user?.avatar || null);

    const closeModal = () => {
        setModal(null);
        setTempImage(null);
    };

    const handleSelect = async (source) => {
        const granted = source === 'camera' ? await requestCameraPermission() : await requestGalleryPermission();

        if (!granted) { return showError(`${source} permission denied`); }

        const asset = await selectAndCropImage(source);
        if (!asset?.uri) { return showError('No image selected'); }

        setTempImage(asset.uri);
        setModal('crop');
    };

    const handleUpload = async () => {
        if (!tempImage) { return; }

        try {
            setLoading(true);
            const cropped = await cropCircularImage(tempImage);

            const formData = new FormData();
            formData.append('avatar', {
                uri: cropped,
                type: 'image/jpeg',
                name: 'avatar.jpg',
            });

            const res = await call({
                data: formData,
                requiresAuth: true,
                dynamicId: user?._id,
                endpoint: 'updateAvatar',
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newAvatar = res?.url || res?.user?.avatar || res?.updatedUser?.avatar;
            if (newAvatar) {
                setUser(prev => ({ ...prev, avatar: newAvatar }));
                setPhotoUri(`${newAvatar}?t=${Date.now()}`);
                showSuccess('Profile photo updated!');
            } else {
                showError('Failed to update photo');
            }
        } catch (err) {
            console.error(err);
            showError('Upload failed');
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    return { user, modal, loading, photoUri, tempImage, closeModal, handleSelect, handleUpload, openViewPhoto: () => setModal('view'), openOptions: () => setModal('options') };
};
