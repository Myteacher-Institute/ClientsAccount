import { fonts, colors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

const resources = [
    { icon: 'scale-balanced', label: 'Legal Templates', bgColor: colors.blue8, iconColor: colors.blue5 },
    { icon: 'book-open', label: 'Guides & Laws', bgColor: colors.green5, iconColor: colors.green4 },
    { icon: 'users', label: 'Community', bgColor: colors.brown1, iconColor: colors.brown2 },
];

const HelpFulResources = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerRecent}>HelpFul Resources</Text>
                <Text style={styles.headerLink} onPress={() => navigation.navigate('Resources')}>Browse</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.resources}>
                {resources.map(({ icon, label, bgColor, iconColor }) => (
                    <View key={icon} style={[styles.resource, { backgroundColor: bgColor }]}>
                        <Icon name={icon} size={20} color={iconColor} />
                        <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 15,
        borderRadius: 12,
        marginBottom: 40,
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerRecent: {
        color: colors.grey5,
        ...fonts.medium(16),
    },
    headerLink: {
        color: colors.blue5,
        ...fonts.medium(12),
    },
    resources: { gap: 12 },
    resource: {
        gap: 8,
        width: 120,
        height: 100,
        borderRadius: 12,
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    label: {
        textAlign: 'center',
        ...fonts.medium(12),
    },
});

export default HelpFulResources;
