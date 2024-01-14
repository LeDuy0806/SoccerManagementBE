export function tranformToTag(text: string) {
  text = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  text = text.replace(/\s+/g, '-');

  return text;
}
