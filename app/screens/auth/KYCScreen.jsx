import { useState } from 'react';
import { fonts, colors } from '@/theme';
import terms from '@/assets/texts/terms';
import { useApi, useForm, useToast } from '@/hooks';
import { FilePicker } from '@/components/FilePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ClientsInput, ClientsModal, ClientsButton, ClientsLayout } from '@/components';

const KYCScreen = ({ navigation, route }) => {
  const user = route.params.data;
  const { post, loading } = useApi();
  const { showWarning } = useToast();

  const initialValues = {
    cac: null,
    photo: null,
    cacNumber: '',
    callToBar: null,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { values, bind, validate, setField } = useForm(initialValues, Object.keys(initialValues));

  const uploadOptions = [
    { key: 'cac', label: 'Upload CAC Certificate (PDF, JPG)', icon: 'upload' },
    { key: 'callToBar', label: 'Upload Call to Bar Certificate (PDF)', icon: 'upload' },
    { key: 'photo', label: 'Upload Recent Photo (JPG, PNG)', icon: 'photo', isPhoto: true },
  ];

  const handleFilePick = async (key) => {
    try {
      const result = await FilePicker(key);
      setField(key, result);
    } catch (err) {
      console.log(`File pick failed for ${key}:`, err);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) { return; }

    if (!termsAccepted) {
      showWarning('Accept terms to proceed');
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val?.uri) {
        formData.append(key, {
          uri: val.uri,
          name: val.name || `${key}.pdf`,
          type: val.type || 'application/octet-stream',
        });
      } else { formData.append(key, val); }
    });

    try {
      await post({
        data: formData,
        dynamicId: user.id,
        requiresAuth: true,
        endpoint: 'uploadKYC',
        onErrorMessage: 'KYC submission failed',
        onSuccessMessage: 'KYC submitted successfully',
      });

      navigation.navigate('Verification');
    } catch (error) {
      console.log('KYC submission failed:', error);
    }
  };

  const handleCheckboxPress = () => {
    termsAccepted ? setTermsAccepted(false) : setModalVisible(true);
  };

  const handleAcceptTerms = () => {
    setModalVisible(false);
    setTermsAccepted(true);
  };

  return (
    <ClientsLayout title="KYC Verification">
      <View style={styles.section}>
        <View style={styles.header}>
          <Ionicons name="briefcase" size={22} color={colors.yellow1} />
          <Text style={styles.headerText}>Verify CAC Documents</Text>
        </View>

        <ClientsInput
          {...bind('cacNumber')}
          placeholder="e.g. RC1234567"
          darkLabel="CAC Registration Number"
        />

        {uploadOptions.map(({ key, label, icon, isPhoto }) => (
          <View key={key} style={styles.upload}>
            <Text style={styles.uploadText}>{label}</Text>

            <Pressable style={styles.button} onPress={() => handleFilePick(key)}>
              {isPhoto ? (
                <FontAwesome name={icon} size={15} color={colors.white} />
              ) : (
                <FontAwesome6 name={icon} size={15} color={colors.white} />
              )}
              <Text style={styles.buttonText}>Choose File</Text>
            </Pressable>

            {values[key]?.name && (
              <Text style={styles.fileName} numberOfLines={1}>
                {values[key].name}
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
          loading={loading}
          onPress={handleSubmit}
          text="Submit for Verification"
          leftIcon="shield-checkmark-outline"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.help}>Need help?</Text>
        <View style={styles.contact}>
          <Icon name="comment-outline" size={15} color={colors.black} />
          <Text style={styles.support}>Contact Support</Text>
        </View>
      </View>

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
    gap: 10,
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  header: {
    gap: 10,
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: { ...fonts.medium(18), color: colors.grey3 },
  upload: { gap: 2, marginTop: 10 },
  uploadText: { ...fonts.medium(), color: colors.grey1 },
  fileName: {
    marginBottom: -10,
    color: colors.grey2,
    ...fonts.regular(12),
  },
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
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  termsText: { ...fonts.italic(), color: colors.grey3 },
  termsCircle: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey2,
  },
  termsChecked: { borderColor: colors.yellow2, backgroundColor: colors.yellow2 },
  modalSection: { ...fonts.bold(16), marginTop: 10 },
  modalText: { ...fonts.medium(), marginLeft: 15, marginTop: 2 },
  footer: { marginTop: 20, alignItems: 'center' },
  help: { ...fonts.light(), color: colors.grey6 },
  contact: {
    gap: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  support: { ...fonts.medium(), color: colors.black },
});

export default KYCScreen;
