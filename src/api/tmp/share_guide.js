var shareGuideInstance = (function(shareGuideInstance,$){
    var container = null;
    function initPageView(){
        container = $("#share-guide");

        var clientWidth = $(window).width();

        $(".share-guide-top").css({
            "width": clientWidth/750*620+"px",
            "height": clientWidth/750*640+"px"
        });

        $(".share-guide-tooltip").css({
            "width": clientWidth/750*620+"px"
        });

        var userAgent = window.navigator.userAgent;
        var androidURL = 'wshShare://p/openwith?data="{\"shopId\":\"1\"}"';
        var iosURL = "wshShare://?shop=1";

        var androidDownloadURL = "http://www.powerlongmall.com.cn/APPDownload/pd/PDMobileDemo.apk";
        var iosDownloadURL = "https://www.pgyer.com/0Fjg";

        if(userAgent.match(/MicroMessenger/i)=="MicroMessenger"){
            return;
        }


        if(userAgent.match(/Android/i)){
            $("#iframe").attr("src",androidURL);

            setTimeout(function(){
                window.location=androidDownloadURL;
            },1000);
        }

        if(userAgent.match(/iPad|iPhone|iPod/i)){

            if(window.location.href.indexOf("download")>0){
                setTimeout(function(){
                    window.location=iosDownloadURL;
                },1000);
                return;
            }

            if(userAgent.match(/iphone os 9/i)){
                window.location=iosURL;
                setTimeout(function(){
                    history.pushState({},"","#download");
                    window.location.reload(false);

                },300);
            }else{
                $("#iframe").attr("src",iosURL);

                setTimeout(function(){
                    window.location=iosDownloadURL;
                },1000);
            }
        }
    }

    function bindPageEvents(){}

    shareGuideInstance.init = function(){
        initPageView();
        bindPageEvents();
    };

    return shareGuideInstance;

})(shareGuideInstance||{},jQuery);

shareGuideInstance.init();




