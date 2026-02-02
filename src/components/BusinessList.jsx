import { BUSINESSES } from '../data/businesses';
import { BusinessItem } from './BusinessItem';

export function BusinessList({
  businesses,
  getCost,
  canBuy,
  buyBusiness,
  productionFor,
  buyMultiplier,
  hasManager,
  clickBusiness,
  getPendingFor,
  getCycleProgress,
  getSecondsUntilClick,
  canClickNow,
  getCycleTimeSec,
  getLastPopFor,
  getMilestoneMultiplier,
}) {
  return (
    <div className="business-list">
      {BUSINESSES.map((business) => (
        <BusinessItem
          key={business.id}
          business={business}
          owned={businesses[business.id]?.owned ?? 0}
          production={productionFor(business.id)}
          cost={getCost(business.id, buyMultiplier)}
          canBuy={canBuy(business.id, buyMultiplier)}
          buyMultiplier={buyMultiplier}
          onBuy={buyBusiness}
          hasManager={hasManager(business.id)}
          onCollect={clickBusiness}
          pendingBuilds={getPendingFor(business.id)}
          cycleProgress={getCycleProgress(business.id)}
          secondsUntilClick={getSecondsUntilClick(business.id)}
          canClickNow={canClickNow(business.id)}
          cycleTimeSec={getCycleTimeSec(business.id)}
          lastPop={getLastPopFor(business.id)}
          milestoneMultiplierValue={getMilestoneMultiplier(business.id)}
        />
      ))}
    </div>
  );
}
