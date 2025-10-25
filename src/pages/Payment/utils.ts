// Нормализуем к корректному UFix64
export function toUFix64(v: string | number): string {
  let s = typeof v === "number" ? String(v) : String(v).trim();

  // запятая -> точка, убрать пробелы и недопустимые символы
  s = s.replace(/,/g, "");

  if (!/^\d+(\.\d+)?$/.test(s)) {
    throw new Error(`Invalid UFix64 literal: "${v}"`);
  }

  if (!s.includes(".")) {
    return s + ".0"; // минимум один знак после точки
  }

  const [intPart, fracRaw] = s.split(".");
  const frac = fracRaw.slice(0, 8); // максимум 8 знаков
  // если вся дробная часть нули или пусто — делаем .0
  if (!frac || /^0+$/.test(frac)) return `${intPart}.0`;
  // убрать хвостовые нули (не обязательно, но аккуратнее)
  const trimmed = frac.replace(/0+$/g, "");
  return `${intPart}.${trimmed || "0"}`;
}
