/**
 * Created by whobird on 17/8/23.
 */
main.share=function() {
    //http://plocc.powerlong.com/mobileWeb//admin/wechat/getWechatParameters.htm
    $.get("http://plocc.powerlong.com/mobileWeb//admin/wechat/getWechatParameters.htm", function (data) {
      console.log(data);
      if (data.code == 0) {
        var wData = data.data;
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wData.appId, // 必填，公众号的唯一标识
          timestamp: wData.timestamp, // 必填，生成签名的时间戳
          nonceStr: wData.nonceStr, // 必填，生成签名的随机串
          signature: wData.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      } else {
        return false;
      }


    });


    wx.onMenuShareTimeline({
      title: '悦商科技', // 分享标题
      link: 'http://www.yueworld.cn', // 分享链接
      imgUrl: 'http://www.yueworld.cn/static/images/yue_350.png', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareAppMessage({
      title: '悦商科技', // 分享标题
      desc: '基于资产打造层层管理系统，从资管到商管，一路贯通', // 分享描述
      link: 'http://www.yueworld.cn', // 分享链接
      imgUrl: 'http://www.yueworld.cn/static/images/yue_350.png', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

  };


//take photo

// 图片接口
// 拍照、本地选图
var images = {
  localId: [],
  serverId: []
};

// 拍照或者选择照片
function take_a_photo(){
  wx.chooseImage({
    count: 1, // 默认9，这里每次只处理一张照片
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

      var i = 0, length = images.localId.length;
      function upload() {
        wx.uploadImage({
          localId: images.localId[i],
          success: function(res) {
            i++;
            alert('已上传：' + i + '/' + length);
            images.serverId.push(res.serverId);

// res.serverId 就是 media_id，根据它去微信服务器读取图片数据：
            var indata = {"media_id":res.serverId};
            $.post("/weixin/getPhoto.json", indata, function(data){
              if(data.rs == 'f'){
                alert("系统错误");
              }else{
                alert(data.body); // 返回 图片在我们自己的服务器的url
              }
            },'json');

            if (i < length) {
              upload();
            }
          },
          fail: function(res) {
            alert(JSON.stringify(res));
          }
        });
      }
      upload();
    }
  });
}
