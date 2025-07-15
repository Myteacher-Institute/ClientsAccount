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
        height: 50,
        right: '5%',
        padding: 16,
        zIndex: 100,
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
