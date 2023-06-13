import NavTabs from './src/components/NavTabs';
import { AppProvider } from './src/context/AppContext';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {
  return (
    <AppProvider>
      <NavTabs />
    </AppProvider>
  )
}
