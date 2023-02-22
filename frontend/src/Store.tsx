import { createContext, useReducer } from "react";

export const Store = createContext<any>(null);

const initialState = {
  userInfo: localStorage.getItem('userInfo')
  ? JSON.parse(String(localStorage.getItem('userInfo')))
  : null,
    cart:{
      paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
      shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(String(localStorage.getItem('shippingAddress')))
      : { location: {} },
      cartitems: localStorage.getItem('cartitems')
      ? JSON.parse(String(localStorage.getItem('cartitems')))
      :[],
    }
}

function reducer(state:any,action:any){
    switch(action.type){
        case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartitems.find(
        (item: { _id: any; }) => item._id === newItem._id
      );
      
      const cartitems = existItem
        ? state.cart.cartitems.map((item: { _id: any; }) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartitems, newItem];
      
      localStorage.setItem('cartitems', JSON.stringify(cartitems));
      return { ...state, cart: { ...state.cart, cartitems } };

    case 'CART_REMOVE_ITEM': {
      const cartitems = state.cart.cartitems.filter(
        (item: { _id: any; }) => item._id !== action.payload._id
      );
      localStorage.setItem('cartitems', JSON.stringify(cartitems));
      return { ...state, cart: { ...state.cart, cartitems } };
    }
    case 'CART_CLEAR': {
      const cartitems:[]=[]
      localStorage.setItem('cartitems', JSON.stringify(cartitems));
      return { ...state, cart: { ...state.cart, cartitems } };
    }

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
}

export function StoreProvider(props:any){
    const [state,dispatch] = useReducer(reducer,initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}