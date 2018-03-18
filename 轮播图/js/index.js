window.onload=function(){           //当页面加载完毕之后，才获取里面的元素
	var container = document.getElementById('container');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var list = document.getElementById('list');
	var index = 1;
	var animated = false;         //这种优化不太懂   当动画时我们点击时就不应该切换了，当他切换完了（不动画时）点击才会有效
	var timer;
	

	function animate(offset){
		
			animated = true;
		var newleft = parseInt(list.style.left) + offset ;	
		var time = 1000;
		var intervar = 10;
		var speed = offset/(time/intervar)

		function go(){
			if (speed <0 && parseInt(list.style.left) > newleft || speed >0 && parseInt(list.style.left)<newleft) {
				list.style.left = parseInt(list.style.left) + speed +'px';
				setTimeout(go,intervar);
				
			}else{
				list.style.left = newleft + 'px';   //newleft是个数，没有单位
				if(newleft < -3000){
					list.style.left =-600 + 'px';
				}
				if(newleft > -600){
					list.style.left =-3000 +'px';
				}
				animated = false;

			}
		}
		
		go();
		container.onmouseover = stop;
		container.onmouseout = play;
	

	}

	function play(){
		timer = setInterval(function(){next.onclick();},3000)
	}

	function stop(){
		clearInterval(timer);
	}




	function showbutton(){
		for (var i = 1; i <buttons.length; i++) {
			if (buttons[i].className == 'on') {
				buttons[i].className = '';
				break;
			}
		}
		buttons[index - 1].className = 'on';

	}


	next.onclick = function () {
		if (index == 5) {				//为什么是双等
			index = 1;
		}else{
			index += 1;
		}
		
		if (!animated) {animate(-600);}
		
		showbutton();
	}

	prev.onclick = function () {
		if (index == 1) {
			index = 5;
		}else{
			index -= 1 ; 
		}
		
		if (!animated) {animate(600);}
		
		showbutton();
	}



	for (var i = 1; i <=buttons.length; i++) {
		buttons[i].onclick = function(){
			
			var myindex = parseInt(this.getAttribute('index'));    //点击的小圆点的index值（未来的）
			var offset = -600*(myindex - index);                  //index值是当前按钮的index值（现在的）

			animate(offset);
			index = myindex;
			showbutton();
		}
	}

}


















