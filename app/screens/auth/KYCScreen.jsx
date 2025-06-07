import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';

const KYCScreen = () => {
    return (
        <View>
            <Text style={styles.heading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        padding: 20,
        color: colors.white,
        ...fonts.regular(20),
    },
});

export default KYCScreen;
