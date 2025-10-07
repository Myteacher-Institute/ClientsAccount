import {pick} from '@react-native-documents/picker';

export async function FilePicker(selectedOption) {
  let options = null;

  selectedOption == 'call to bar'
    ? (options = {
        allowMultiSelection: false,
        type: ['application/pdf'], // MIME types
      })
    : selectedOption == 'photo'
    ? (options = {
        allowMultiSelection: false,
        type: ['image/jpeg', 'image/png'],
      })
    : (options = {
        allowMultiSelection: false,
        type: ['application/pdf', 'image/jpeg', 'image/png'], // MIME types
      });

  try {
    const [result] = await pick(options);

    if (result && !result.error) {
      return result;
    }
  } catch (err) {
    console.error('Error picking file: ', err);
  }
}
