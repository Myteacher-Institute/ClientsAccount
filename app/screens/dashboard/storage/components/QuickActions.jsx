import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, View, Pressable, StyleSheet } from 'react-native';

const actions = [
    { icon: 'upload', label: 'Upload', iconColor: colors.blue7, screen: 'Storage' },
    { icon: 'folder-plus', label: 'New Folder', iconColor: colors.green4, screen: 'Resources' },
    { icon: 'share-nodes', label: 'Share', iconColor: colors.blue2, screen: 'Account' },
];

const QuickActions = () => {
    return (
        <View style={styles.container}>
            {actions.map((item, index) => (
                <Pressable key={index} style={styles.action}>
                    <Icon name={item.icon} size={20} color={item.iconColor} />
                    <Text style={styles.label}>{item.label}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    action: {
        gap: 4,
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    label: {
        textAlign: 'center',
        color: colors.grey5,
        ...fonts.regular(12),
    },
});

export default QuickActions;
