export default{
	dateTime(e){
		let old=new Date(e)
		let now = new Date();
		let d =old.getTime()
		let h =old.getHours()
		let m =old.getMinutes()
		let Y =old.getFullYear();
		let M =old.getMonth()+1;
		let D =old.getDate();
		
		let nd =now.getTime();
		let nh =now.getHours();
		let nm =now.getMinutes();
		let nY =now.getFullYear();
		let nM =now.getMonth()+1;
		let nD =now.getDate();
		if(D===nD && M===nM && Y===nY){
			if(h<10){h='0'+h}
			if(m<10){m='0'+m}
			return h+':'+m
		}
		
		//昨天时间
		if(D+1===nD && M===nM && Y===nY){
			if(h<10){h='0'+h}
			if(m<10){m='0'+m}
			return '昨天'+h+':'+m
		}else return Y+'/'+M+'/'+D
		
	},
	//聊天时间
	dateTime1(e){
		let old=new Date(e)
		let now = new Date();
		let d =old.getTime()
		let h =old.getHours()
		let m =old.getMinutes()
		let Y =old.getFullYear();
		let M =old.getMonth()+1;
		let D =old.getDate();
		
		let nd =now.getTime();
		let nh =now.getHours();
		let nm =now.getMinutes();
		let nY =now.getFullYear();
		let nM =now.getMonth()+1;
		let nD =now.getDate();
		if(D===nD && M===nM && Y===nY){
			if(h<10){h='0'+h}
			if(m<10){m='0'+m}
			return h+':'+m
		}
		
		//昨天时间
		if(D+1===nD && M===nM && Y===nY){
			if(h<10){h='0'+h}
			if(m<10){m='0'+m}
			return '昨天 '+h+':'+m
		}else if(Y===nY){
			//今年
			if(h<10){h='0'+h}
			if(m<10){m='0'+m}
			return M+'月'+D+'日 '+h+':'+m
		}else{
			//大于今年
			if(h<10){h='0'+h}
			if(m<10){m='0'+m}
			return Y+'年'+M+'月'+D+'日 '+h+':'+m
		}
		
	},
	//间隔时间差
	spacTime(old,now){
		old=new Date(old)
		now=new Date(now)
		var told=old.getTime();
		var tnow=now.getTime();
		if(tnow>(told+1000*60*5)){
			return now;
		}else return ''
	},
	//详情时间转换
	detailTime(e){
		let old=new Date(e)
		
		let d =old.getTime()
		let h =old.getHours()
		let m =old.getMinutes()
		let Y =old.getFullYear();
		let M =old.getMonth()+1;
		let D =old.getDate();
		
		//处理时间
		if(M<10){M='0'+M}
		if(D<10){D='0'+D}
		if(h<10){h='0'+h}
		if(m<10){m='0'+m}
		return Y+'-'+M+'-'+D+' '+h+':'+m;
		
		
	},
	detailTime1(e){
		let old=new Date(e)
		
	
		let Y =old.getFullYear();
		let M =old.getMonth()+1;
		let D =old.getDate();
		
		//处理时间
		if(M<10){M='0'+M}
		if(D<10){D='0'+D}
	
		return Y+'-'+M+'-'+D
		
		
	},
	//搜索延时作用函数
	debounce(fn, t){
	    let delay = t || 500;
	    let timer;
	   
	    return function () {
	        let args = arguments;
	        if(timer){
	            clearTimeout(timer);
	        }
	        timer = setTimeout(() => {
	            timer = null;
	            fn.apply(this, args);
	        }, delay);
	    }
	},
	
	//排序
	paixu:function(arr,obj,tip){
		var s;
		if(tip==0){
			//降序排序
			for(let i=1;i<arr.length;i++){
				for(let j=i;j>0;j--){
					if(arr[j][obj]>arr[j-1][obj]){
						s=arr[j];
						arr[j]=arr[j-1];
						arr[j-1]=s
					}
				}
			}
			return arr;
		}else if(tip==1){
			//升序排序
			for(let i=1;i<arr.length;i++){
				for(let j=i;j>0;j--){
					if(arr[j][obj]<arr[j-1][obj]){
						s=arr[j];
						arr[j]=arr[j-1];
						arr[j-1]=s
					}
				}
			}
			return arr;
		}
	}
}
