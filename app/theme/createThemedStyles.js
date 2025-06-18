import { StyleSheet } from 'react-native';
import colors from './colors';
import fonts from './fonts';

/**
 * A utility function to create themed stylesheets in React Native.
 * It provides the app's color palette and font styles directly to the stylesheet definition.
 * 
 * @param {(colors: object, fonts: object) => object} stylesCallback - A function that receives colors and fonts and returns a style object.
 * @returns {object} A StyleSheet object.
 */
const createThemedStyles = (stylesCallback) => {
  const styles = stylesCallback(colors, fonts);
  return StyleSheet.create(styles);
};

export default createThemedStyles;
