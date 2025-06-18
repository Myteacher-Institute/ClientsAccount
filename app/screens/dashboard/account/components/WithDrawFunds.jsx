import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ClientsLayout from '@/components/ClientsLayout';
import ClientsButton from '@/components/ClientsButton';
import { fonts, colors } from '@/theme';

const WithDrawFundsScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  return (
    <ClientsLayout
      showHeader
      onBackPress={() => navigation.goBack()}
      title="Withdraw Funds"
      bgColor={colors.white}
    >
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <View style={styles.balanceAmountContainer}>
          <Text style={styles.balanceAmount}>₦100,000.00</Text>
          <TouchableOpacity style={styles.walletIconContainer}>
            <FontAwesome name="credit-card" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <Text style={styles.minimumText}>Minimum: $20</Text>

        <Text style={styles.label}>Bank Account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#888"
            value={bankAccount}
            onChangeText={setBankAccount}
          />
        </View>

        <View style={styles.helpContainer}>
            <Icon name="help-circle-outline" size={20} color={colors.black} />
            <Text style={styles.helpText}>Need help?</Text>
        </View>

        <ClientsButton
          text="Withdraw Now"
          onPress={() => console.log('Withdraw Now pressed')}
          bgColor={colors.black}
          textColor={colors.white}
          extraTextSty={styles.withdrawButtonText}
          extraBtnSty={styles.withdrawButton}
        />
      </View>
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.black,
    borderRadius: 20,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  balanceLabel: {
    ...fonts.regular(10),
    color: colors.grey2,
    fontWeight: 900,
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  balanceAmount: {
    ...fonts.bold(19),
    color: colors.white,
  },
  walletIconContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  label: {
    ...fonts.medium(14),
    color: colors.black,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  input: {
    ...fonts.regular(16),
    color: colors.black,
    height: 50,
  },
  minimumText: {
    ...fonts.regular(12),
    color: colors.grey2,
    marginBottom: 20,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 5,
  },
  helpText: {
    ...fonts.medium(14),
    color: colors.black,
  },
  withdrawButton: {
    borderWidth: 1,
    borderColor: colors.black,
  },
  withdrawButtonText: {
    ...fonts.bold(16),
  },
});

export default WithDrawFundsScreen;
