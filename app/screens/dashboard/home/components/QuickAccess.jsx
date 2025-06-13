import { fonts, colors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, Pressable, StyleSheet, ScrollView } from 'react-native';

const tools = [
    { icon: 'folder-open', label: 'Files', iconColor: colors.blue5, screen: 'Storage' },
    { icon: 'briefcase', label: 'Client Funds', iconColor: colors.purple2, screen: 'Account' },
    { icon: 'gavel', label: 'Resources', iconColor: colors.green4, screen: 'Resources' },
    { icon: 'headset', label: 'Support', iconColor: colors.brown2, screen: 'Account' },
];

const QuickAccess = () => {
    const navigation = useNavigation();

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {tools.map((item, index) => (
                <Pressable key={index} style={styles.tool} onPress={() => navigation.navigate(item.screen)}>
                    <Icon name={item.icon} size={20} color={item.iconColor} />
                    <Text style={styles.label}>{item.label}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 2,
        marginBottom: 18,
    },
    tool: {
        gap: 8,
        width: 80,
        height: 80,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    label: {
        lineHeight: 15,
        textAlign: 'center',
        color: colors.grey1,
        ...fonts.regular(12),
    },
});

export default QuickAccess;
