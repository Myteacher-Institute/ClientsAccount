import { useState } from 'react';
import { useApi, useToast } from '@/hooks';
import { selectImage } from '@/utils/media';
import { useUser } from '@/context/UserContext';

export const useMedia = () => {
    const { call } = useApi('patch');
    const { user, setUser } = useUser();
    const [modal, setModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showError, showSuccess } = useToast();
    const [tempImage, setTempImage] = useState(null);
    const [photoUri, setPhotoUri] = useState(user?.avatar || null);

    const closeModal = () => { setModal(null); setTempImage(null); };

    const pickImage = async (source) => {
        const asset = await selectImage(source);
        if (!asset?.uri) { return showError('No image selected'); }
        setTempImage(asset.uri);
        setModal('crop');
    };

    const saveCrop = () => tempImage && upload(tempImage);

    const upload = async (uri) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', { uri, type: 'image/jpeg', name: 'avatar.jpg' });

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

    return {
        user,
        modal,
        loading,
        photoUri,
        tempImage,
        saveCrop,
        pickImage,
        closeModal,
        openViewPhoto: () => setModal('view'),
        openOptions: () => setModal('options'),
    };
};
