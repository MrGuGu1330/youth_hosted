<template>
	<div>
		<div class="bg"></div>
		<div class="list-dp">
			<div class="searchBar">
				<!-- 目的地 -->
				<div class="destination">
					<el-input placeholder="目的地" v-model="input" clearable>
					</el-input>
				</div>
				<!-- 日期选择器 -->
				<div class="date">
					<div class="block">
						<el-date-picker
							v-model="value2"
							type="daterange"
							align="right"
							unlink-panels
							range-separator="——"
							start-placeholder="入住日期"
							end-placeholder="退房日期"
							:picker-options="pickerOptions"
						>
						</el-date-picker>
					</div>
				</div>

				<!-- 搜索按钮 -->
				<div class="search">
					<el-button
						type="success"
						@click.native="getPostion"
						icon="el-icon-search"
						>搜索</el-button
					>
				</div>
			</div>
		</div>
		<div class="bookContainer">
			<div class="title">
				<h2>
					<label class="position" for="">{{ position }}</label
					>: 今日共有
					<label class="num" for="">{{ num }}</label>
					家旅舍可供预订
				</h2>
			</div>

			<div class="sort">
				<label for="">排序方式：</label><span>价格</span>
			</div>
			<div class="list">
				<div class="listLeft">
					<img-list @setNum="setNum" :position="position"></img-list>
				</div>
				<div class="listRight"></div>
			</div>
		</div>
	</div>
</template>

<script>
import imgList from './children/imgList.vue';
export default {
	components: {
		imgList,
	},
	data() {
		return {
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit('pick', [start, end]);
						},
					},
				],
			},
			input: '',
			/*起始时间*/
			value1: '',
			/*结束时间*/
			value2: '',
			position: '全国',
			num: 0,
		};
	},
	methods: {
		setNum(num) {
			this.num = num;
		},
		getPostion() {
			if (this.input) {
				this.position = this.input;
			} else {
				this.position = '全国';
			}
		},
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
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
.list-dp {
	height: 80px;
	width: 100vw;
	background-image: repeating-linear-gradient(to right, #5ed842, #18ded2);
	> .searchBar {
		width: var(--container-width);
		min-width: 1200px;
		height: 65px;
		// background-color: #18ded2;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		> div {
			margin: 0 10px;
		}
		> .destination {
			width: 300px;
		}
		> .date {
			width: 400px;
			> .el-date-editor--daterange.el-input,
			.el-date-editor--daterange.el-input__inner {
				width: 100%;
			}
		}
		> .search {
			width: 120px;
		}
	}
}
.bookContainer {
	background-color: #fff;
	padding: 20px;
	width: var(--container-width);
	min-width: 1200px;
	height: 100%;
	padding-top: 10px;
	margin: 0 auto;
	margin-top: 30px;
	border-top: rgb(202, 236, 255) 1px solid;
	.position {
		color: #4b8fcc;
	}
	.num {
		color: #5ed842;
	}
	> .sort {
		width: 100%;
		height: 50px;
		background-color: #fdffe9;
		line-height: 50px;
	}
	> .list {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: space-between;
		> .listLeft {
			height: 100%;
			width: 60%;
		}
		> .listRight {
			height: 100%;
			width: 30%;
			background-color: #5ed842;
		}
	}
}
</style>
