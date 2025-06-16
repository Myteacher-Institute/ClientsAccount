import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import ClientsButton from '@/components/ClientsButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const StorageDetails = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Icon name="folder-open" size={25} color={colors.white} />
                <Text style={styles.contentText}>Your Storage</Text>
            </View>
            <View style={styles.memory}>
                <Text style={styles.used}>8.2 GB</Text>
                <Text style={styles.space}>of 15 GB used</Text>
                <View style={styles.visual}><View style={styles.progress} /></View>
                <View style={styles.memoryContent}>
                    <Text style={styles.memoryText}>0GB</Text>
                    <Text style={styles.memoryText}>15GB</Text>
                </View>
            </View>
            <ClientsButton text="Upgrade Storage" textColor={colors.blue9} extraStyle={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: colors.black,
    },
    content: {
        gap: 12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    contentText: {
        color: colors.white,
        ...fonts.medium(18),
    },
    memory: {
        gap: 15,
        width: '100%',
        alignItems: 'center',
    },
    used: {
        color: colors.white,
        ...fonts.semiBold(30),
    },
    space: {
        marginTop: -20,
        ...fonts.regular(),
        color: colors.white,
    },
    visual: {
        height: 8,
        width: '100%',
        borderRadius: 10,
        marginBottom: -10,
        backgroundColor: colors.offWhite3,
    },
    progress: {
        width: '50%',
        height: '100%',
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: colors.white,
    },
    memoryContent: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    memoryText: {
        ...fonts.light(12),
        color: colors.white,
    },
    button: {
        width: '65%',
        backgroundColor: colors.offWhite2,
    },
});

export default StorageDetails;
