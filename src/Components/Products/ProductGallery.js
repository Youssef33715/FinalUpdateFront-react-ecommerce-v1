import { useEffect, useState } from "react";

// Main image + thumbnails from the product's imageCover and images.
// Images use object-fit: contain, so they are never stretched.
const ProductGallery = ({ images }) => {
  const [index, setIndex] = useState(0);
  const count = images?.length || 0;

  useEffect(() => {
    setIndex(0);
  }, [count]);

  if (count === 0) {
    return (
      <div className="sf-gallery">
        <div className="sf-gallery-main sf-gallery-empty" aria-label="لا توجد صورة">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" />
          </svg>
        </div>
      </div>
    );
  }

  const go = (n) => setIndex((n + count) % count);

  return (
    <div className="sf-gallery">
      <div className="sf-gallery-main">
        <img src={images[index].original} alt="" />
        {count > 1 ? (
          <>
            <button type="button" className="sf-gal-arrow right" onClick={() => go(index - 1)} aria-label="الصورة السابقة">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <button type="button" className="sf-gal-arrow left" onClick={() => go(index + 1)} aria-label="الصورة التالية">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <span className="sf-gal-count">{index + 1} / {count}</span>
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <div className="sf-thumbs">
          {images.map((img, i) => (
            <button
              type="button"
              key={i}
              className={"sf-thumb" + (i === index ? " on" : "")}
              onClick={() => setIndex(i)}
              aria-label={`عرض الصورة ${i + 1}`}
              aria-current={i === index}
            >
              <img src={img.original} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductGallery;
