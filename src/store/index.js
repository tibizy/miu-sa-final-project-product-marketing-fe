import {createStore} from 'redux';

const storeReducer = (state = { products : [], orders: [], cart: [], billing: {}, user_session: { 
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXRyaWNpYS5sZWJzYWNrQG1pdS5zYSIsImV4cCI6MTYzNDcyODEyMywiaWF0IjoxNjM0NjkyMTIzfQ.EYLKTAhHClstpGfz2vbJFGOWl8bnc97uJnDoU2odg3I",
    isLoggedIn: true }, showBanner: true }, action ) => {
    if (action.type === 'add product to cart'){
        state.products.map(p => {
            if(p.productId === action.product.productId) p.quantity -= (action.quantity || 1); return p
        });
        
        const prod = state.cart.find(p => {
            if(p.productId === action.product.productId) { p.quantity += (action.quantity || 1); return true}
            return false;
        });
        if(!prod) state.cart.push({ ...action.product, quantity: (action.quantity || 1) })
        return { 
            ...state, 
            products: [...state.products],
            cart: [...state.cart],
        };
    }
    else if (action.type === 'remove product from cart'){
        return {  ...state, cart : state.cart.filter(p => p.productId !== action.product.productId) };
    }
    else if (action.type === 'save billing info'){
        return { ...state, billing : { ...state.billing, billingInfo: action.billingInfo } };
    }
    else if (action.type === 'save payment info'){
        return { ...state, billing : {...state.billing, paymentInfo: action.paymentInfo } };
    }
    else if (action.type === 'save products'){
        return { ...state, products : action.products };
    }
    else if (action.type === 'save orders'){
        return { ...state, orders : action.orders };
    }
    else if (action.type === 'save user session'){
        return { ...state, user_session : action.user_session };
    }
    else if (action.type === 'hide banner'){
        return { ...state, showBanner : false };
    }
    else if (action.type === 'show banner'){
        return { ...state, showBanner : true };
    }
    return state;
}

const store = createStore(storeReducer);
export default store;