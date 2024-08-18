interface CartItem {
    _id: string;
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
  
  export const removeFromCart = (id: string) => {
    let cart = getCartItems();
    cart = cart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  