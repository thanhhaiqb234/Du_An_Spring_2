export const updateCart = (cart) => {
    return {
      type: "UPDATE_CART",
      payload: cart
    };
  };
  
  // export const updatePrice = (price) => {
  //   return { 
  //     type: "UPDATE_PRICE", 
  //     payload: price 
  //   };
  // };
  
  export const getCart = (state) => {
    return state.cartReducer.cart;
  };
  
  export const getNumberOfProductsInCart = (state) => {
    return state.cartReducer.count;
  };
  
  // export const getTotalPrice = (state) => {
  //   return state.cartReducer.totalPrice;
  // };