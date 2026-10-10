// Small presentation helpers shared by the Admin screens.
// Only formats real values coming from the API — no invented statuses.
export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("ar-EG-u-nu-latn", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

// The Order model only has two real flags: ispaid and isDelivered.
export const orderStatus = (order) =>
  order?.isDelivered
    ? { text: "تم التوصيل", cls: "ok" }
    : order?.ispaid
    ? { text: "تم الدفع", cls: "gy" }
    : { text: "لم يتم الدفع", cls: "warn" };

export const paymentLabel = (order) =>
  order?.paymentMethodType === "cash" ? "نقدًا" : "بطاقة";

export const roleLabel = (role) =>
  role === "admin" ? "مدير النظام" : role === "manager" ? "مشرف" : "مستخدم";
