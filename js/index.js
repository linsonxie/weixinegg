//页面初始化
$(function(){
    $(".eggList li").hover(function() {
        var posL = $(this).position().left + $(this).width();
        $("#hammer").show().css('left', posL);
    })

    $(".eggList li").click(function() {
        $(this).children("span").hide();
        eggClick($(this));
    });
});

function eggClick(obj) {
    var _this = obj;
    $.getJSON("data.php",function(res){//ajax请求
        _this.unbind('click'); //解除click
        $(".hammer").css({"top":_this.position().top-55,"left":_this.position().left+185});
        $(".hammer").animate({//锤子动画
                "top":_this.position().top-25,
                "left":_this.position().left+125
            },30,function(){
                _this.addClass("curr"); //蛋碎效果
                _this.find("sup").show(); //金花四溅
                $(".hammer").hide();//隐藏锤子
                $('.resultTip').css({display:'block',top:'100px',left:_this.position().
                        left+45,opacity:0})
                    .animate({top: '50px',opacity:1},300,function(){//中奖结果动画
                        if(res.msg==1){//返回结果
                            $("#result").html("恭喜，您中得"+res.prize+"!");
                        }else{
                            $("#result").html("很遗憾,您没能中奖!");
                        }
                    });
            }
        );
    });
}
