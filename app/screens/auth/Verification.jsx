import { fonts, colors } from '@/theme';
import ClientsLayout from '@/components/ClientsLayout';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Verification = ({ navigation }) => {

    return (
        <ClientsLayout title="Verification">
            <View>
                <Text>Hello World!</Text>
            </View>
        </ClientsLayout>
    );
};

const styles = StyleSheet.create({
    section: {
        gap: 15,
        paddingBottom: '10%',
    },
});

export default Verification;
