import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const folders = [
    { amount: 6, title: 'Litigation', color: colors.brown3 },
    { amount: 12, title: 'Contracts', color: colors.purple3 },
    { amount: 24, title: 'Clients', color: colors.green2 },
    { amount: 5, title: 'Research', color: colors.red5 },
];

const Folders = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Folders</Text>
                <Text style={styles.headerLink}>See all</Text>
            </View>
            <View style={styles.folders}>
                {folders.map((item, index) => (
                    <View key={index} style={[styles.header, styles.folder]}>
                        <Icon name="folder" size={20} color={item.color} />
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.amount}>{item.amount} folders</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { gap: 8, marginBottom: 40 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        color: colors.grey5,
        ...fonts.medium(16),
    },
    headerLink: {
        color: colors.blue5,
        ...fonts.medium(12),
    },
    folders: {
        gap: 15,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    folder: {
        padding: 12,
        flexGrow: 1,
        borderRadius: 12,
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    title: {
        marginLeft: 10,
        marginBottom: -5,
        ...fonts.medium(),
        color: colors.grey3,
    },
    amount: {
        marginLeft: 10,
        color: colors.grey6,
        ...fonts.regular(12),
    },
});

export default Folders;
