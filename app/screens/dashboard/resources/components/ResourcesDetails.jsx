import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ResourcesDetails = () => {
    return (
        <View style={styles.container}>
            <Icon name="scale-balanced" size={30} color={colors.white} />
            <View style={styles.content}>
                <Text style={styles.heading}>Legal Templates & Tools</Text>
                <Text style={styles.paragraph}>{'Curated contracts, pleadings,\nchecklists, & guides for lawyers.\nBrowse free & premium resources.'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 15,
        borderRadius: 12,
        marginBottom: 20,
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        backgroundColor: colors.black,
    },
    content: {
        gap: 15,
        flex: 1,
    },
    heading: {
        color: colors.white,
        ...fonts.semiBold(20),
    },
    paragraph: {
        ...fonts.light(),
        color: colors.white,
    },
});

export default ResourcesDetails;
