//页面初始化
$(function () {
    var url = location.href.split('#')[0];
    url = encodeURIComponent(url);
    $.ajax({
        type: "GET",
        url: "initjssdk.php?param=" + url,
        dataType: "json",
        success: function (res) {
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名，见附录1
                jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                alert("success");
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function (res) {
                alert("error");
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
        }
    });

    $('#choosePicBtn').click(function () {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                $('#pics').append('<li class="weui_uploader_file" style="background-image:url(' + localIds + ')"></li>');
                alert("未认证，没有素材管理权限");
                wx.uploadImage({
                    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        $('#pics').append('<li class="weui_uploader_file" style="background-image:url(' + localIds + ')"></li>');
                    }
                });
            },
            error: function () {
                alert("error");
            }
        });
    });

    $('#submitBtn').click(function () {
        var $tooltips = $('.js_tooltips');
        if ($tooltips.css('display') != 'none') {
            return;
        }

        // 如果有`animation`, `position: fixed`不生效
        $('.page.cell').removeClass('slideIn');
        $tooltips.show();
        setTimeout(function () {
            $tooltips.hide();
        }, 2000);

        var $dialog = $('#dialog1');
        $dialog.show();
        $dialog.find('.default').one('click', function () {
            $dialog.hide();
        });
        $dialog.find('.primary').one('click', function () {
            $dialog.hide();
            submitData();
        });
    });

    /*//单选实现
    $("input[type='checkbox']").click(function () {
        if ($(this).prop('checked') == false) {
            $("input[type='checkbox']").prop('checked', true);
            $(this).prop('checked', false);
        }
        if ($(this).prop('checked') == true) {
            $("input[type='checkbox']").prop('checked', false);
            $(this).prop('checked', true);
        }
    });*/
});


function submitData() {
    $.ajax({
        type: "POST",
        url: "test.php?type=1",
        dataType: "json",
        data: $("#data_form").serialize(),
        success: function (res) {
            if (res.msg == "11") {//返回结果
                toast(res.msg)
            } else {
                toast(res.msg);
            }
            window.location.href = "success.html";
        }
    });
}

function toast(msg) {
    var $toast = $('#toast');
    if ($toast.css('display') != 'none') {
        return;
    }
    $toast.show();
    setTimeout(function () {
        $toast.hide();
    }, 2000);
}