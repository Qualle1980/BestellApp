export function formatPrice(value) {
    return Number(value).toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
