import {fonts, colors} from '@/theme';
import {useUser} from '@/context/UserContext';
import {useApi, useForm} from '@/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet} from 'react-native';
import {ClientsInput, ClientsButton, ClientsLayout} from '@/components';

const initialValues = {
  amount: 0.0,
  accountNumber: '',
  bankName: '',
};

const required = Object.keys(initialValues);

const WithdrawFunds = ({navigation}) => {
  const {user, setUser} = useUser();
  const {bind, values, validate} = useForm(initialValues, required);
  const { patch, loading } = useApi();

  const handleWithdraw = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await patch({
        data: values,
        dynamicId: user.id,
        requiresAuth: true,
        endpoint: 'withdraw',
        onSuccessMessage: 'Withdrawal successful',
      });

      console.log('Withdraw ', response);
      setUser(response.user);

      navigation.replace('Dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientsLayout title="Withdraw Funds">
      <View style={styles.balance}>
        <View>
          <Text style={styles.available}>Available Balance</Text>
          <Text style={styles.amount}>₦{user?.wallet?.accountBalance}</Text>
        </View>
        <View style={styles.wallet}>
          <Icon name="wallet" size={24} color={colors.white} />
        </View>
      </View>

      <View style={styles.withdraw}>
        <ClientsInput type="number" darkLabel="Amount" {...bind('amount')} />
        <Text style={styles.minimum}>Minimum: ₦1,000</Text>
        <ClientsInput
          type="number"
          darkLabel="Bank Account"
          {...bind('accountNumber')}
        />
        <ClientsInput darkLabel="Bank Name" {...bind('bankName')} />

        <View style={styles.help}>
          <Icon name="help-circle-outline" size={15} color={colors.black} />
          <Text
            style={styles.helpText}
            onPress={() =>
              navigation.navigate('Account', {screen: 'SupportCenter'})
            }>
            Need help?
          </Text>
        </View>

        <ClientsButton
          text="Withdraw Now"
          loading={loading}
          onPress={handleWithdraw}
        />
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
    boxShadow:
      '0px 4px 6px 0px rgba(0, 0, 0, 0.10), 0px 10px 15px 0px rgba(0, 0, 0, 0.10)',
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
    gap: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.white,
    boxShadow:
      '0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
  },
  minimum: {
    marginTop: -20,
    ...fonts.light(12),
    color: colors.grey4,
  },
  help: {
    gap: 5,
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  helpText: {...fonts.regular()},
});

export default WithdrawFunds;
