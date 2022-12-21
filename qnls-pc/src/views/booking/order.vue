<template>
	<div class="order">
		<div class="bg"></div>
		<div class="content">
			<!-- 商品展示 -->
			<div class="yuding">
				<div class="orderLeft">
					<h2>{{ info.supplier_name }}</h2>
					<div>
						<div class="jiantou"></div>
						<span>
							<i></i>
							<div>
								<label for="">房间：</label>
								<label for="">{{ info.min_price }}</label>
								<label for="">元起</label>
							</div>
						</span>
					</div>
					<el-button type="warning" round>立即预订</el-button>
				</div>
				<div class="tu">
					<el-carousel
						indicator-position="outside"
						height="450px"
						v-if="lvdian.imgs.length"
					>
						<el-carousel-item
							v-for="(item, i) in lvdian.imgs"
							:key="i"
						>
							<img :src="item" alt="" class="imgs" />
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
			<!-- 功能选项卡 -->
			<div class="tabCard">
				<el-tabs
					v-model="activeName"
					type="card"
					@tab-click="handleClick"
				>
					<el-tab-pane label="旅舍概况" name="first"
						><lvDianGaiKuo :lvdian="info"></lvDianGaiKuo>
					</el-tab-pane>
					<el-tab-pane label="房型及价格" name="second">
						<price
							:supplier_id="info.supplier_id"
							:info="info"
						></price>
					</el-tab-pane>
					<el-tab-pane label="地图" name="third">
						<vmap
							:name="this.name"
							:province="this.province"
							:city="this.city"
						></vmap>
					</el-tab-pane>
					<el-tab-pane label="设施与服务" name="fourth"
						><serve :supplier_id="info.supplier_id"></serve>
					</el-tab-pane>
					<el-tab-pane label="图片" name="five"
						><pictures :imgs="lvdian.imgs"></pictures>
					</el-tab-pane>
					<el-tab-pane label="评论" name="six"
						><comment :supplier_id="info.supplier_id"></comment>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
import { getGoods, getSupplierInfo } from '@/network/booking';
import lvDianGaiKuo from './children/lvDianGaiKuo.vue';
import comment from './children/comment.vue';
import dynamic from './children/dynamic.vue';
import vmap from './children/vmap.vue';
import price from './children/price.vue';
import serve from './children/serve.vue';
import pictures from './children/pictures.vue';
export default {
	components: {
		lvDianGaiKuo,
		comment,
		dynamic,
		vmap,
		price,
		serve,
		pictures,
	},
	data() {
		return {
			activeName: 'first',
			lvdian: {
				imgs: [],
				sprice: '',
			},
			info: {},
			province: '',
			city: '',
			name: '',
		};
	},
	methods: {
		handleClick(tab, event) {
			// console.log(tab, event);
		},
	},
	mounted() {
		const url = this.$store.state.baseURL;
		const $$ = this.$route.query;
		getSupplierInfo({ supplier_id: $$.id }).then(res => {
			this.info = res.data.data;
			// console.log(this.info);
			let addr = this.info.supplier_address.split('-');
			// console.log(addr);
			this.province = addr[0];
			this.city = addr[1];
			this.name = addr[addr.length - 2] + addr[addr.length - 1];
			// console.log(this.province, this.city, this.name);
			getGoods({ supplier_id: this.info.supplier_id }).then(res => {
				let imgs = res.data.data[0].house_imgs
					.split(',')
					.map(item => `${url + item}`);
				this.lvdian.imgs = [];
				this.lvdian.imgs.push(...imgs);
			});
		});
	},
};
</script>

<style lang="scss" scoped>
.order {
	padding-top: 50px;
}
.bg {
	top: 0;
	position: absolute;
	height: 100%;
	width: 100%;
	background-image: url('@/assets/imgs/bg1.jpg');
	background-repeat: y-repeat;
	background-size: 100%;
	filter: blur(30px);
	z-index: -1;
}
.content {
	padding: 10px;
	background-color: #fff;
	width: var(--container-width);
	min-width: 1200px;
	margin: 0 auto;
	.tabCard {
		margin-bottom: 100px;
	}
	> .yuding {
		width: 100%;
		height: 450px;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		padding: 20px;

		.orderLeft {
			width: 400px;
			height: 422px;
			padding: 20px;
			text-align: center;
			background-color: #f8f1e7;
			margin-right: 20px;

			> div {
				margin-top: 60px;
				position: relative;
				> .jiantou {
					position: absolute;
					right: 100%;
					top: -20px;
					width: 0;
					height: 0;
					border: 20px solid transparent;
					border-right: 20px solid rgb(255, 136, 0);
					z-index: 100;
				}
				> span {
					display: flex;
					height: 200px;

					background-color: #f8dcba;
					border-radius: 30px;
					justify-content: center;
					position: relative;

					> i {
						display: block;
						position: absolute;
						right: 0;
						height: 40px;
						line-height: 40px;
						top: -20px;
						width: calc(100%);
						font-size: 40px;
						color: #f8dcba;

						font-style: normal;
						background-image: linear-gradient(
							to right,
							rgb(255, 136, 0),
							#f8dcba 60%
						);
						background-color: rgb(248, 172, 6);
					}
					> div {
						position: absolute;
						bottom: 0;
						width: 360px;
						height: 100px;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						> label {
							font-size: 40px;
							margin-bottom: 20px;
							> &:nth-child(1) {
								margin-bottom: 20px;
								height: 50px;
								line-height: 50px;
							}
							> &:nth-child(2) {
								font-size: 40px;
								font-weight: bold;
								color: rgb(248, 172, 6);
							}
							> &:nth-child(3) {
								font-size: 20px;

								color: rgb(248, 172, 6);
							}
						}
					}
				}
			}
			> .el-button.is-round {
				margin-top: 50px;
				width: 90%;
				height: 50px;
			}
		}
		.tu {
			width: 700px;
			border-radius: 20px;
			overflow: hidden;
			.imgs {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
