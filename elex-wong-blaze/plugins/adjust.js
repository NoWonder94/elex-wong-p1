class AdjustEvent {
    constructor() {
    }

    initSdk() {

    }

    getAdsID() {
        if (window.android) {
            return window.android.getgaid();
        }
        return '';
    }

    appOpen() {
        this.triggerEvent('app_open');
    }

    goldMode() {
        this.triggerEvent('gold');
    }

    realMode() {
        this.triggerEvent('real');
    }

    loginSuccess() {
        this.triggerEvent('login');
    }

    registerSuccess() {
        this.triggerEvent('register');
    }

    openDeposit() {
        this.triggerEvent('recharge_page');
    }

    // backend
    depositSuccess() {
        this.triggerEvent('recharge_success');
    }

    // backend
    firstDeposit() {
        this.triggerEvent('new_payment');
    }

    // backend
    firstDeposit2() {
        this.triggerEvent('new_payment_num');
    }

    royalty() {
        this.triggerEvent('royalty');
    }

    startGame() {
        this.triggerEvent('start_game');
    }

    openWithdraw() {
        this.triggerEvent('withdraw_page');
    }

    // backend
    withdrawSuccess() {
        this.triggerEvent('withdraw_success');
    }

    enterThirdPartyGame() {
        this.triggerEvent('svip_1');
    }

    // backend
    enterThirdPartyGame2() {
        this.triggerEvent('svip_2');
    }

    saveProxyQRCode() {
        this.triggerEvent('avip_1');
    }

    copyProxyQRCode() {
        this.triggerEvent('avip_2');
    }

    // backend
    moreThanOneProxy() {
        this.triggerEvent('avip_3');
    }

    triggerEvent(...agrs) {
        if (window.android) {
            window.android.onEventJs(...agrs);
        }
    }
}

export default AdjustEvent
