/**
 * Created by admin on 2017/6/21.
 */
$(function () {
    $('.yys a').on('click',function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top-52}, 900);//此处改速度
        event.preventDefault();
    });
    /*不能直接用类名 需要类似这种格式.yys a  然后HTML两个id名就可以了，其他的直接复制*/
})
$.fn.navFixed=function(){$_this=$(this);
    $_this_prev_marginBottom=parseInt($_this.prev().css("margin-bottom").substring(0,$_this.prev().css("margin-bottom").length-2));
    $_this_next_marginTop=parseInt($_this.next().css("margin-top").substring(0,$_this.next().css("margin-top").length-2));
    _topPosition=$(document).scrollTop();_navPosition=$_this.prev().outerHeight(true);
    a();$(document).scroll(function(){_topPosition=$(document).scrollTop();
        a()});$(window).resize(function(){_navPosition=$_this.prev().outerHeight(true);
        a()});function a(){if(_topPosition>=_navPosition){$_this.css("position","fixed");
        $_this.next().css("margin-top",$_this_prev_marginBottom+$_this.outerHeight()+$_this_next_marginTop+"px")}else{$_this.css("position","relative");
        $_this.next().css("margin-top",$_this_next_marginTop+"px")}}};