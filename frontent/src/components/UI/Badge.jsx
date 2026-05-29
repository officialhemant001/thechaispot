import './Badge.css';

export function VegBadge({ type = 'veg' }) {
  const isVeg = type === 'veg';
  return (
    <span className={`food-badge ${isVeg ? 'food-badge--veg' : 'food-badge--nonveg'}`}>
      <span className="food-badge__dot"></span>
      <span className="food-badge__text">{isVeg ? 'Veg' : 'Non-Veg'}</span>
    </span>
  );
}

export function BestsellerBadge() {
  return (
    <span className="badge badge--bestseller">
      <span className="badge__icon">⭐</span>
      Bestseller
    </span>
  );
}

export function SpecialBadge() {
  return (
    <span className="badge badge--special">
      <span className="badge__icon">🔥</span>
      Today's Special
    </span>
  );
}

export function NewBadge() {
  return (
    <span className="badge badge--new">
      <span className="badge__icon">✨</span>
      New
    </span>
  );
}

export function DiscountBadge({ percentage }) {
  return (
    <span className="badge badge--discount">
      {percentage}% OFF
    </span>
  );
}

export default function Badge({ type, text }) {
  if (type === 'bestseller') return <BestsellerBadge />;
  if (type === 'special') return <SpecialBadge />;
  if (type === 'new') return <NewBadge />;
  if (type === 'discount') {
    const percentage = text ? text.replace(/[^0-9]/g, '') : '';
    return <DiscountBadge percentage={percentage} />;
  }
  return null;
}

