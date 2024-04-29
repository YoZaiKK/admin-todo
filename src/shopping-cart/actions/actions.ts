// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next";



export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
    return cookieCart;
  }
  return {};
}

export const addProductToCart = (id: string, quantity: number = 1) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] += quantity;
  } else {
    cookieCart[id] = quantity;
  }
  setCookie('cart', JSON.stringify(cookieCart));
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id] > 1) {
    cookieCart[id] -= 1;
  } else {
    delete cookieCart[id];
  }
  setCookie('cart', JSON.stringify(cookieCart));
}

