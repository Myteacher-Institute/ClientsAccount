import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontawesome from 'react-native-vector-icons/FontAwesome6';
import ClientsLayout from '@/components/ClientsLayout';
import ClientsButton from '@/components/ClientsButton';
import { fonts, colors } from '@/theme';
import logo from '@/assets/images/logo.png';

const TopUpScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const pickerRef = useRef();

  const paymentMethods = ['Via Debit Card', 'Via Bank Transfer'];

  const recentTopUps = [
    {
      amount: '₦50,000',
      method: 'Via Debit Card',
      date: 'May 22',
    },
    {
      amount: '₦20,000',
      method: 'Via Bank Transfer',
      date: 'May 18',
    },
  ];

  const handleSelectMethod = (method) => {
    setPaymentMethod(method);
    setPickerVisible(false);
  };

  const openPicker = () => {
    pickerRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownPosition({ top: py + height, left: px, width });
      setPickerVisible(true);
    });
  };

  return (
    <>
      <ClientsLayout title="Add Funds">

        <View style={styles.balanceContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.logoText}>Clients Account</Text>
          </View>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₦100,000.00</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Amount to Add</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Text style={styles.currencySymbol}>₦</Text>
          </View>

          <Text style={styles.label}>Payment Method</Text>
          <TouchableOpacity ref={pickerRef} style={styles.pickerContainer} onPress={openPicker}>
            <Text style={[styles.pickerText, paymentMethod && styles.pickerTextSelected]}>
              {paymentMethod || 'Select method'}
            </Text>
            <Icon name="chevron-down" size={20} color={colors.white} />
          </TouchableOpacity>

          <ClientsButton
            text="Add Funds"
            onPress={() => console.log('Add Funds pressed')}
            leftIcon="wallet"
            IconComponent={Fontawesome}
            bgColor={colors.yellow}
            textColor={colors.black}
            extraTextSty={styles.addButtonText}
          />
        </View>

        <View style={styles.recentTopUpsContainer}>
          <Text style={styles.recentTopUpsTitle}>Recent Top-ups</Text>
          {recentTopUps.map((item, index) => (
            <View key={index} style={styles.topUpItem}>
              <View style={styles.topUpIconContainer}>
                <Icon name="arrow-down" size={20} style={styles.icon} />
              </View>
              <View style={styles.topUpDetails}>
                <Text style={styles.topUpAmount}>{item.amount}</Text>
                <Text style={styles.topUpMethod}>{item.method}</Text>
              </View>
              <Text style={styles.topUpDate}>{item.date}</Text>
            </View>
          ))}
        </View>
      </ClientsLayout>

      <Modal transparent={true} visible={isPickerVisible} animationType="fade" onRequestClose={() => setPickerVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContent, { ...dropdownPosition }]}>
          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.optionItem} onPress={() => handleSelectMethod(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    ...fonts.bold(12),
    color: colors.white,
    width: 60,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  balanceLabel: {
    ...fonts.regular(12),
    color: colors.grey2,
  },
  balanceAmount: {
    ...fonts.bold(30),
    color: colors.white,
    marginTop: -5,
  },
  icon: {
    color: 'gold',
    backgroundColor: '#ffd90053',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
  },
  label: {
    ...fonts.regular(12),
    color: colors.white,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.yellow,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    ...fonts.regular(12),
    color: colors.white,
    height: 50,
  },
  currencySymbol: {
    ...fonts.bold(18),
    color: colors.yellow,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  pickerText: {
    ...fonts.regular(12),
    color: '#888',
  },
  pickerTextSelected: {
    color: colors.white,
  },
  addButtonText: {
    ...fonts.bold(12),
    color: colors.black,
    fontWeight: 900,
  },
  recentTopUpsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  recentTopUpsTitle: {
    ...fonts.bold(18),
    color: colors.white,
    marginBottom: 15,
  },
  topUpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
  },
  topUpIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topUpDetails: {
    flex: 1,
  },
  topUpAmount: {
    ...fonts.bold(12),
    color: colors.grey2,
  },
  topUpMethod: {
    ...fonts.regular(12),
    color: colors.grey2,
  },
  topUpDate: {
    ...fonts.regular(12),
    color: colors.grey2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  optionText: {
    ...fonts.regular(12),
    color: colors.white,
  },
});

export default TopUpScreen;