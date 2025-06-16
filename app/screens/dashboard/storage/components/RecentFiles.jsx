import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const files = [
    {
        icon: 'file-pdf',
        color: colors.red3,
        title: 'Case_Johnson_2024.pdf',
        details: 'PDF • 2.1 MB • 2 days ago',
    },
    {
        icon: 'file-word',
        color: colors.blue4,
        title: 'Agreement_Draft.docx',
        details: 'Word • 380 KB • 1 day ago',
    },
    {
        icon: 'file-excel',
        color: colors.green4,
        title: 'Billing_2024.xlsx',
        details: 'Excel • 150 KB • 3 hrs ago',
    },
];

const RecentFiles = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Recent Files</Text>
                <Text style={styles.headerLink}>See all</Text>
            </View>
            <View style={styles.files}>
                {files.map((item, index) => (
                    <View key={index} style={[styles.header, styles.file, index === 1 && styles.border]}>
                        <View style={styles.header}>
                            <Icon name={item.icon} size={24} color={item.color} />
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.details}>{item.details}</Text>
                            </View>
                        </View>
                        <Icon name="ellipsis-vertical" size={15} color={colors.grey4} />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
        marginBottom: 20,
    },
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
    files: {
        borderRadius: 12,
        backgroundColor: colors.white,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    file: { padding: 14 },
    border: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBlockColor: colors.grey10,
    },
    title: {
        marginLeft: 10,
        marginBottom: -5,
        ...fonts.medium(),
        color: colors.grey3,
    },
    details: {
        marginLeft: 10,
        color: colors.grey6,
        ...fonts.regular(12),
    },
});

export default RecentFiles;
