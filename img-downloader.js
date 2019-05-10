

/**
 * 下载图片的模块
使用方法：
	let promise = downloader.load(url, imgName);
	promise.then(([error, res])=>{
		console.log(error, res);  // error 和 res 只会有一个存在，另一个为null
	});

注意事项:
1. 没有下载进度。
2. web端会有跨域问题。 
3. 支持 http 或 https 开头的绝对路径， 也支持 /static/aa.png 或 static/aa.png 这种项目中的相对路径。
4. 不支持支付宝小程序。
5. 只在 google浏览器 、 微信小程序开发者工具 、手机微信小程序 中测试过。只测试过下载图片，应该不支持下载其它文件。
6. load 函数返回的是一个 promise 对象，并且一般只会回调 then , 不会回调 catch, 除非你自己在 then中写的代码报错了。
7. 注意，在微信小程序中，第一次调用相册会弹出授权弹框，
   如果用户本次拒绝授权，则本次下载失败，并且下次再调用时，不会再弹授权框，而是直接下载失败。
8. 只有在 web 端，才能重命名下载的图片的名字。
9. 在 web 端，回调 then 时，其实只是 说明开始下载了，至于是否会下载成功，则是未知的。
 */
class  Downloader{
    Downloader = Downloader;
    
    async load(url, name){
		url = url.trim();
        const arr = url.match(/(([\w\d_\-]+)(\.[\w\d_]+))$/); //默认取地址中的文件名
		
		if(!name){
			name = arr ? arr[1] : '__default';
		}
		if(!name.match(/\.[\w\d_]+$/)){
			name += (arr && arr[3] || '.png');
		}
		
		let error, res;
		if( !url.match(/^https?:\/\//i) ){ //如果不是绝对路径，在小程序和app中下载会直接失败
			// #ifdef APP-PLUS || MP
				[error, res] = [null, {tempFilePath: url}];
			// #endif
		}else{
			//在web端时，downloadFile的作用只是 确定当前的资源和网络，可能会拿到一些下载失败的信息
			[error, res] = await uni.downloadFile({url: url});
			if(error){ //h5下载图片的跨域在这一步就能知道
				return [error];
			}else if(res.statusCode !== 200){ //可能是404
				res.errMsg = "downloadFile:fail";
				return [res];
			}
		}
        
        // #ifdef H5
		try{
			//如果这里传入 url，则会在另一个窗口打开图片，而不是下载
		    this.__webDownloadImg(res.tempFilePath, name);
		}catch(e){
		    return [e];
		}
        // #endif

        // #ifdef MP-ALIPAY
        return [{errMsg: 'plat not support download!'}];  //在支付宝小程序中，不支持saveImageToPhotosAlbum，需要使用其它的方式实现下载
        // #endif
        
        // #ifdef APP-PLUS || MP
        [error, res] =  await  uni.saveImageToPhotosAlbum({filePath: res.tempFilePath});
        if( error ){
            return [error];
        }
		// #endif
		
		return [null, res];
    }
	
     // 注意，在浏览器中用户可能设置了阻止下载文件，此时代码也会正常执行完成，但其实是没有真正地下载文件的。
	 // 如果不存在这样的资源，则默认会下载本网页(html文件)
    __webDownloadImg(url, name){  //网页中的图片下载
        const body = document.getElementsByTagName('body')[0];
        const aEle = document.createElement('a');
		aEle.setAttribute('download', name || "");
		aEle.style.display = 'none';
        aEle.href =  url;
        aEle.target = '_blank';
        
        body.appendChild(aEle);
        aEle.dispatchEvent( new MouseEvent('click') );  // 模拟鼠标click点击事件
        document.body.removeChild(aEle);
    }
}

export default new Downloader();
