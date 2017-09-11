window.onload=function () {
    var timer=null;
    var lastPosition=0;
    var box=document.getElementById("box");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ulLis = ul.children;
    var ol=screen.children[1];
    var ollis=ol.children;
    var imgWidth=screen.offsetWidth;
    //攻略 新手
    var raiders=document.getElementById("raiders");
    var as=raiders.getElementsByTagName("a");
    var cloud=document.getElementById("cloud");
    //御魂
    var ulfather=document.getElementById("ul-father")
    var yuhun=document.getElementById("yuhun");
    var divs=yuhun.getElementsByTagName("div");
    //给圆点设置背景颜色
    ollis[0].className="heise";
    var datui=document.getElementById("datui");
    var spans=datui.getElementsByTagName("span");
    //同人专区
    var trzq=document.getElementById("trzq");
    var trlis=trzq.children;
    var imgss=trzq.getElementsByTagName("img");
    var tris=trzq.getElementsByTagName("i");
    var uls=document.getElementById("uls");

    var trlllis=uls.getElementsByTagName("li");//所有的狄仁杰图
    //最下面的二维码
    var ewm=document.getElementById("ewm");
    var men=document.getElementById("men");
    //略过圆点切换图片
    for (var i = 0; i < ollis.length; i++) {
        ollis[i].index=i;
        ollis[i].onmouseover=function () {
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].className="";
            }
            this.className="heise";
            var target=-this.index*imgWidth;
            animate(ul,target,30)
            s=this.index;
        }
    }
    //自动播放
    var pic=0;
    var s=0;//设置前圆点的背景颜色
    function zidong() {
        if(pic===ulLis.length-1){
            ul.style.left=0;
            pic=0;
        }
        pic++;
        var target=-pic*imgWidth;
        animate(ul,target,30)
        if(s<ollis.length-1){
            s++;
        }
        else{
            s=0;
        }
        for (var i = 0; i < ollis.length; i++) {
            ollis[i].className="";//清空原来的样式
        }
        ollis[s].className="heise";
    }
    setInterval(function () {
        zidong()
    },2000)


    //悬赏封印动画
    for (var i = 0; i < spans.length; i++) {
        spans[i].onmouseover=function () {
            for (var i = 0; i < spans.length; i++) {
                spans[i].className="";
            }
            this.className="xs"
        }
    }
    //攻略上的缓动效果
    for (var i = 1; i < as.length; i++) {
        as[i].index=i;
        as[i].onmouseover=function () {
            cloud.style.display="block";
            var target=this.offsetLeft;
            animate1(cloud,{"left":target},function () {

            });
            //下面的御魂 缓动效果
            var target1=-this.index*yuhun.children[0].offsetWidth;
            animate1(yuhun,{"left":target1},function () {
                
            })

        }
    }
    //同人专区
    for (var i = 0; i < trlis.length; i++) {
        trlis[i].index=i;
        trlis[i].onmouseover=function () {
            this.children[0].style.top=-10+"px";
            this.children[1].style.top=-53+"px"
            var target=-this.index*uls.children[0].offsetWidth;
            animate1(uls,{"left":target},function () {
            });

        }
        trlis[i].onmouseout=function () {
            this.children[0].style.top=0+"px";
            this.children[1].style.top=0+"px";
        }
    }

    //同人专区下面的uls
    for (var i = 0; i < trlllis.length; i++) {
        trlllis[i].onmouseover=function () {
            this.children[2].style.display="block";
        }
        trlllis[i].onmouseout=function () {
            this.children[2].style.display="none";
        }

    }
    //最下面的二维码
    men.onmouseover=function () {
        ewm.style.display="block";
        animate1(ewm,{"top":60},function () {
        })
        animate1(men,{"bottom":-70},function () {
        })
    }
    men.onmouseout=function () {
        animate1(ewm,{"top":90},function () {
            ewm.style.display="none";
        })
        animate1(men,{"bottom":-30},function () {
        })

    }
    //动画函数
    function animate(obj,target,step) {
        clearInterval(obj.timer)
        obj.timer=setInterval(function () {
            var leader=obj.offsetLeft;
            var tip=leader<target?step:-step;
            if(Math.abs(leader-target)>=Math.abs(tip)){
                leader=leader+tip;
                obj.style.left=leader+"px";
            }
            else{
                obj.style.left=target+"px";
                clearInterval(obj.timer);
            }
        },15)
    }
    //缓动动画高级版
    function animate1(obj,json,fn) {
        clearInterval(obj.timer)
        obj.timer= setInterval(function () {
            var flag=true;//假设全都达到目标值
            for(var k in json){//k是（键）属性，json[k]是值   //键值对
                if(k==="opacity"){
                    var leader=getStyle(obj,k)*100;
                    var step=10;
                    var target=json[k];
                    step=(target-leader)/10;
                    step=step>0?Math.ceil(step):Math.floor(step);
                    leader=leader+step;
                    obj.style[k]=leader/100;
                }else if(k=="zIndex"){
                    obj.style.zIndex=json[k];
                }
                else{
                    var leader=parseInt(getStyle(obj,k))||0;
                    var step=10;
                    var target=json[k];
                    step=(target-leader)/10;
                    step=step>0?Math.ceil(step):Math.floor(step);
                    leader=leader+step;
                    obj.style[k]=leader+"px";
                }
                if(leader!==target){
                    flag=false;//没达到就是false就不会触发清除定时器
                }
            }
            if(flag){
                clearInterval(obj.timer)
                fn();
            }

        },15)
    }
    //获取任意对象的指定的值
    function getStyle(obj, attr){
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
   
}