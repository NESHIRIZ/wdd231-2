// Module for local storage management

const STORAGE_KEY = 'sekos_flowers_data';

export function saveCart(cart) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to local storage:', error);
  }
}

export function loadCart() {
  try {
    const cart = localStorage.getItem(`${STORAGE_KEY}_cart`);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading cart from local storage:', error);
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_favorites`, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to local storage:', error);
  }
}

export function loadFavorites() {
  try {
    const favorites = localStorage.getItem(`${STORAGE_KEY}_favorites`);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from local storage:', error);
    return [];
  }
}

export function addToCart(cart, product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(cart, productId) {
  const filtered = cart.filter(item => item.id !== productId);
  saveCart(filtered);
  return filtered;
}

export function toggleFavorite(favorites, product) {
  const index = favorites.findIndex(fav => fav.id === product.id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(product);
  }
  saveFavorites(favorites);
  return favorites;
}

export function getCartTotal(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
