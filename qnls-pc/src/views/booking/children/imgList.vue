<template>
	<div>
		<ul ref="listBar" class="list-bar">
			<li
				v-for="item in data"
				:key="item.supplier_id"
				@click="orderUp(item.supplier_id)"
				class="list-item"
			>
				<div>
					<img
						:src="`${$store.state.baseURL + item.supplier_imgs}`"
						alt=""
					/>
					<div class="item-content">
						<label for="">
							<h2>{{ item.supplier_name }}</h2>
							<p>
								<i class="el-icon-location"></i
								>{{ item.supplier_address }}
							</p>
						</label>

						<label class="price" for=""
							>房间：￥{{ item.min_price }}元起</label
						>
					</div>
				</div>
			</li>
		</ul>
		<div class="page_area">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-size="5"
				:current-page="pageCurrent"
				:total="total - 0"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { getList } from '@/network/booking';
export default {
	name: 'imgList',
	// http://120.26.36.21:3000/imgs/houses/tpy-01-1-1.jpg

	data() {
		return {
			data: [],
			num: 0,
			pageCurrent: 1, // 当前页码
			total: 0, // 总条数
			pageCount: 0, // 总页数
		};
	},
	props: {
		position: '',
	},
	watch: {
		position(newname, oldname) {
			let position = newname;
			if (position == '全国') {
				this.getlistAll();
			} else {
				getList({
					supplier_address: position,
					pageCurrent: this.pageCurrent,
					pageSize: 5,
				}).then(res => {
					// console.log(res);
					// console.log(this.pageCurrent);
					this.data = res.data.data;
					this.total = res.data.total;
					this.pageCount = res.data.pageCount;
					// console.log(this.data);
					//传输到父组件目前搜索到多少条记录
					this.num = this.data.length;
					this.postNum(this.num);
				});
			}
		},
	},
	methods: {
		handleCurrentChange(pageCurrent) {
			this.pageCurrent = pageCurrent;
			this.getlistAll();
		},
		postNum(total) {
			this.$emit('setNum', total);
		},
		orderUp(id) {
			this.$router.push({
				// path: `/order/${item.supplier_id}`,
				name: 'oder',
				query: { id },
			});
		},
		getlistAll() {
			// console.log(this.pageCurrent);
			getList({ pageCurrent: this.pageCurrent, pageSize: 5 }).then(
				res => {
					// console.log(res);
					// console.log(this.pageCurrent);
					this.data = res.data.data;
					this.total = res.data.total;
					this.pageCount = res.data.pageCount;
					// console.log(this.data);
					//传输到父组件目前搜索到多少条记录
					this.postNum(this.total);
				}
			);
		},
	},
	mounted() {
		this.getlistAll();
	},
};
</script>

<style lang="scss" scoped>
.list-bar {
	> .list-item {
		cursor: pointer;
		width: 740px;
		height: 200px;
		position: relative;
		> div {
			position: absolute;
			width: 740px;
			height: 192px;
			display: flex;
			align-items: center;
			flex: none;
			top: 0;
			transition: 0.5s;
			&:hover {
				top: -5px;
				box-shadow: 5px 5px 5px #e7e6e6;
			}
			> img {
				width: 220px;
				height: 150px;
				border-radius: 10px;
			}
			> .item-content {
				margin-left: 20px;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.price {
					color: #f7941c;
					font-weight: bold;
					font-size: 18px;
				}
			}
		}
	}
}
</style>
