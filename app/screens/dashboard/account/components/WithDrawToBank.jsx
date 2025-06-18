import { useState } from 'react';
import { fonts, colors } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { ClientsHeader, ClientsLayout } from '@/components';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


const avatar = require('@/assets/images/profile.png');

const WithDrawToBankScreen = ({ navigation }) => {
  const [selectedBank, setSelectedBank] = useState('Access Bank');

  return (
    <View style={styles.container}>
      <ClientsHeader
        title="Withdraw to Bank"
        onBackPress={() => navigation.goBack()}
        backgroundColor={colors.white}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Select Bank Account</Text>
        <TouchableOpacity style={styles.bankSelector}>
          <View style={styles.bankInfo}>
            <View style={styles.bankIconContainer}>
              <FontAwesome6 name="building-columns" size={20} color={colors.black} />
            </View>
            <Text style={styles.bankName}>{selectedBank}</Text>
          </View>
          <Icon name="chevron-down-circle-outline" size={20} style={styles.chevronIcon} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerUser}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.userName}>Barr. Charles</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.helpText}>Need Help?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: '5%',
  },
  label: {
    ...fonts.regular(14),
    color: colors.black,
    marginBottom: 10,
  },
  bankSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    padding: 15,
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bankIconContainer: {
    backgroundColor: colors.grey8,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName: {
    ...fonts.medium(16),
    color: colors.black,
    fontWeight: '900',
  },
  chevronIcon: {
    color: colors.black,
    fontWeight: '900',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: '5%',
    borderTopWidth: 1,
    borderTopColor: colors.grey8,
  },
  footerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    ...fonts.medium(14),
    color: colors.black,
  },
  helpText: {
    ...fonts.regular(12),
    color: colors.grey1,
    backgroundColor: colors.grey8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default WithDrawToBankScreen;
