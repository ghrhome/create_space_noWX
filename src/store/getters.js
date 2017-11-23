/**
 * Created by whobird on 17/8/17.
 */

export const getOpenid=state=>{
  return state.openid;
}

/*

export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.all.find(p => p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}
*/
