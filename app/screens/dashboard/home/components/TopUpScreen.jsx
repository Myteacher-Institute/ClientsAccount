import { fonts, colors } from '@/theme';
import { useApi, useForm } from '@/hooks';
import { useUser } from '@/context/UserContext';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsButton, ClientsLayout, ClientsSelect } from '@/components';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  return `${day}${suffix} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
};

const TopUpScreen = ({ navigation }) => {
  const { user, topUps } = useUser();
  const { post, loading } = useApi();
  const { values, bind, validate } = useForm({ amount: 0.0 });

  const handleTransfer = async () => {
    if (!validate()) { return; }

    try {
      const response = await post({
        data: values,
        dynamicId: user.id,
        requiresAuth: true,
        endpoint: 'topUpWithCard',
        onErrorMessage: 'Top up failed',
        onSuccessMessage: 'Proceeding to top up',
      });

      navigation.navigate('PaymentScreen', { ...response?.result?.data });
    } catch (error) {
      console.log('[TopUpScreen] ❌ Transfer error:', error.message);
    }
  };

  const recentTopUps = [...(topUps || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <ClientsLayout title="Top Up">
      <Text style={styles.current}>Current Balance</Text>
      <Text style={styles.balance}>₦{user?.wallet?.accountBalance}</Text>

      <View style={styles.funds}>
        <ClientsInput
          {...bind('amount')}
          IconComponent={Icon}
          rightIcon="naira-sign"
          darkLabel="Amount to Add"
          placeholder="Enter amount"
        />

        <ClientsSelect
          darkLabel="Payment method"
          onSelect={(val) => console.log('Selected payment:', val)}
          options={['Select method', 'Bank Transfer', 'Master Card', 'Debit Card']}
        />

        <ClientsButton
          text="Add Funds"
          leftIcon="wallet"
          loading={loading}
          IconComponent={Icon}
          bgColor={colors.yellow2}
          textColor={colors.black}
          onPress={handleTransfer}
        />
      </View>

      <Text style={styles.heading}>Recent Top-ups</Text>

      {recentTopUps.length > 0 ? (
        recentTopUps.map(({ date, amount, method }, i) => (
          <View key={i} style={styles.topUps}>
            <View style={[styles.content, styles.topUpItem]}>
              <View style={styles.content}>
                <View style={styles.icon}>
                  <Icon name="arrow-down" size={20} color={colors.yellow2} />
                </View>
                <View>
                  <Text style={styles.amount}>{amount}</Text>
                  <Text style={styles.method}>{method}</Text>
                </View>
              </View>
              <Text style={styles.date}>{formatDate(date)}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.date}>No transactions made yet</Text>
      )}
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
