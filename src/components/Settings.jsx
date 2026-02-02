export function Settings({ onClose, theme, setTheme }) {
  const roadmap = [
    'Career & achievements',
    'Unlocks & new ventures',
    'Upgrades shop',
    'Investors & prestige',
    'Connect & cloud save',
    'Shop (premium blooms)',
    'More milestones & events',
  ];

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button type="button" className="settings-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <section className="settings-section">
          <h3>Theme</h3>
          <div className="theme-toggle">
            <button
              type="button"
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
            >
              ☀️ Light
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
            >
              🌙 Dark
            </button>
          </div>
        </section>
        <section className="settings-section">
          <h3>Roadmap</h3>
          <p className="roadmap-intro">Planned features for Coin Bloom:</p>
          <ul className="roadmap-list">
            {roadmap.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="settings-section">
          <h3>Credits</h3>
          <p className="credits-text">Made by Chosentechies</p>
        </section>
      </div>
    </div>
  );
}
