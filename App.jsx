import { colors } from './app/theme';
import AppNavigator from './app/navigation/AppNavigator';
import { StatusBar, useColorScheme } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? colors.black : colors.white}
      />
      <AppNavigator />
    </>
  );
}

export default App;
