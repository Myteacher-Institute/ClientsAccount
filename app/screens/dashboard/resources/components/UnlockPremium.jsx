import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ClientsButton from '@/components/ClientsButton';

const UnlockPremium = () => {
    return (
        <View style={styles.container}>
            <Icon name="diamond" size={30} color={colors.white} />
            <View style={styles.content}>
                <Text style={styles.heading}>Unlock All Premium Templates</Text>
                <Text style={styles.paragraph}>{'Get unlimited access to all paid resources.'}</Text>
            </View>
            <ClientsButton rounded isLight text="Upgrade" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 15,
        borderRadius: 16,
        marginBottom: 40,
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        backgroundColor: colors.black,
    },
    content: {
        gap: 10,
        flex: 1,
    },
    heading: {
        color: colors.white,
        ...fonts.medium(16),
    },
    paragraph: {
        color: colors.blue6,
        ...fonts.regular(12),
    },
});

export default UnlockPremium;
