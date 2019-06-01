<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import downloader from '../../common/img-downloader.js';
	var urls = {
	url_0: 'http://q2.qlogo.cn/headimg_dl?bs=541151284&dst_uin=541151284&dst_uin=541151284&;dst_uin=541151284&spec=100&url_enc=0&referer=bu_interface&term_type=PC',
	url_1: 'https://wx.qlogo.cn/mmopen/vi_32/YTIr8z4omx1pNID1TFmE2eRktUsXMcIJm5D6HbLoRXpTlSticG0tibhFccJBLszdAe9uFbwGL6bJtBHWsBD6VPtQ/132',
	url_2: 'http://192.168.204.106:8080/head.jpg',
	url_3: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557460401&di=73c9b32806d6cc7a8cb51ce0c9c3a967&src=http://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/lvpics/h=800/sign=9b85be945bafa40f23c6c3dd9b65038c/03087bf40ad162d91aa66bba10dfa9ec8b13cdc8.jpg',
	url_4: 'http://www.aa.com/aa.png',
	url_5: 'http://aawww.aa.com/aa.png',
	url_6: '/static/logo.png',
	url_7: '/static/logo1111.png',
	}
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			let promise = downloader.load(urls.url_1, 'aaaa');
			promise.then(([error, res])=>{
				console.log(error, res);
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
