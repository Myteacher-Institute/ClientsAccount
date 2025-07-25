import { useState } from 'react';
import { fonts, colors } from '@/theme';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsButton } from '@/components';

const resources = [
    {
        status: 'Free',
        type: 'Word, PDF',
        bgColor: colors.blue8,
        icon1: 'file-contract',
        iconColor: colors.blue7,
        title: 'NDA Agreement Template',
        content: 'Download a customizable Non- Disclosure Agreement for all use- cases.',
    },
    {
        status: 'Paid',
        type: 'Word, PDF',
        icon1: 'briefcase',
        bgColor: colors.brown5,
        iconColor: colors.brown4,
        title: 'Retainer Agreement',
        content: 'Professional retainer contract template for legal services.',
    },
    {
        type: 'PDF',
        status: 'Free',
        bgColor: colors.green5,
        icon1: 'clipboard-list',
        iconColor: colors.green4,
        title: 'Litigation Checklist',
        content: 'Step-by-step checklist for preparing litigation cases.',
    },
    {
        type: 'Word',
        status: 'Paid',
        icon1: 'copyright',
        bgColor: colors.purple5,
        iconColor: colors.purple2,
        title: 'IP Assignment Template',
        content: 'Comprehensive intellectual property assignment for clients.',
    },
    {
        type: 'PDF',
        status: 'Free',
        icon1: 'book-open',
        bgColor: colors.brown1,
        iconColor: colors.brown3,
        title: 'Startup Legal Guide',
        content: 'A guide for startups on essential legal requirements.',
    },
];

const LegalResources = () => {
    const [filter, setFilter] = useState('All');

    const FILTERS = ['All', 'Free', 'Paid'];
    const filtered = filter === 'All' ? resources : resources.filter(r => r.status === filter);

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <ClientsInput leftIcon="search" placeholder="Search resources..." />
                <View style={styles.filter}><Icon name="sliders" size={16} color={colors.grey6} /></View>
            </View>

            <View style={styles.search}>
                {FILTERS.map((label) => {
                    const active = filter === label;
                    return (
                        <ClientsButton
                            rounded
                            key={label}
                            text={label}
                            outline={!active}
                            extraStyle={styles.button}
                            onPress={() => setFilter(label)}
                            bgColor={active ? colors.blue7 : 'transparent'}
                            textColor={active ? colors.white : colors.blue5}
                        />
                    );
                })}
            </View>

            <View style={styles.resources}>
                {filtered.map((item, i) => (
                    <View key={i} style={[styles.search, styles.resource]}>
                        <View style={[styles.icon, { backgroundColor: item.bgColor }]}>
                            <Icon name={item.icon1} size={20} color={item.iconColor} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={[styles.search, styles.stats]}>
                                <Text style={[styles.status, item.status === 'Free' ? styles.free : styles.paid]}>{item.status}</Text>
                                <Text style={[styles.paragraph, styles.type]}>{item.type}</Text>
                            </View>
                            <Text style={styles.paragraph}>{item.content}</Text>
                        </View>
                        <Icon
                            size={20}
                            name={item.status === 'Free' ? 'download' : 'lock'}
                            color={item.status === 'Free' ? colors.blue7 : colors.brown4}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { gap: 10, marginBottom: 20 },
    search: {
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filter: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderColor: colors.grey10,
    },
    button: {
        flex: 1,
        height: 40,
        borderColor: colors.blue10,
        boxShadow: '0px 0.5px 1px 0px rgba(0, 0, 0, 0.10), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.10)',
    },
    resources: { gap: 16 },
    resource: {
        padding: 10,
        borderRadius: 12,
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: { flex: 1 },
    stats: { gap: 5, justifyContent: 'flex-start' },
    title: { color: colors.grey5, ...fonts.medium(16) },
    status: {
        borderRadius: 50,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    type: { color: colors.grey5 },
    paragraph: { ...fonts.light(12), color: colors.grey7 },
    free: { color: colors.green4, backgroundColor: colors.green5 },
    paid: { color: colors.red0, backgroundColor: colors.brown6 },
});

export default LegalResources;
