import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';

const typeColors = {
    error: colors.red6,
    success: colors.green7,
    warning: colors.yellow3,
};

const ClientsToast = ({ toast }) => {
    if (!toast) { return null; }

    return (
        <View style={[styles.toast, { backgroundColor: typeColors[toast.type] || colors.black }]}>
            <Text style={styles.text}>{toast.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    toast: {
        top: 60,
        right: '5%',
        zIndex: 100,
        padding: 16,
        maxWidth: 300,
        borderRadius: 8,
        position: 'absolute',
        justifyContent: 'center',
    },
    text: {
        ...fonts.regular(),
        color: colors.white,
    },
});

export default ClientsToast;
