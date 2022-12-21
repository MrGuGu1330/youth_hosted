<template>
	<div class="listBar">
		<ul v-for="(item, i) in listGoods" :key="i">
			<h3>{{ item.title }}</h3>
			<li v-for="(li, j) in item.tags" :key="j">{{ li }}</li>
		</ul>
	</div>
</template>

<script>
import { getServes } from '@/network/booking';
export default {
	data() {
		return {
			listGoods: [],
		};
	},
	props: {
		supplier_id: '',
	},
	watch: {
		supplier_id: function (newVal, oldVal) {
			this.supplier_id = newVal; //newVal即是chartData
			getServes({ supplier_id: this.supplier_id }).then(res => {
				this.listGoods = res.data.data;
			});
		},
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
.listBar {
	height: 400px;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-content: space-around;
	padding: 20px;
	> ul {
		list-style-type: circle;
		list-style-position: inside;
		width: 250px;
		> li {
			margin: 10px;
			font-size: 14px;
		}
	}
}
</style>
