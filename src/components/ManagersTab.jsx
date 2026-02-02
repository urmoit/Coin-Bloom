import { BUSINESSES } from '../data/businesses';
import { formatLarge } from '../utils/numbers';

export function ManagersTab({ managers, getManagerCost, canBuyManager, buyManager }) {
  return (
    <div className="managers-tab">
      <h2>Managers</h2>
      <p className="managers-desc">Buy a manager to automate a business — it will earn money without clicking.</p>
      <div className="managers-list">
        {BUSINESSES.map((business) => {
          const owned = managers[business.id];
          const cost = getManagerCost(business.id);
          const canBuy = canBuyManager(business.id);
          return (
            <div key={business.id} className="manager-card">
              <span className="manager-icon">{business.icon}</span>
              <div className="manager-info">
                <span className="manager-name">{business.name} Manager</span>
                {owned ? (
                  <span className="manager-owned">✓ Automated</span>
                ) : (
                  <>
                    <span className="manager-cost">{formatLarge(cost)}</span>
                    <button
                      type="button"
                      className="manager-buy-btn"
                      disabled={!canBuy}
                      onClick={() => buyManager(business.id)}
                    >
                      Hire Manager
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
