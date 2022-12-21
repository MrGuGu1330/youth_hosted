<template>
	<div class="connt">
		<h3>旅店图片</h3>
		<div class="imgsBar">
			<el-carousel indicator-position="outside" height="500px">
				<el-carousel-item v-for="item in imgs" :key="item">
					<img :src="item" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		imgs: [],
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
.connt {
	padding: 20px;
	h3 {
		border-bottom: rgb(221, 221, 221) 1px solid;
		margin-bottom: 20px;
	}
	.imgsBar {
		margin: 20px auto;
		width: 80%;
		height: 500px;
		img {
			width: 100%;
			height: 100%;
		}
		.el-carousel__item h3 {
			color: #475669;
			font-size: 14px;
			opacity: 0.75;
			line-height: 200px;
			margin: 0;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n + 1) {
			background-color: #d3dce6;
		}
	}
}
</style>
