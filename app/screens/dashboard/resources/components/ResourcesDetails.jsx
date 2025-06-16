import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ResourcesDetails = () => {
    return (
        <View style={styles.container}>
            <Icon name="scale-balanced" size={30} color={colors.white} />
            <View>
                <Text style={styles.heading}>Legal Templates & Tools</Text>
                <Text style={styles.paragraph}>Curated contracts, pleadings, checklists, and guides for lawyers. Browse free and premium resources.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.black,
    },
    heading: {
        color: colors.white,
        ...fonts.semiBold(20),
    },
    paragraph: {
        width: '80%',
        ...fonts.regular(),
        color: colors.white,
    },
});

export default ResourcesDetails;
