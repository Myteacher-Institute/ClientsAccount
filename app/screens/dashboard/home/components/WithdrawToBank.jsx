import { fonts, colors } from '@/theme';
import ClientsLayout from '@/components/ClientsLayout';
import { Text, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WithdrawToBank = ({ navigation }) => {
  return (
    <ClientsLayout title="Withdraw to Bank">
      <View>
        <Text style={styles.label}>Select Bank Account</Text>
        <View style={styles.bank}>
          <View style={styles.bankIcon}>
            <Icon name="bank" size={24} color={colors.black} />
          </View>
          <Text style={styles.bankName}>Access Bank</Text>
          <Icon name="chevron-down-circle-outline" size={24} />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.user}>
          <Image source={require('@/assets/images/profile.png')} style={styles.profileImg} />
          <Text style={styles.name}>Barr. Charles</Text>
        </View>
        <Text style={styles.help} onPress={() => navigation.navigate('Account', { screen: 'SupportCenter' })}>Need Help?</Text>
      </View>
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 50,
    marginBottom: 5,
    ...fonts.regular(),
    color: colors.grey1,
  },
  bank: {
    height: 84,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
  },
  bankIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey10,
  },
  bankName: { ...fonts.regular(18) },
  footer: {
    width: '100%',
    marginTop: 50,
    borderTopWidth: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: colors.black,
    borderTopColor: colors.grey9,
    justifyContent: 'space-between',
  },
  user: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 50,
    resizeMode: 'cover',
    borderColor: colors.blue3,
  },
  name: {
    ...fonts.regular(),
    color: colors.grey5,
  },
  help: {
    borderRadius: 20,
    paddingVertical: 4,
    color: colors.grey6,
    ...fonts.regular(12),
    paddingHorizontal: 12,
    backgroundColor: colors.grey9,
  },
});

export default WithdrawToBank;
