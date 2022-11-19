import './App.css';
import Timer from './Timer'
import Setting from './Setting';
import { useState } from 'react';
import SettingContext from './SettingContext';

function App() {

  const [ShowSetting, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15)
  return (
    <main>
      <SettingContext.Provider value={{
        ShowSetting,
        workMinutes,
        breakMinutes,
        setShowSettings,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {ShowSetting ? <Setting/> :  <Timer/>}
      </SettingContext.Provider>
    </main>
  );
}

export default App;
