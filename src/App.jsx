import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { BusinessList } from './components/BusinessList';
import { ManagersTab } from './components/ManagersTab';
import { TabInfo } from './components/TabInfo';
import { Settings } from './components/Settings';
import './App.css';

const THEME_KEY = 'coin-bloom-theme';

export default function App() {
  const state = useGameState();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setThemeState] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem(THEME_KEY)) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
  }, [theme]);

  const setTheme = (t) => setThemeState(t);

  return (
    <div className="app">
      <Header
        money={state.money}
        gold={state.gold}
        megaBucks={state.megaBucks}
        buyMultiplier={state.buyMultiplier}
        setBuyMultiplier={state.setBuyMultiplier}
        warps={state.warps}
        dealEndTime={state.dealEndTime}
      />
      <Sidebar
        activeTab={state.activeTab}
        setActiveTab={state.setActiveTab}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      <main className="main">
        {state.activeTab === 'garden' && (
          <BusinessList
            businesses={state.businesses}
            getCost={state.getCost}
            canBuy={state.canBuy}
            buyBusiness={state.buyBusiness}
            productionFor={state.productionFor}
            buyMultiplier={state.buyMultiplier}
            hasManager={state.hasManager}
            clickBusiness={state.clickBusiness}
            getPendingFor={state.getPendingFor}
            getCycleProgress={state.getCycleProgress}
            getSecondsUntilClick={state.getSecondsUntilClick}
            canClickNow={state.canClickNow}
            getCycleTimeSec={state.getCycleTimeSec}
            getLastPopFor={state.getLastPopFor}
            getMilestoneMultiplier={state.getMilestoneMultiplier}
          />
        )}
        {state.activeTab === 'managers' && (
          <ManagersTab
            managers={state.managers}
            getManagerCost={state.getManagerCost}
            canBuyManager={state.canBuyManager}
            buyManager={state.buyManager}
          />
        )}
        {state.activeTab !== 'garden' && state.activeTab !== 'managers' && (
          <div className="placeholder-tab">
            <TabInfo activeTab={state.activeTab} />
          </div>
        )}
      </main>
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      <Footer />
    </div>
  );
}
