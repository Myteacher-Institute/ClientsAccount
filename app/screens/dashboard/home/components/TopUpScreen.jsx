import { fonts, colors } from '@/theme';
import { useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsButton, ClientsLayout } from '@/components';
import { View, Text, Modal, Pressable, UIManager, StyleSheet, findNodeHandle, TouchableWithoutFeedback } from 'react-native';

const paymentMethods = ['Via Debit Card', 'Via Bank Transfer'];
const topUps = [
  { date: 'May 22', amount: '₦50,000', method: 'Via Debit Card' },
  { date: 'May 18', amount: '₦20,000', method: 'Via Bank Transfer' },
];

const PickerModal = ({ visible, onClose, options, onSelect, position }) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay} />
    </TouchableWithoutFeedback>
    <View style={[styles.modalContent, { top: position.top + 60, left: position.left }]}>
      {options.map(option => <Text key={option} onPress={() => onSelect(option)} style={styles.optionText}>{option}</Text>)}
    </View>
  </Modal>
);

const TopUpScreen = () => {
  const { user } = useUser();
  const InputRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 100, left: 50 });

  const openPicker = () => {
    const handle = findNodeHandle(InputRef.current);
    if (handle) {
      UIManager.measure(handle, (_, __, ___, ____, pageX, pageY) => {
        setPickerPos({ top: pageY, left: pageX });
        setPickerVisible(true);
      });
    }
  };

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
          extraStyle={styles.input}
          iconColor={colors.yellow2}
          placeholder="Enter amount"
        />

        <Pressable ref={InputRef} onPress={openPicker}>
          <ClientsInput
            editable={false}
            pointerEvents="none"
            value={paymentMethod}
            rightIcon="chevron-down"
            iconColor={colors.grey11}
            darkLabel="Payment Method"
            placeholder="Select method"
          />
        </Pressable>

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

      <PickerModal
        position={pickerPos}
        options={paymentMethods}
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={(method) => { setPaymentMethod(method); setPickerVisible(false); }}
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
  input: {
    borderColor: colors.yellow2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContent: {
    padding: 10,
    width: '60%',
    elevation: 5,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: colors.grey12,
  },
  optionText: {
    padding: 10,
    color: colors.white,
    ...fonts.regular(12),
  },
});

export default TopUpScreen;
