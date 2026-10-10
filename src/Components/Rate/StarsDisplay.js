// Read-only star rating (value 0-5). Fills from the right in RTL.
const StarsDisplay = ({ value = 0, size = 15 }) => {
  const pct = Math.max(0, Math.min(5, Number(value) || 0)) * 20;
  return (
    <span className="sf-stars" style={{ fontSize: size }} role="img" aria-label={`${value} من 5`}>
      <span className="sf-stars-bg" aria-hidden="true">★★★★★</span>
      <span className="sf-stars-fg" aria-hidden="true" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  );
};

export default StarsDisplay;
