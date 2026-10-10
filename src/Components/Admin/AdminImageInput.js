import { useEffect, useRef } from "react";
import MultiImageInput from "react-multiple-image-input";

// Thin wrapper around the existing MultiImageInput (same props, same data).
// The library hard-codes its "ADD IMAGE" label with no prop to change it, so
// the label is localized in the DOM to keep the Admin UI fully Arabic.
const AdminImageInput = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const localize = () => {
      node.querySelectorAll("*").forEach((el) => {
        if (el.children.length === 0 && el.textContent.trim() === "ADD IMAGE") {
          el.textContent = "إضافة صورة";
        }
      });
    };
    localize();
    const observer = new MutationObserver(localize);
    observer.observe(node, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <MultiImageInput {...props} />
    </div>
  );
};

export default AdminImageInput;
