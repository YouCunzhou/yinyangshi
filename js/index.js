/**
 * Created by Administrator on 2017/6/17.
 */
$(function () {
    var TopBarConfig={
        pvList:[
            {
                name: "\u5b89\u5353\u5145\u503c9.8\u6298",
                link: "http://rd.da.netease.com/redirect?t=zPJ3p1rAsE&p=MmVZMh&proId=1024&target=http%3A%2F%2Fwww.kaola.com%2Factivity%2Fdetail%2F11835.shtml%3Ftag%3D7cc46fc8c91a33ec9aa62298347b4ede"
            },
            {
                name: "\u9886\u53d6\u7f51\u6613\u4e25\u9009\u5b9d\u7bb1",
                link: "http://u.163.com/gamerkwzl"}
        ]
    };
    var  flag=true;
    var  arr1=[{r1Left:68,opacity:1},{r1Left:159,opacity:0}];
    var  arr2=[{r2Left:366,opacity:1},{r2Left:159,opacity:0}];
    var  arr3=[{r3Left:159,opacity:0},{r3Left:48,opacity:1}];
    var  arr4=[{r4Left:159,opacity:0},{r4Left:282,opacity:1}];
    //"阴阳师"文字显示隐藏
    window.onscroll=function () {
        if(scroll().top>=$('.topbar')[0].offsetHeight){
            $('.download').css({'display':'block'});
            $('.game-logo a img').stop().animate({width:70,height:199,left:0,top:0},500);
            $('#scrollBar').css({'background':'rgba(255,255,255,.9)','position':'fixed','top':'0'})
        }else{
            $('.download').css('display','none');
            $('.game-logo a img').stop().animate({width:0,height:0,left:35,top:99},500);
            $('#scrollBar').css({'position':'absolute','background':'rgba(255,255,255,0)','top':'55px'})
        }
    };
 
    //点击切换
    $('.swiper').click(function () {
            arr1.unshift(arr1.pop());//切换位置
            arr2.unshift(arr2.pop());//切换位置
            arr3.unshift(arr3.pop());//切换位置
            arr4.unshift(arr4.pop());//切换位置
            if(flag){
                animate($('.r1').get(0), {left: arr1[0].r1Left, opacity: arr1[0].opacity, speed: 46});
                animate($('.r2').get(0), {left: arr2[0].r2Left, opacity: arr2[0].opacity, speed: 25},function () {
                    animate($('.r3').get(0), {left: arr3[0].r3Left, opacity: arr3[0].opacity, speed: 28});
                    animate($('.r4').get(0), {left: arr4[0].r4Left, opacity: arr4[0].opacity, speed: 25});
                });
            }
            else{
                animate($('.r3').get(0), {left: arr3[0].r3Left, opacity: arr3[0].opacity, speed: 28});
                animate($('.r4').get(0), {left: arr4[0].r4Left, opacity: arr4[0].opacity, speed: 25},function () {
                    animate($('.r1').get(0), {left: arr1[0].r1Left, opacity: arr1[0].opacity, speed: 46});
                    animate($('.r2').get(0), {left: arr2[0].r2Left, opacity: arr2[0].opacity, speed: 25})
                });
            }
            flag=!flag;
        }
    );
    
    //左侧轮播
    function addFlow() {
        var screen = $('.drap').get(0);
        var ul = screen.children[0];
        var imgList = ul.children;
        var jump = ul.nextElementSibling;
        var squares = jump.children;//按钮
        var right = document.getElementById('right');
        var pic = 0;//图片索引
        var timer1 = null;
        var square = 0;
        //创建新元素
        for(var i=0;i<$('.jump').children().length;i++){
            var li=$('#drap li:first').get(0).cloneNode(true);
            $('#drap ul').get(0).appendChild(li);
            if(i ==$('.jump').children().length-1){
                break;
            }
            $('#drap li img:last').get(0).src='images/flow'+(i+2)+'.jpg';

        }
        for (var i = 0; i < squares.length; i++) {
            squares[i].index = i;//给每个按钮设置一个索引
            squares[i].onmouseover = function () {//注册mouseover事件
                for (var i = 0; i < squares.length; i++) {
                    squares[i].className = '';
                }
                this.className = 'current';
                var target = -this.index * screen.offsetWidth; //偏移
                animate(ul, target);
                pic = this.index;
                square = this.index;
                clearInterval(timer);
            }
            squares[i].onmouseout = function () {
                timer = setInterval(autoPlay, 1000);
            }
        }
      var autoPlay = function () {       //单击一次移动一次
            if (pic === imgList.length - 1) {//是否到最后一张
                //ul瞬间归零，索引为0
                pic = 0;
                ul.style.left = -pic * screen.offsetWidth + 'px';
            }
            pic++;
            var target = -pic * screen.offsetWidth;
            animate(ul, target);
            if (square < squares.length - 1) {
                square++;
            } else {
                square = 0;
            }
            for (var i = 0; i < squares.length; i++) {
                squares[i].className = '';
            }
            squares[square].className = 'current';
        };
        // 6.自动播放
        timer = setInterval(autoPlay, 1000);//间隔事件必须大于animate间隔
        function animate(obj, target) {  //动画函数封装
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var step = 40;
                var leader = obj.offsetLeft;
                step = target > obj.offsetLeft ? step : -step;
                if (Math.abs(target - obj.offsetLeft) >= Math.abs(step)) {//剩余距离是否小于step
                    leader += step;
                    obj.style.left = leader + 'px';
                } else {
                    obj.style.left = target + 'px';
                    clearInterval(obj.timer);
                }
            }, 16)
        }
    }
    //扫码滚动
    setInterval(function () {
        // 当前margin-top值大于父盒子宽高与bar只差
        var barMarginTop=parseInt(getStyle($('.bar')[0],'margin-top'));
        var barPartHeight=$('.bar')[0].parentNode.offsetHeight;
        var barHeight=$('.bar')[0].offsetHeight;
           if(barMarginTop > barPartHeight - barHeight ){
               barMarginTop=0;
           }
           barMarginTop++;
           $('.bar').css('marginTop',barMarginTop)
    },25);
    //顶栏图片放大部分
    function wrapGameAdFn() {
        var wrapGameAd = document.getElementById('wrapGameAd');
        var bigOtherGameAd = document.getElementById('bigOtherGameAd');
        //鼠标经过小盒子，大盒子显示，小盒子隐藏
        wrapGameAd.onmouseenter = function () {
            bigOtherGameAd.style.display='block';
            this.children[0].style.visibility='hidden';
        };
        bigOtherGameAd.onmouseleave = function () {
            wrapGameAd.children[0].style.visibility='visible';
            this.style.display='none';
        }
    }
    //顶栏定时滚动部分
    function scrollMenu(obj) {
        var activities=document.getElementById('activities');
        //先更改内容，再执行动画     动画执行完，快速回到原位
        //重复执行(定时器)
        activities.children[0].innerHTML=obj.pvList[0].name;
        setInterval(function () {
            // activities.children[0].innerHTML=obj.pvList[0].link;
            //动画 当top为55px时，
            if(parseInt(activities.children[0].style.top)==0){
                // timeElapsed();
                animate(activities.children[0],{speed:50,top:-55,opacity:0},function () {
                    if(parseInt(activities.children[0].style.top)==-55){
                        activities.children[0].style.top=55+'px';
                    }
                    if(parseInt(activities.children[0].style.top)==55){
                        TopBarConfig.pvList.push(TopBarConfig.pvList.shift());
                        activities.children[0].innerHTML=obj.pvList[0].name;
                        activities.children[0].href=obj.pvList[0].link;
                        animate(activities.children[0],{speed:50,top:0,opacity:1})
                    }
                });
            }
        },3000);
    }
    //新闻滚动
    function newsScroll() {
        $('.news-top a').mouseover(function () {
/*            $('.news-top a em').removeClass('active');//移除em上的样式
            $(this).find('em').addClass('active');//当前元素下的em添加样式*/
            $(this).find('em').addClass('active').end().siblings().find('em').removeClass('active');
            var $index=$(this).index();
            animate($('.scroll').get(0),{left:-$index*500,speed:20})

        })
    }
    //式神部分
    function shiShen() {
        //动态生成ul
        var flag=true;
        var ImgNum=40; //图片数量
        for (var i = 0; i < ImgNum/2; i++) {
            $('.shishen-list ul:first').clone().appendTo($('.shishen-list'));
        }//按钮点击事件
        var pic = 0;
        var boxWidth = 828;
        var ImgNumInBox=6;
        var boxNum=Math.ceil($('.shishen-list ul').length/ImgNumInBox);
        $('.go-left').click(function () {
            if(flag){
                flag=false;
            if (pic === 0) {
                return ;
            }
            pic--;
            if(pic==0){
                $('.go-left').css('display','none');
            }else{
                $('.go-left').css('display','block');
            }
            $('.shishen-list').stop().animate({left:-boxWidth*pic},1500,function () {
                flag=true;
                return false;
            })
        }
        });
        $('.go-right').click(function () {
           if(flag){
               flag=false;
            if (pic === boxNum-1) {
                return ;
            }
            pic++;
            if(pic==0){
                $('.go-left').css('display','none');
            }else{
                $('.go-left').css('display','block');
            }
            $('.shishen-list').stop().animate({left:-boxWidth*pic},1500,function () {
                flag=true;
                return false;
            })
        }
            })

    }
    //侧边栏下拉
    function sideBar() {
        var o=[{
            poX:-759,
            poY:-4,
            resetPoX:-662,
            resetPoY:-1044,
            amplifyHeight:206,
            returnHeight:100
        },
            {
                poX:-317,
                poY:-3,
                resetPoX:-618,
                resetPoY:-1300,
                amplifyHeight:360,
                returnHeight:90
            },
            {
                poX:-621,
                poY:-669,
                resetPoX:-308,
                resetPoY:-1300,
                amplifyHeight:184,
                returnHeight:90
            },
            {
                poX:-328,
                poY:-666,
                resetPoX:-302,
                resetPoY:-1193,
                amplifyHeight:187,
                returnHeight:100
            },
            {
                poX:0,
                poY:-377,
                resetPoX:-330,
                resetPoY:-1053,
                amplifyHeight:289,
                returnHeight:131
            },
            {
                poX:-3,
                poY:0,
                resetPoX:-3,
                resetPoY:-1297,
                amplifyHeight:363,
                returnHeight:90
            },
            {
                poX:-1080,
                poY:-888,
                resetPoX:-1080,
                resetPoY:-888,
                amplifyHeight:97,
                returnHeight:97
            },
            {
                poX:-914,
                poY:-1201,
                resetPoX:-914,
                resetPoY:-1201,
                amplifyHeight:84,
                returnHeight:84
            },
            {
                poX:-596,
                poY:-1193,
                resetPoX:-596,
                resetPoY:-1193,
                amplifyHeight:94,
                returnHeight:94
            },
        ];
        $('.index_side_bar dd').mouseenter(function () {
            if($(this).index()===5){
                $(this).css('zIndex',20) ;//针对第5个和第6模块的高度覆盖问题作出的解决方法
            }
            $(this).css({'backgroundPositionX':o[$(this).index()-1].poX,'backgroundPositionY':o[$(this).index()-1].poY}).find('div').find('*').css('visibility','visible');
            $(this).stop().animate({'left':15,"height":o[$(this).index()-1].amplifyHeight},200);
        }).mouseleave(function () {

            $(this).stop().animate({"height":o[$(this).index()-1].returnHeight,'left':0},300,function () {
                if($(this).index()===5){
                    $(this).css('zIndex',5) ;//针对第5个和第6模块的高度覆盖问题作出的解决方法
                };
                $(this).css({'backgroundPositionX':o[$(this).index()-1].resetPoX,'backgroundPositionY':o[$(this).index()-1].resetPoY}).find('div').find('*').css('visibility','hidden');
            });
        })
    }
    //search按钮
    function search() {
        $('.btn-search').mouseenter(function () {
            $(this).css({'backgroundPositionX':-1400,'backgroundPositionY':-505, 'cursor':'pointer'})
        }).mouseleave(function () {
            $(this).css({'backgroundPositionX':-1400,'backgroundPositionY':-563, 'cursor':'default'})
        })
    }
    scrollMenu(TopBarConfig);
    search()
    wrapGameAdFn();
    addFlow();
    newsScroll();
    shiShen();
    sideBar();
});


/*
setInterval(function () {
    {同步定时模块}
    {其他代码模块}
},1000)
{顺序执行的代码}*/
