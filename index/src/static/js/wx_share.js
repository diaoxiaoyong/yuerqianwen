
import axios from 'axios'
	function initPage (title,href,imgurl,desc) {
    	var title = title;
    	var href = href;
    	var imgurl = imgurl;
		var desc = desc;
		console.log(title,href,imgurl,desc)
        /***用户点击分享到微信圈后加载接口接口*******/
		var href = encodeURI(href)
		axios.post('/wx/share', {
			url: window.location.href,
		})
		.then(function (response) {
			console.log(response)
			data = response.data
		        console.log(data)
		        encodeURIComponent(data.signature)
		        wx.config({
					debug: false,
					appId: data.appid,
					timestamp:data.timestamp,
					nonceStr:data.nonceStr,
					signature:data.signature,
					jsApiList: [
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
					]
				});
				
				wx.ready(function(){
	        		wx.checkJsApi({
				    	jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage',], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				    	success: function(res) {
				    		console.log(res)
				    	}
					});
	                wx.onMenuShareTimeline({
	                    title : title, // 分享标题
	                    link : href, // 分享链接
	                    imgUrl : imgurl, // 分享图标
	                    success : function() {
	                        // 用户确认分享后执行的回调函数
	                        
	                    },
	                    cancel : function() {
	                        // 用户取消分享后执行的回调函数
	                       
	                    }
	                });
	                //wx.hideOptionMenu();/***隐藏分享菜单****/
	            
	            wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgurl, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空s
					success: function () {
					// 用户确认分享后执行的回调函数
						
					},
					cancel: function () {
					// 用户取消分享后执行的回调函数
					
					}
				});
			});
			
			wx.error(function (res) {
				alert(res.errMsg);
			}); 
		})
		.catch(function (error) {
			console.log(error);
		});

    }
	export { 
		initPage
	}