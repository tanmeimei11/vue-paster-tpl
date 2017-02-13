import utils from 'core/module/common';
import {
    allseed,
    TRACK_URL
} from 'core/module/tracker';

const BC_WXSDK = '/webview/webview-common/get-weixin-jssdk-config';
const IN_WXSDK = '/promo/commonapi/getweixinjssdkconfig';
// var SHARE = {
//    type:'bc',
//    shareTitle: '蕉蕉聊天', // 分享标题
//    shareDesc: '来自蕉蕉聊天', // 分享描述
//    shareLink: location.href, // 分享链接
//    shareImg: location.protocol + '//i1.jiuyan.info/2016/12/27/351EB558-33A1-57DC-C43C-1DC315B8FE7E.jpg',
//    shareTrack: 'bc*peeldetail*share'
// };
//  _share.config = SHARE;
/**
 * 依赖zepto
 */
export default class Share {
    constructor(options) {
        this._config = options.config;
        this.WX_SDK = this._config.type == 'bc' || location.href.indexOf('chat.in66.com') > 0 ? BC_WXSDK : IN_WXSDK;
        this.isWX = options.isWX;
        this.isApp = options.isApp;
        this.initWXEnd = false;
        this.initData(this._config);
    }
    initData(config) {
        this._config = config;
        delete this._config.type;
        if (this._config.shareTitle) {
            this.isWX && this.wxConfig();
            this.isApp && this.inConfig();
        }
    }
    initWx() {
        var shareObj = {
            title: this._config.shareTitle,
            link: this._config.shareLink,
            imgUrl: this._config.shareImg,
            desc: this._config.shareDesc,
            success: () => {
                this._config.shareTrack && allseed(this._config.shareTrack);
                this._config.success && this._config.success();
            },
            cancel: () => {
                this._config.cancel && this._config.cancel();
            }
        };
        wx.error(function (res) {
            // alert(JSON.stringify(res));
        });
        wx.ready(function () {
            wx.onMenuShareTimeline(shareObj);
            wx.onMenuShareAppMessage(shareObj);
            wx.onMenuShareQQ(shareObj);
            wx.onMenuShareWeibo(shareObj);
            wx.onMenuShareQZone(shareObj);
        });
    }
    wxConfig() {
        if (this.initWXEnd) return this.initWx();
        this.initWXEnd = true;
        $.get(this.WX_SDK, {
            redirectUrl: location.href.split('#')[0]
        }).done(res => {
            if (res.succ) {
                let data = res.data;
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ]
                });
                this.wxConfig();
            }
        });

    }
    inConfig() {
        let shareSet = document.getElementById('shareSet');
        if (shareSet == null) {
            shareSet = document.createElement('div');
            shareSet.setAttribute('id', 'shareSet');
            document.body.appendChild(shareSet);
        }
        var html = [];
        for (let key in this._config) {
            let _key = key,
                val = this._config[key];
            if (_key == 'shareImg') {
                 html.push(`<input type="hidden" id="shareImgSrc" value="${val}">`);
                 html.push(`<input type="hidden" id="shareImgUrl" value="${val}">`);
            } else if (_key == 'shareTrack') {
                val = `${location.protocol}//${TRACK_URL}?` + [`action=${val}`, `_token=${utils.token}`, `_=${+new Date()}`].join('&');
            }
            html.push(`<input type="hidden" id="${key}" value="${val}">`);
        }
        shareSet.innerHTML = html.join('');
    }
    get config() {
        return this._config;
    }
    set config(config) {
        this.initData(this._config = config);
    }
}
//当有share 参数自动实例化
if (typeof window.SHARE == 'object') {
    window._share = new Share({
        isWX: utils.wx,
        isApp: utils.InApp,
        config: window.SHARE || {}
    });
}