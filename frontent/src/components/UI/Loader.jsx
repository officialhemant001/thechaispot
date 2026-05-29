import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader__cup">
          <span className="loader__steam"></span>
          <span className="loader__steam"></span>
          <span className="loader__steam"></span>
        </div>
        <p className="loader__text">Brewing your menu...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-card__image"></div>
      <div className="skeleton-card__body">
        <div className="skeleton skeleton-card__title"></div>
        <div className="skeleton skeleton-card__desc"></div>
        <div className="skeleton skeleton-card__desc skeleton-card__desc--short"></div>
        <div className="skeleton-card__footer">
          <div className="skeleton skeleton-card__price"></div>
          <div className="skeleton skeleton-card__badge"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
