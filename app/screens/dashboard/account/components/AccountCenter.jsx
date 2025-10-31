import {fonts, colors} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const infos = [
  {
    color: colors.blue4,
    screen: 'WalletScreen',
    title: 'Wallet & Accounts',
    icon: 'folder-account-outline',
    content: 'Balance & linked bank',
  },
  {
    color: colors.grey1,
    icon: 'lock-outline',
    screen: 'SecurityScreen',
    title: 'Password & Security',
    content: 'Change password, 2FA',
  },
  {
    icon: 'link-variant',
    color: colors.green6,
    title: 'Linked Accounts',
    screen: 'LinkedAccountsScreen',
    content: 'Google, Apple, Others',
  },
  {
    color: colors.brown3,
    icon: 'bell-outline',
    title: 'Notifications',
    screen: 'NotificationsScreen',
    content: 'Email & Push notifications',
  },
  {
    color: colors.purple4,
    title: 'Help & Support',
    screen: 'SupportCenter',
    icon: 'help-circle-outline',
    content: 'FAQs, Contact support',
  },
  {
    title: 'About App',
    color: colors.grey4,
    icon: 'alert-circle',
    screen: 'AboutScreen',
    content: 'Version & Legal',
  },
];

const AccountCenter = () => {
  const navigation = useNavigation();
  const groups = [infos.slice(0, 3), infos.slice(3)];

  return groups.map((group, idx) => (
    <View key={idx} style={styles.container}>
      {group.map((item, index) => {
        const isLast = index === group.length - 1;
        return (
          <Pressable
            key={item.title}
            style={[styles.info, !isLast && styles.border]}
            onPress={() => navigation.navigate(item.screen)}>
            <View style={[styles.info, styles.mark]}>
              <Icon name={item.icon} size={20} color={item.color} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color={colors.grey4} />
          </Pressable>
        );
      })}
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 25,
    backgroundColor: colors.white,
    boxShadow:'0px 1px 2px rgba(0, 0, 0, 0.10), 0px 1px 3px rgba(0, 0, 0, 0.10)',
  },
  info: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: colors.grey10,
  },
  title: {
    color: colors.grey3,
    ...fonts.regular(16),
  },
  content: {
    marginTop: -5,
    ...fonts.light(12),
    color: colors.grey6,
  },
  mark: {
    gap: 10,
    padding: 0,
  },
});

export default AccountCenter;
