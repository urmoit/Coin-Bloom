const TABS = [
  { id: 'garden', label: 'Garden' },
  { id: 'career', label: 'Career' },
  { id: 'unlocks', label: 'Unlocks' },
  { id: 'upgrades', label: 'Upgrades', dot: true },
  { id: 'managers', label: 'Managers', dot: true },
  { id: 'investors', label: 'Investors', dot: true },
  { id: 'connect', label: 'Connect' },
  { id: 'shop', label: 'Shop', icon: '🌸' },
];

export function Sidebar({ activeTab, setActiveTab, onSettingsClick }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-avatar" title="You">
          <span className="avatar-emoji">🌻</span>
        </div>
        <span className="sidebar-header-label">Player</span>
      </div>
      <nav className="sidebar-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav-btn ${tab.id === 'garden' ? 'garden' : ''} ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon && <span className="nav-icon">{tab.icon}</span>}
            {tab.label}
            {tab.dot && <span className="nav-dot" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-settings-btn"
          onClick={onSettingsClick}
          title="Settings"
        >
          <span aria-hidden>⚙️</span>
          Settings
        </button>
      </div>
    </aside>
  );
}
