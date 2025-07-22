import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsButton, ClientsLayout } from '@/components';
import { Text, View, Linking, Pressable, StyleSheet } from 'react-native';

const tickets = [
  { ref: '#12344', color: colors.green4, status: 'Resolved', time: '1 day ago', type: 'Legal document request' },
  { ref: '#12345', color: colors.brown2, status: 'In Progress', time: '2 hours ago', type: 'Technical issue with login' },
];

const contacts = [
  { icon: 'phone', color: colors.blue7, text: 'Call Support', contact: '+2349030006789' },
  { icon: 'envelope', color: colors.red0, text: 'Email Support', contact: 'support@clientsaccount.com' },
  { icon: 'whatsapp', color: colors.green4, text: 'WhatsApp Support', contact: '+2349030006789' },
];

const SupportCenter = ({ navigation }) => {
  return (
    <ClientsLayout title="Support Center">
      <View style={styles.support}>
        <Text style={styles.header}>Submit Request</Text>
        <View>
          <Text>Support Type</Text>
          <Text>Subject</Text>
          <Text>Message</Text>
          <Text>Priority</Text>
          <ClientsInput />
          <View style={styles.button}>
            <ClientsButton text="Low" />
            <ClientsButton text="Medium" />
            <ClientsButton text="High" />
          </View>
          <ClientsButton text="Send Inquiry" />
        </View>
      </View>
      <View style={styles.support}>
        <Text style={styles.header}>Quick Contact</Text>
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
      <View style={styles.support}>
        <Text style={styles.header}>Recent Ticket</Text>
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
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  header: { ...fonts.regular(18) },
  support: {
    gap: 10,
    marginBottom: 24,
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
