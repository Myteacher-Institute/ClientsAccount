import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, View, Linking, Pressable, StyleSheet } from 'react-native';
import { ClientsInput, ClientsButton, ClientsLayout, ClientsSelect } from '@/components';

const tickets = [
  { ref: '#12344', color: colors.green4, status: 'Resolved', time: '1 day ago', type: 'Legal document request' },
  { ref: '#12345', color: colors.brown2, status: 'In Progress', time: '2 hours ago', type: 'Technical issue with login' },
];

const contacts = [
  { icon: 'phone', color: colors.blue7, text: 'Call Support', contact: '+2349030006789' },
  { icon: 'envelope', color: colors.red0, text: 'Email Support', contact: 'support@clientsaccount.com' },
  { icon: 'whatsapp', color: colors.green4, text: 'WhatsApp Support', contact: '+2349030006789' },
];

const SupportCenter = () => {
  return (
    <ClientsLayout title="Support Center">
      <View style={styles.support}>
        <Text style={styles.header}>How can we help you?</Text>
        <View style={styles.request}>
          <Text style={styles.feedText}>Submit a Request</Text>
          <View style={styles.gaps}>
            <ClientsSelect
              darkMode
              label="Support Type"
              extraStyle={styles.input}
              onSelect={(val) => console.log('Selected:', val)}
              options={[
                'Select type',
                'Legal Inquiry',
                'Technical Inquiry',
                'General Inquiry',
              ]}
            />
            <ClientsInput label="Subject" placeholder="What's this about?" extraStyle={styles.input} />
            <ClientsInput multiline label="Message" placeholder="Describe your issue in detail..." extraStyle={styles.input} />
            <ClientsButton space={10} text="Submit Request" extraStyle={{ backgroundColor: colors.blue4 }} />
          </View>
        </View>
        <View style={styles.gaps}>
          {contacts.map((item, index) => {
            const contact = item.contact.replace('+', '');
            const url =
              item.icon === 'phone'
                ? `tel:${contact}`
                : item.icon === 'envelope'
                  ? `mailto:${contact}`
                  : `https://wa.me/${contact}?text=${encodeURIComponent('Hello, I need support.')}`;

            return (
              <Pressable key={index} onPress={() => Linking.openURL(url)}>
                <View style={styles.contact}>
                  <View style={[styles.contactIcon, { backgroundColor: item.color }]}>
                    <Icon name={item.icon} size={16} color={colors.white} />
                  </View>
                  <View style={styles.contactBox}>
                    <Text style={styles.contactType}>{item.text}</Text>
                    <Text style={styles.contactText}>{item.contact}</Text>
                  </View>
                  <Icon name="chevron-right" size={16} color={colors.grey4} />
                </View>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.gaps}>
          {tickets.map((item, index) => (
            <View key={index} style={styles.ticket}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketRef}>{item.ref}</Text>
                <Text style={[styles.ticketStatus, { backgroundColor: item.color }]}>{item.status}</Text>
              </View>
              <Text style={styles.ticketType}>{item.type}</Text>
              <Text style={styles.ticketTime}>{item.time}</Text>
            </View>
          ))}
        </View>
      </View>
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  support: {
    gap: 40,
    paddingBottom: '10%',
  },
  header: {
    marginBottom: -20,
    ...fonts.medium(20),
  },
  gaps: { gap: 10 },
  request: {
    gap: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.grey5,
  },
  feedText: {
    marginBottom: 4,
    ...fonts.medium(18),
    color: colors.white,
  },
  input: {
    borderColor: colors.grey7,
    backgroundColor: colors.grey1,
  },
  contact: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.grey5,
    justifyContent: 'space-between',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBox: {
    flex: 1,
    marginLeft: 10,
  },
  contactType: {
    color: colors.white,
    ...fonts.regular(16),
  },
  contactText: {
    marginTop: -5,
    ...fonts.light(),
    color: colors.grey4,
  },
  ticket: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.grey5,
  },
  ticketHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketStatus: {
    borderRadius: 50,
    paddingVertical: 4,
    ...fonts.regular(12),
    color: colors.grey16,
    paddingHorizontal: 8,
  },
  ticketRef: {
    ...fonts.regular(),
    color: colors.white,
  },
  ticketType: {
    marginTop: 10,
    ...fonts.regular(),
    color: colors.grey0,
  },
  ticketTime: {
    ...fonts.light(12),
    color: colors.grey6,
  },
});

export default SupportCenter;
