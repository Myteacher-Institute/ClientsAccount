import { fonts, colors } from '@/theme';
import { useRef, useState } from 'react';
import ClientsInput from '@/components/ClientsInput';
import ClientsButton from '@/components/ClientsButton';
import ClientsLayout from '@/components/ClientsLayout';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const paymentMethods = ['Via Debit Card', 'Via Bank Transfer'];
const topUps = [
  { date: 'May 22', amount: '₦50,000', method: 'Via Debit Card' },
  { date: 'May 18', amount: '₦20,000', method: 'Via Bank Transfer' },
];
const PickerModal = ({ visible, onClose, position, options, onSelect }) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay} />
    </TouchableWithoutFeedback>
    <View style={[styles.modalContent, position]}>
      {options.map((option) => (
        <TouchableOpacity key={option} style={styles.optionItem} onPress={() => onSelect(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </Modal>
);

const TopUpScreen = () => {
  const pickerRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const openPicker = () => {
    pickerRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownPos({ top: py + height, left: px, width });
      setPickerVisible(true);
    });
  };

  return (
    <ClientsLayout title="Top Up">
      <Text style={styles.current}>Current Balance</Text>
      <Text style={styles.balance}>₦100,000.00</Text>

      <View style={styles.funds}>
        <ClientsInput
          type="number"
          IconComponent={Icon}
          rightIcon="naira-sign"
          darkLabel="Amount to Add"
          extraStyle={styles.input}
          iconColor={colors.yellow2}
          placeholder="Enter amount"
        />

        <Text style={styles.label}>Payment Method</Text>
        <TouchableOpacity ref={pickerRef} style={[styles.content, styles.pickerContainer]} onPress={openPicker}>
          <Text style={styles.payment}>{paymentMethod || 'Select method'}</Text>
          <Icon name="angle-down" size={20} color={colors.grey11} />
        </TouchableOpacity>

        <ClientsButton
          space={20}
          text="Add Funds"
          leftIcon="wallet"
          IconComponent={Icon}
          bgColor={colors.yellow2}
          textColor={colors.black}
        />
      </View>

      <Text style={styles.heading}>Recent Top-ups</Text>
      <View style={styles.topUps}>
        {topUps.map(({ date, amount, method }, index) => (
          <View key={index} style={[styles.content, styles.topUpItem]}>
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
        position={dropdownPos}
        options={paymentMethods}
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={(method) => {
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
    padding: 20,
    borderRadius: 15,
    marginVertical: 30,
    backgroundColor: colors.white,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  label: { marginTop: 20, ...fonts.medium() },
  input: { borderColor: colors.yellow2, backgroundColor: colors.white },
  pickerContainer: {
    height: 50,
    marginTop: 2,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderColor: colors.grey10,
    backgroundColor: colors.offWhite1,
  },
  payment: { color: colors.grey11, ...fonts.regular(16) },
  heading: { marginBottom: 5, ...fonts.semiBold(16) },
  topUps: {
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
    backgroundColor: colors.yellow3,
  },
  amount: { ...fonts.semiBold() },
  method: { marginTop: -5, color: colors.grey4, ...fonts.regular(12) },
  date: { color: colors.grey6, ...fonts.regular(12) },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  modalContent: {
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: colors.grey12,
  },
  optionItem: { paddingVertical: 10, paddingHorizontal: 10 },
  optionText: { ...fonts.regular(12), color: colors.white },
});

export default TopUpScreen;
