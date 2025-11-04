import { useState } from 'react';
import { useToast } from '@/hooks';
import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import ClientsButton from '@/components/ClientsButton';
import { View, Text, Linking, Dimensions, ScrollView, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const updates = [
    {
        key: 'whatsapp',
        button: 'Chat',
        color: colors.green0,
        icon: 'logo-whatsapp',
        label: "Don't Have Your CAC?",
        content: "Let's help you get\nyour CAC Number",
    },
    {
        icon: 'book',
        button: 'Learn',
        key: 'resources',
        label: 'Resources',
        color: colors.blue1,
        content: 'Helpful resources\nfor your practice',
    },
    {
        key: 'account',
        icon: 'wallet',
        button: 'View',
        label: 'Client Funds',
        color: colors.purple2,
        content: 'Manage your client\naccount securely',
    },
];

export default function AccountUpdates() {
    const toast = useToast();
    const { user } = useUser();
    const [index, setIndex] = useState(0);
    const isVerified = user?.kyc?.verificationStatus === 'verified'; // Adjust property as needed
    const filteredUpdates = isVerified ? updates.slice(1) : updates;

    const handlePress = (key) => {
        const phone = '2349033935712';
        const actions = {
            whatsapp: () => {
                const text = encodeURIComponent(
                    `Hello, my name is ${user?.fullName}. I need help with my CAC registration.`
                );
                Linking.openURL(`https://wa.me/${phone}?text=${text}`).catch(() =>
                    toast.showWarning('Unable to open WhatsApp')
                );
            },
            resources: () => toast.showSuccess('Navigating to Resources...'),
            account: () => toast.showSuccess('Opening Client Funds...'),
        };
        actions[key]?.();
    };

    const onScroll = (e) => {
        const i = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
        if (i !== index) { setIndex(i); }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                {filteredUpdates.map(({ key, icon, label, content, button, color }) => (
                    <View key={key} style={[styles.card, { backgroundColor: color }]}>
                        <View>
                            <Text style={styles.label}>{label}</Text>
                            <Text style={styles.content}>{content}</Text>
                        </View>
                        <ClientsButton
                            text={button}
                            leftIcon={icon}
                            textColor={color}
                            bgColor={colors.white}
                            onPress={() => handlePress(key)}
                        />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.dots}>
                {filteredUpdates.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === index ? styles.activeDot : styles.inactiveDot]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        marginBottom: 18,
    },
    scrollView: { gap: 5 },
    card: {
        gap: 5,
        height: 100,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        width: (screenWidth - 40),
        justifyContent: 'space-between',
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    label: {
        color: colors.white,
        ...fonts.medium(16),
    },
    content: {
        marginTop: 10,
        ...fonts.regular(),
        color: colors.white,
    },
    dots: {
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        height: 2,
        borderRadius: 1,
    },
    activeDot: {
        width: 15,
        backgroundColor: colors.black,
    },
    inactiveDot: {
        width: 5,
        backgroundColor: colors.grey4,
    },
});
