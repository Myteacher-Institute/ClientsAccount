import { useState } from 'react';
import { fonts, colors } from '@/theme';
import terms from '@/assets/texts/terms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ClientsInput, ClientsModal, ClientsButton, ClientsLayout } from '@/components';
import { FilePicker } from '../../components/FilePicker';
import { useApi, useForm } from '@/hooks';

const KYCScreen = ({ navigation, route }) => {
  const user = route.params.data;

  const initialValues = {
    cacNumber: '',
    callToBarCert: null,
    cacCert: null,
    photo: null,
  };

  const required = Object.keys(initialValues);
  
  const { post, loading } = useApi();
  const [termsError, setTermsError] = useState('');
  const [selectedCTB, setSelectedCTB] = useState();
  const [selectedCAC, setSelectedCAC] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { values, bind, validate, setField } = useForm(initialValues, required);

  const onSubmit = async () => {
    // Handle KYC submission logic here
    // This could involve API calls to submit the KYC documents
    if (!terms) {
      setTermsError('Accept terms to proceed');
      return;
    }

    setTermsError('');

    if (!validate()) {
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (typeof value === 'object' && value?.uri) {
        formData.append(key, {
          uri: value.uri,
          name: value.name || `${key}.pdf`,
          type: value.type || 'application/octet-stream',
        });
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await post({
        data: formData,
        dynamicId: user.id,
        requiresAuth: true,
        endpoint: 'uploadKYC',
        onErrorMessage: 'KYC submission failed',
        onSuccessMessage: 'KYC submitted successfully',
      });

      console.log('Upload success:', response);
      navigation.navigate('Verification');
    } catch (error) {
      console.log('Upload failed:', error);
    }
  };

  const picker = async (key, selectedOption) => {
    try {
      const result = await FilePicker(selectedOption);
      if (selectedOption == 'call to bar') {
        setField(key, result);
        setSelectedCTB(result);
      } else if (selectedOption == 'cac') {
        setField(key, result);
        setSelectedCAC(result);
      } else if (selectedOption == 'photo') {
        setField(key, result);
        setSelectedPhoto(result);
      }

      return;
    } catch (error) {
      console.log('Picking Failed', error);
    }
  };

  const handleCheckboxPress = () => {
    termsAccepted ? setTermsAccepted(false) : setModalVisible(true);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setModalVisible(false);
  };

  const uploadOptions = [
    { key: 'callToBarCert', label: 'Upload Call to Bar Certificate (PDF)', option: 'call to bar' },
    { key: 'cacCert', label: 'Upload CAC Certificate (PDF, JPG, PNG)', option: 'cac' },
    { key: 'photo', label: 'Upload Recent Photo', option: 'photo', isPhoto: true },
  ];

  return (
    <ClientsLayout title="KYC Verification">
      <View style={styles.section}>
        <View style={styles.header}>
          <Ionicons name="briefcase" size={22} color={colors.yellow1} />
          <Text style={styles.headerText}>Verify CAC Documents</Text>
        </View>

        <ClientsInput
          darkLabel="CAC Registration Number"
          placeholder="e.g. RC1234567"
          {...bind('cacNumber')}
        />

        {uploadOptions.map(item => (
          <View key={item.key} style={styles.upload}>
            <Text style={styles.uploadText}>{item.label}</Text>
            <Pressable style={styles.button} onPress={() => picker(item.key, item.option)}>
              {item.isPhoto ? (
                <FontAwesome name="photo" size={15} color={colors.white} />
              ) : (
                <FontAwesome6 name="upload" size={15} color={colors.white} />
              )}
              <Text style={styles.buttonText}>Choose File</Text>
            </Pressable>
            {values[item.key]?.name && (
              <Text style={{ color: colors.grey2, marginTop: 4, fontSize: 12 }}>
                {values[item.key].name}
              </Text>
            )}
          </View>
        ))}

        <Pressable onPress={handleCheckboxPress} style={styles.terms}>
          <View style={[styles.termsCircle, termsAccepted && styles.termsChecked]}>
            {termsAccepted && <Ionicons name="checkmark" size={12} color={colors.white} />}
          </View>
          <Text style={styles.termsText}>I accept the terms and privacy policy</Text>
        </Pressable>

        <ClientsButton
          leftIcon="help-circle-outline"
          text="Submit for Verification"
          loading={loading}
          onPress={onSubmit}
        />
      </View>

      <Text style={styles.footer}>© 2025 Clients Account. All rights reserved.</Text>

      <ClientsModal
        isLight
        scrollable
        mode="fullscreen"
        visible={modalVisible}
        title="Terms and Conditions"
        onClose={() => setModalVisible(false)}
        footer={<ClientsButton text="I Agree" onPress={handleAcceptTerms} />}
      >
        {terms.map((item, index) =>
          item.type === 'section' ? (
            <View key={index}>
              <Text style={styles.modalSection}>{item.number}. {item.title}</Text>
              {item.content.map((line, idx) => (
                <Text key={idx} style={styles.modalText}>{line}</Text>
              ))}
            </View>
          ) : (
            <Text key={index} style={styles.modalText}>{item.text}</Text>
          )
        )}
      </ClientsModal>
    </ClientsLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 15,
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  header: {
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: { ...fonts.medium(18), color: colors.grey3 },
  upload: { gap: 2, marginTop: 10 },
  uploadText: { ...fonts.medium(), color: colors.grey1 },
  button: {
    gap: 8,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.grey6,
  },
  buttonText: { ...fonts.medium(), color: colors.white },
  terms: {
    gap: 6,
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  termsText: { ...fonts.italic(), color: colors.grey3 },
  termsCircle: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 10, borderColor: colors.grey2,
  },
  termsChecked: { borderColor: colors.yellow2, backgroundColor: colors.yellow2 },
  footer: {
    marginTop: 60,
    ...fonts.light(12),
    textAlign: 'center',
    color: colors.grey4,
  },
  modalSection: { ...fonts.bold(16), marginTop: 10 },
  modalText: { ...fonts.medium(), marginLeft: 15, marginTop: 2 },
});

export default KYCScreen;
