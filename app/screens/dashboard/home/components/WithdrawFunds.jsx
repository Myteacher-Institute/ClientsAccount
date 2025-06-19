import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';
import { ClientsInput, ClientsButton, ClientsLayout } from '@/components';

const WithdrawFunds = ({ navigation }) => {
  return (
    <ClientsLayout title="Withdraw Funds">
      <View style={styles.balance}>
        <View>
          <Text style={styles.available}>Available Balance</Text>
          <Text style={styles.amount}>₦100,000.00</Text>
        </View>
        <View style={styles.wallet}>
          <Icon name="wallet" size={24} color={colors.white} />
        </View>
      </View>

      <View style={styles.withdraw}>
        <ClientsInput type="currency" darkLabel="Amount" />
        <Text style={styles.minimum}>Minimum: $20</Text>
        <ClientsInput type="number" darkLabel="Bank Account" />

        <View style={styles.help}>
          <Icon name="help-circle-outline" size={15} color={colors.black} />
          <Text style={styles.helpText} onPress={() => navigation.navigate('Account', { screen: 'SupportCenter' })}>Need help?</Text>
        </View>

        <ClientsButton text="Withdraw Now" onPress={() => navigation.navigate('WithdrawToBank')} />
      </View>
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  balance: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.black,
    justifyContent: 'space-between',
    boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.10), 0px 10px 15px 0px rgba(0, 0, 0, 0.10)',
  },
  available: {
    ...fonts.light(12),
    color: colors.grey13,
  },
  amount: {
    ...fonts.bold(24),
    color: colors.white,
  },
  wallet: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.offWhite4,
  },
  withdraw: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.white,
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
  },
  minimum: {
    marginBottom: 20,
    ...fonts.light(12),
    color: colors.grey4,
  },
  help: {
    gap: 5,
    marginTop: 50,
    marginBottom: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  helpText: { ...fonts.regular() },
});

export default WithdrawFunds;
