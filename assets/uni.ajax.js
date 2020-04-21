
var Platform='MP';
// #ifdef APP-PLUS
 Platform='APP-PLUS'
// #endif
// #ifdef APP-PLUS-NVUE
 Platform='APP-PLUS-NVUE'
// #endif
// #ifdef H5
 Platform='H5'
// #endif
// #ifdef MP-WEIXIN
 Platform='MP-WEIXIN'
// #endif
// #ifdef MP-ALIPAY
 Platform='MP-ALIPAY'
// #endif
// #ifdef MP-BAIDU
 Platform='MP-BAIDU'
// #endif
// #ifdef MP-TOUTIAO
 Platform='MP-TOUTIAO'
// #endif




function uploadImage(confing){
	return new Promise((resolve, reject) => {
		if(confing.filePath.indexOf(';base64,')!=-1){
			uni.request({
				header: {
					'token': 'hello' //自定义请求头信息
				},
				method:'POST',
				...confing,
				data: {
					filePath: confing.filePath,
					...confing.data
				},
			    success(res) {
					
			    	resolve(res.data);
			    },
				fail(res){
			    	resolve(res.data);
			    },
			});
		}else{
			console.log('uploadFile')
			uni.uploadFile({
				header: {
					'token': 'hello' //自定义请求头信息
				},
				...confing,
				fileType:'image',
				formData:confing.data,
				name: 'image',
			    success(res) {
					
					
			    	resolve(res.data);
			    },
				fail(res){
			    	resolve(res.data);
			    },
			});
		}

	})
}
const baseUrl='http://iyangmei.net/'
var islogin=false;
var timeislogin=null;
function request(config){
		// #ifdef H5

		   /* if(config.url.indexOf(window.location.host)==-1&&config.url.indexOf(baseUrl)==-1){
				config.url='http://iyangmei.net/api/Proxy?url='+config.url
			}	 */
		// #endif
/*	if(!uni.getStorageSync('token')){
        uni.navigateTo({
            url: '/pages/login/login'
        });
        return;
	}*/

		clearTimeout(timeislogin)
		timeislogin =setTimeout(function() {
			islogin=false;
		}, 1000);
	
		if(config.header['api-token']){
			config.header['api-token']=uni.getStorageSync('token');
		}
		if(!islogin){
			islogin=true;
			return uni.request({
				...config,
				header:{

					...config.header,
					//token:getApp().globalData.userinfo.token||'',
					Platform
				},
				success(res){
					if(res.data.code==403&&!config.notologin){
						
						
							console.log('登录')
							//islogin=true; 
							uni.navigateTo({
								url: '/pages/login/login'
							});
						
						return;
					}
					config.success(res);
				},
			});
		}else{
			islogin=true;
			return uni.request({
				...config,
				header:{
			
					...config.header,
					//token:getApp().globalData.userinfo.token||'',
					Platform
				},
				success(res){
					if(res.data.code==403&&!config.notologin){
						return;
					}
					config.success(res);
				},
			});
		}
}

export default{
	uploadImage,
	request
}
