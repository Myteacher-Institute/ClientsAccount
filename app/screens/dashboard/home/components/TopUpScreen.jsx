import { fonts, colors } from '@/theme';
import { useUser } from '@/context/UserContext';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsButton, ClientsLayout, ClientsSelect } from '@/components';

const topUps = [
  { date: 'May 22', amount: '₦50,000', method: 'Via Debit Card' },
  { date: 'May 18', amount: '₦20,000', method: 'Via Bank Transfer' },
];

const TopUpScreen = () => {
  const { user } = useUser();

  return (
    <ClientsLayout title="Top Up">
      <Text style={styles.current}>Current Balance</Text>
      <Text style={styles.balance}>₦{user?.wallet?.accountBalance}</Text>

      <View style={styles.funds}>
        <ClientsInput
          type="currency"
          IconComponent={Icon}
          rightIcon="naira-sign"
          darkLabel="Amount to Add"
          placeholder="Enter amount"
        />

        <ClientsSelect
          label="Payment method"
          onSelect={(val) => console.log('Selected:', val)}
          options={[
            'Select method',
            'Bank Transfer',
            'Master Card',
            'Debit Card',
          ]}
        />

        <ClientsButton
          text="Add Funds"
          leftIcon="wallet"
          IconComponent={Icon}
          bgColor={colors.yellow2}
          textColor={colors.black}
        />
      </View>

      <Text style={styles.heading}>Recent Top-ups</Text>
      <View style={styles.topUps}>
        {topUps.map(({ date, amount, method }, i) => (
          <View key={i} style={[styles.content, styles.topUpItem]}>
            <View style={styles.content}>
              <View style={styles.icon}>
                <Icon name="arrow-down" size={20} color={colors.yellow2} />
              </View>
              <View>
                <Text style={styles.amount}>{amount}</Text>
                <Text style={styles.method}>{method}</Text>
              </View>
            </View>
            <Text style={styles.date}>{date}</Text>
          </View>
        ))}
      </View>
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  current: {
    alignSelf: 'center',
    color: colors.grey6,
    ...fonts.regular(12),
  },
  balance: {
    marginTop: -5,
    ...fonts.bold(30),
    alignSelf: 'center',
  },
  funds: {
    gap: 20,
    padding: 20,
    borderRadius: 15,
    marginVertical: 30,
    backgroundColor: colors.white,
  },
  heading: {
    marginBottom: 5,
    ...fonts.semiBold(16),
  },
  topUps: {
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  topUpItem: { paddingVertical: 12 },
  content: {
    gap: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite5,
  },
  amount: { ...fonts.semiBold() },
  method: {
    marginTop: -5,
    color: colors.grey4,
    ...fonts.regular(12),
  },
  date: {
    color: colors.grey6,
    ...fonts.regular(12),
  },
});

export default TopUpScreen;
