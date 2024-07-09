interface CartItem {
    id: number;
    cover: string;
    title: string;
    author: string;
    price: string;
    duration: string;
  }
  
  export const getCartItems = (): CartItem[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  
  export const addToCart = (item: CartItem) => {
    const cart = getCartItems();
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const removeFromCart = (id: number) => {
    let cart = getCartItems();
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  