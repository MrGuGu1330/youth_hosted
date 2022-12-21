export default {
	// 往vuex仓库中提交更新数据的方法支持异步
	//例： addCart(context, payload) {
	// 	return new Promise((resolve, reject) => {
	// 		let oldProduct = context.state.cartList.find(
	// 			item => item.iid === payload.iid
	// 		);
	// 		if (oldProduct) {
	// 			context.commit('addCounter', oldProduct);
	// 			resolve('当前的商品数量+1');
	// 		} else {
	// 			payload.count = 1;
	// 			context.commit('addToCart', payload);
	// 			resolve('添加了新的商品');
	// 		}
	// 	});
	// },
};
