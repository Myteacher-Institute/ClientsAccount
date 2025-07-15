import { colors } from '@/theme';
import AppNavigator from '@/navigation/AppNavigator';
import { UserProvider, ToastProvider } from '@/context';
import { StatusBar, useColorScheme } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <UserProvider>
      <ToastProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? colors.black : colors.white}
        />
        <AppNavigator />
      </ToastProvider>
    </UserProvider>
  );
}

export default App;
