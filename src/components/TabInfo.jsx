const TAB_INFO = {
  career: {
    title: 'Career',
    description: 'Track your progress and achievements.',
    coming: [
      'Achievement badges for milestones (first venture, first manager, etc.)',
      'Career tiers and titles as you grow your empire',
      'Stats: total earned, ventures owned, time played',
    ],
  },
  unlocks: {
    title: 'Unlocks',
    description: 'New ventures and features as you progress.',
    coming: [
      'Unlock new ventures by reaching money or venture milestones',
      'Unlock upgrades and managers at certain thresholds',
      'Prestige unlocks and new game modes',
    ],
  },
  upgrades: {
    title: 'Upgrades',
    description: 'Temporary boosts — lost when you buy an investor and the game restarts.',
    coming: [
      'Upgrades are not permanent; they last until you buy an investor',
      'When you buy an investor, the game restarts and upgrades are reset',
      'Boost production and cycle times for this run, then restart with more investors for higher income',
    ],
  },
  investors: {
    title: 'Investors',
    description: 'Restart the game — you lose progress but earn more money. The more investors you have, the higher your income.',
    coming: [
      'Buy an investor to restart: ventures, money, and upgrades reset',
      'Each investor you have multiplies how much money you earn',
      'More investors = faster progress on the next run',
    ],
  },
  connect: {
    title: 'Connect',
    description: 'Save and sync your progress.',
    coming: [
      'Cloud save so you never lose your garden',
      'Link account across devices',
      'Optional leaderboards and friends',
    ],
  },
  shop: {
    title: 'Shop',
    description: 'Premium blooms and cosmetics.',
    coming: [
      'Special ventures and skins for gold or premium currency',
      'Time-savers: warps, boost multipliers',
      'Exclusive milestones and limited-time offers',
    ],
  },
};

export function TabInfo({ activeTab }) {
  const info = TAB_INFO[activeTab];
  if (!info) return null;

  return (
    <div className="tab-info">
      <h2 className="tab-info-title">{info.title}</h2>
      <p className="tab-info-desc">{info.description}</p>
      <div className="tab-info-coming">
        <h3>Coming to this page</h3>
        <ul>
          {info.coming.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
