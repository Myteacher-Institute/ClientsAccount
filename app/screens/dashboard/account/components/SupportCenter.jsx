import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsButton, ClientsLayout } from '@/components';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const supportOptions = [
  {
    icon: 'desktop',
    title: 'Technical Support',
    description: 'App issues, bugs, login problems',
  },
  {
    icon: 'scale-balanced',
    title: 'Legal Inquiries',
    description: 'Ask about legal processes or connect with a lawyer',
  },
  {
    icon: 'circle-question',
    title: 'Other Support',
    description: 'General queries, feedback or account help',
  },
];

const contactMethods = [
  { icon: 'envelope', text: 'Email Support' },
  { icon: 'phone-volume', text: 'Call Us' },
  { icon: 'whatsapp', text: 'WhatsApp Chat' },
];

const quickAnswers = [
  { text: 'How to reset my password?' },
  { text: 'How to book a call with a lawyer?' },
];

const SupportCenter = ({ navigation }) => {
  return (
    <ClientsLayout title="Support Center">
      <View style={styles.headerSection}>
        <View style={styles.headerIconContainer}>
          <Icon name="headset" size={40} color={colors.black} />
        </View>
        <Text style={styles.headerTitle}>How can we help you?</Text>
        <Text style={styles.headerSubtitle}>
          Our team is here for clients and lawyers. Choose a support option below or start a chat.
        </Text>
      </View>

      {supportOptions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.optionItem}>
          <View style={styles.optionIconContainer}>
            <Icon name={item.icon} size={24} color={colors.yellow1} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>{item.title}</Text>
            <Text style={styles.optionDescription}>{item.description}</Text>
          </View>
          <Icon name="chevron-right" size={16} color={colors.yellow1} />
        </TouchableOpacity>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><Icon name="comments" size={20} color={colors.yellow1} /> Contact Us Directly</Text>
        {contactMethods.map((item, index) => (
          <TouchableOpacity key={index} style={styles.contactItem}>
            <Icon name={item.icon} size={20} color={colors.yellow1} />
            <Text style={styles.contactText}>{item.text}</Text>
            <Icon name="chevron-right" size={16} color={colors.yellow1} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><Icon name="circle-question" size={20} color={colors.yellow1} /> Quick Answers</Text>
        {quickAnswers.map((item, index) => (
          <TouchableOpacity key={index} style={styles.quickAnswerItem}>
            <Text style={styles.quickAnswerText}>{item.text}</Text>
            <Icon name="chevron-right" size={16} color={colors.yellow1} />
          </TouchableOpacity>
        ))}
      </View>

      <ClientsButton
        rounded
        text="Start Live Chat"
        bgColor={colors.yellow1}
        textColor={colors.black}
        extraStyle={styles.button}
        leftIcon="chatbubble-ellipses"
        space={{ top: 20, bottom: 40 }}
      />
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    marginBottom: 20,
  },
  headerIconContainer: {
    backgroundColor: colors.yellow1,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    ...fonts.bold(22),
    color: colors.white,
    marginBottom: 10,
  },
  headerSubtitle: {
    ...fonts.regular(14),
    color: colors.grey2,
    textAlign: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 15,
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  optionIconContainer: {
    backgroundColor: 'rgba(255, 221, 0, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    ...fonts.bold(16),
    color: colors.white,
  },
  optionDescription: {
    ...fonts.regular(12),
    color: colors.grey2,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    ...fonts.bold(18),
    color: colors.white,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  contactText: {
    flex: 1,
    ...fonts.medium(16),
    color: colors.white,
    marginLeft: 15,
  },
  quickAnswerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  quickAnswerText: {
    ...fonts.medium(16),
    color: colors.white,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 28,
  },
});

export default SupportCenter;
