import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const tools = [
    { icon: 'scale-balanced', label: 'Files', iconColor: colors.blue5 },
    { icon: 'book-open', label: 'Client Funds', iconColor: colors.green4 },
    { icon: 'users', label: 'Resources', iconColor: colors.brown2 },
    { icon: 'briefcase', label: 'Support', iconColor: colors.brown2 },
];

const QuickAccess = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {tools.map(({ icon, label, iconColor }) => (
                <View key={icon} style={styles.tool}>
                    <Icon name={icon} size={20} color={iconColor} />
                    <Text style={styles.label}>{label}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        paddingVertical: 5,
        overflow: 'scroll',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tool: {
        gap: 8,
        width: 80,
        height: 80,
        paddingHorizontal: 5,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    label: {
        textAlign: 'center',
        color: colors.grey1,
        ...fonts.regular(12),
    },
});

export default QuickAccess;
