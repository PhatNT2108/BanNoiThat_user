export function saveInteraction(type: string, data: any) {
  let userInteractions = getFromLocalStorage("userInteractions") || {};
  userInteractions[type] = userInteractions[type] || [];
  userInteractions[type].push(data);

  saveToLocalStorage("userInteractions", userInteractions);
}

export function getFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

export function saveToLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
