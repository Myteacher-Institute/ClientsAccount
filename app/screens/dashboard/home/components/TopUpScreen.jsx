import { useState } from 'react';
import { fonts, colors } from '@/theme';
import { useApi, useForm } from '@/hooks';
import { useUser } from '@/context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text, View, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ClientsInput, ClientsButton, ClientsLayout, ClientsSelect } from '@/components';

const paymentMethods = ['Via Debit Card'];

const PickerModal = ({ visible, onClose, options, onSelect, position }) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay} />
    </TouchableWithoutFeedback>
    <View
      style={[
        styles.modalContent,
        { top: position.top + 60, left: position.left },
      ]}>
      {options.map(option => (
        <Text
          key={option}
          onPress={() => onSelect(option)}
          style={styles.optionText}>
          {option}
        </Text>
      ))}
    </View>
  </Modal>
);

const initialValues = {
  amount: 0.0,
};

const required = Object.keys(initialValues);

const TopUpScreen = ({ navigation }) => {
  const { user, topUps } = useUser();
  const { loading, call: callApi } = useApi('fetchpost');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 100, left: 50 });
  const { values, bind, validate } = useForm(initialValues, required);

  const dateFormatter = dateString => {
    const date = new Date(dateString);

    // Add 'st', 'nd', 'rd', or 'th' suffix manually
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
          ? 'nd'
          : day % 10 === 3 && day !== 13
            ? 'rd'
            : 'th';

    const finalDate = `${day}${suffix} ${date.toLocaleString('default', {
      month: 'long',
    })}, ${date.getFullYear()}`;

    return finalDate;
  };

  const recentTopUp = topUps.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const handleTransfer = async () => {
    if (!validate()) {
      return;
    }

    const data = JSON.stringify(values);

    try {
      const response = await callApi({
        data: data,
        dynamicId: user.id,
        requiresAuth: true,
        endpoint: 'topUpWithCard',
        onSuccessMessage: 'Proceeding to top up',
      });

      const { result } = response;
      navigation.navigate('PaymentScreen', { ...result.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientsLayout title="Top Up">
      <Text style={styles.current}>Current Balance</Text>
      <Text style={styles.balance}>₦{user?.wallet?.accountBalance}</Text>

      <View style={styles.funds}>
        <ClientsInput
          IconComponent={Icon}
          rightIcon="naira-sign"
          darkLabel="Amount to Add"
          placeholder="Enter amount"
          {...bind('amount')}
        />

        <ClientsSelect
          darkLabel="Payment method"
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
          loading={loading}
          onPress={handleTransfer}
        />
      </View>

      <Text style={styles.heading}>Recent Top-ups</Text>
      <View style={styles.topUps}>
        {recentTopUp.length > 0
          ? recentTopUp.map(
            ({ date, amount, method }, i) =>
              i <= 1 && (
                <View key={i} style={[styles.content, styles.topUpItem]}>
                  <View style={styles.content}>
                    <View style={styles.icon}>
                      <Icon
                        name="arrow-down"
                        size={20}
                        color={colors.yellow2}
                      />
                    </View>
                    <View>
                      <Text style={styles.amount}>{amount}</Text>
                      <Text style={styles.method}>{method}</Text>
                    </View>
                  </View>
                  <Text style={styles.date}>{dateFormatter(date)}</Text>
                </View>
              ),
          )
          : null}
      </View>

      <PickerModal
        position={pickerPos}
        options={paymentMethods}
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={method => {
          setPaymentMethod(method);
          setPickerVisible(false);
        }}
      />
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
