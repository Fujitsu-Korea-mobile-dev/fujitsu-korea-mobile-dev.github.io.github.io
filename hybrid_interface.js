// Native의 기능을 호출한다.
window.FKL_ToNativeInterface = {

    // 플러터의 inappwebview가 준비되었는지 확인해야 한다. 
    isFlutterInAppWebviewReady: false,
    myInit: function (){
        window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
            this.isFlutterInAppWebViewReady = true;
        });
    },

    // Native의 기능을 호출할 객체
    _nativeHandler: null,

    // 현재 기기의 종류를 확인합니다.
    _device: function () {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) { return "Android"; }
        else if (/iPad|iPhone|iPod/.test(userAgent) ) { return "iOS"; }
        else if (/Macintosh/.test(userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) { return "iOS"; }
        else { return "unknown"; }
    },

    // 현재 기기가 iOS인지 확인합니다.
    _isiOS: function () { return this._device() === "iOS"; },

    // 현재 기기가 Android인지 확인합니다.
    _isAndroid: function () { return this._device() === "Android"; },

    // 실제 앱에서 실행 중인지 확인합니다.
    // iOS의 경우 window.webkit.messageHandlers가 존재하면 앱에서 실행 중이다.
    // AndroidNativeInterface의 경우 AndroidNativeInterface 객체가 존재하면 앱에서 실행 중이다.
    _isRunningInApp: function () {
        if ( !this._nativeHandler ) {
            // if (this._isAndroid()) { this._nativeHandler = FKL_AndroidNativeInterface; }
            // else if (this._isiOS()) { this._nativeHandler = window.webkit.messageHandlers; }
            this._nativeHandler = window.flutter_inappwebview.callHandler;
        }
        return this._nativeHandler ? true : false;
    },

    /**
     *
     * @param sCallback 네이티브에서 결과를 전달하기 위한 콜백 함수 이름.
     *                  콜백함수가 호출되며 결과를 json 문자열로 전달
     *                  {"app_version":앱버전(1.0.0)}
     */
    fklGetAppVersion: function (sCallback) {
        console.log("fklGetAppVersion");

        if (!this._isRunningInApp()) { alert("앱에서만 실행 가능합니다."); return; }
        this._nativeHandler("fklGetAppVersion", {callBack:sCallback});
    },

    /**
     * 네이티브앱의 UUID를 가져옵니다.
     * @param sCallback 값을 전달할 콜백 함수 이름
     *                  콜백함수가 호출되며 결과를 json 문자열로 전달
     *                  {"app_id":앱아이디(2f1e4fc0-81fd-11da-9156-00036a0f876a)}
     */
    fklGetAppID: function (sCallback) {
        if (!this._isRunningInApp()) { alert("앱에서만 실행 가능합니다."); return;}
        this._nativeHandler("fklGetAppID", {callBack:sCallback});
    },
    
    /**
     * 네이티브에서 앱을 종료합니다.
     */
    fklExitApp: function () {
        if (!this._isRunningInApp()) { alert("앱에서만 실행 가능합니다."); return;}
        this._nativeHandler("fklExitApp");
    },

    /**
     * 기기 모델 가져오기
     */
    fklGetModel: function (sCallback) {
        if (!this._isRunningInApp()) { alert("앱에서만 실행 가능합니다."); return;}
        this._nativeHandler("fklGetModel", {callBack:sCallback});
    },

    fklSetStartUlr: function (startUrl) {
        if (!this._isRunningInApp()) { alert("앱에서만 실행 가능합니다."); return;}
        this._nativeHandler("fklSetStartUlr", startUrl);
    },
    fklClearStartUlr: function () {
        if (!this._isRunningInApp()) { alert("앱에서만 실행 가능합니다."); return;}
        this._nativeHandler("fklClearStartUlr", {callBack:sCallback});
    },

}
