<template>
	<div class="Map">
		<div id="allmap"></div>
	</div>
</template>

<script>
/* eslint-disable quotes,camelcase */

// import { MP } from '@/components/map';
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
	name: 'Map',
	data() {
		return {
			// ak: 'Oc2DUSk8WG6gURRy6bGoQhiv6FjLTUfw',
		};
	},
	watch: {
		province(newVal, oldVal) {
			this.getLngLat();
		},
	},
	mounted() {
		this.$nextTick(() => {});
	},
	props: {
		province: {
			type: String,
		},
		name: {
			type: String,
		},
		city: {
			type: String,
		},
	},
	methods: {
		// 获取经纬度
		getLngLat() {
			AMapLoader.load({
				key: '8c10dcbccd5d0c6b8fe424c288ebf0cc',
				version: '2.0',
				plugins: ['AMap.Geocoder'],
			})
				.then(AMap => {
					// 拼接详细地址
					let address = this.province + this.city + this.name;
					let geocoder = new AMap.Geocoder();

					geocoder.getLocation(address, (status, result) => {
						if (status === 'complete' && result.info === 'OK') {
							// 获取经纬度
							let lnglat = [
								result.geocodes[0].location.lng,
								result.geocodes[0].location.lat,
							];

							this.createMaker(AMap, lnglat);
						} else {
							this.$message.error('地址有误');
						}
					});
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 创建点坐标
		createMaker(AMap, lnglat) {
			let map = new AMap.Map('allmap', {
				zoom: 16,
				center: lnglat,
			});

			let marker = new AMap.Marker({
				position: lnglat,
			});

			map.add(marker);
		},
	},
};
</script>
<style lang="scss" scoped>
#allmap {
	height: 400px;
	width: 100%;
}
</style>
