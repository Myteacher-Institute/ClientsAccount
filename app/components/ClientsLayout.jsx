import { colors } from '@/theme';
import ClientsHeader from '@/components/ClientsHeader';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';

const ClientsLayout = ({
    children,
    title = null,
    rightIcon = null,
    showHeader = false,
    onBackPress = null,
    onRightPress = null,
    customHeader = null,
}) => {
    const isDark = useColorScheme() === 'dark';
    const shouldShowBack = showHeader || Boolean(title);
    const backgroundColor = isDark ? colors.offWhite : colors.offWhite;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {customHeader ? customHeader : shouldShowBack && (
                <ClientsHeader
                    title={title}
                    rightIcon={rightIcon}
                    onBackPress={onBackPress}
                    onRightPress={onRightPress}
                    backgroundColor={backgroundColor}
                />
            )}

            <ScrollView
                style={styles.content}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >{children}</ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: '5%' },
});

export default ClientsLayout;
