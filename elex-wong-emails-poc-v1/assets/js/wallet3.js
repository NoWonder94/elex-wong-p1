var wallet = {

    //host: "https://mailapi.coinaddress.info/api",
    host: "http://127.0.0.1:7143/api",

    address: "",

    chain: "1",

    init: function () {
        var that = this;

        if (typeof window.ethereum !== 'undefined') {

            if (typeof window.ethereum == 'undefined') {
                alert("MetaMask is not installed!");
            }
            ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                that.address = accounts[0];
                that.queryAccountInfo();
            });
            ethereum.request({ method: 'eth_chainId' }).then((chain) => {
                console.log(chain, "chain");
                that.chain = chain;
            });

            ethereum.on('accountsChanged', function (accounts) {
                console.log("accountsChanged", accounts);
                that.address = accounts[0];
                that.queryAccountInfo();
            });

            ethereum.on('chainChanged', function (chain) {
                that.chain = chain;
            });

        }
    },


    convertToChain: function (chain) {
        var chainId = typeof chain == 'string' ? parseInt(chain) : chain;
        if (chainId == 1) {
            $('#register').attr('disabled', false).text('Register');
            return "Ethereum Network";
        } else if (chainId == 56) {
            $('#register').attr('disabled', false).text('Register');
            return "Balance Smart Chain"
        } else if (chainId == 20) {
            $('#register').attr('disabled', false).text('Register');
            return "Elastos Smart Chain";
        } else if (chainId == 137) {
            $('#register').attr('disabled', false).text('Register');
            return "Matic";
        } else {
            $('#register').attr('disabled', true).text('Unknown network');
            return "Unknown network!";
        }
    },

    convertToShortChain: function (chain) {
        var chainId = typeof chain == 'string' ? parseInt(chain) : chain;
        if (chainId == 1) {
            return "eth.";
        } else if (chainId == 56) {
            return "bsc.";
        } else if (chainId == 20) {
            return "esc.";
        } else if (chainId == 137) {
            return "matic.";
        }
        return "";
    },

    showToast: function (msg) {
        var that = this;
        var h = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <span class="spanalert text-danger">${msg}</span>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
        `;
        if (msg && msg.indexOf("Already") > -1) {
            h = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <p><span class="spanalert">The address has been registered.</span></p>
                        <p class="text-primary text-bold text-wrap">Email3 address: <b style="word-break: break-all;">${that.address}@${that.convertToShortChain(that.chain)}emails.com</b></p>
                        <p><a href="./account-info.html" target="_blank" class="btn btn-outline-primary">Account Info</a></p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
        `;
        }
        $('.altxs').empty().append(h);
    },

    showSuccessToast: function (msg) {
        var that = this;
        var h = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <p><span class="spanalert">${msg}</span></p>
                        <p><b class="text-primary text-bold text-wrap">Email3 address: <b style="word-break: break-all;">${that.address}@${that.convertToShortChain(that.chain)}emails.com</b></b></p>
                        <p><a href="./account-info.html" target="_blank" class="btn btn-outline-primary">Account Info</a></p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
        `;
        $('.altxs').empty().append(h);
    },

    queryAccountInfo: function () {
        var that = this;
        if (!that.address) {
            ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                that.address = accounts[0];
            });
        }

        that.getNonce(that.address, function (nonce) {
            ethereum
                .request({
                    method: 'personal_sign',
                    params: [`0x${nonce}`, that.address],
                })
                .then((result) => {
                    that.accountInfo({
                        address: that.address,
                        nonce: nonce,
                        chain: that.chain,
                        sig: result
                    }, function (rest) {
                        if (rest) {
                            $('#email_address').empty().append(rest["username"]);
                            $('#refer_address').empty().append(rest["forwarding"]);
                            $('#refer_code').empty().append(`<a href='https://emails.com/register/index.html?refercode=${rest["refercode"]}' target="_blank">https://emails.com/register/index.html?refercode=${rest["refercode"]}</a>`);
                            $('#refer_earn').empty().append(rest["emls_total"]);
                        } else {
                            $('#email_address').empty().append("User not found!");
                        }
                    })
                }).catch((e) => {
                    console.log(e);
                });
        });
    },


    commit: function () {
        var that = this;
        $('.altxs').empty()
        $("#register").attr("disabled", true).text('Confirming...');
        that.getNonce(that.address, function (nonce) {
            if (nonce && nonce.indexOf("Already") > -1) {
                $('#register').attr('disabled', false).text('Register');
                that.showToast(nonce);
                return;
            }
            ethereum
                .request({
                    method: 'personal_sign',
                    params: [`0x${nonce}`, that.address],
                })
                .then((result) => {
                    that.register({
                        address: that.address,
                        forwarding: $("#forwarding").val(),
                        refercode: $("#refercode").val(),
                        nonce: nonce,
                        chain: that.chain,
                        sig: result
                    }, function (rest) {
                        $('#register').attr('disabled', false).text('Register');
                        if (rest === true) {
                            // that.showSuccessToast('Register Successfully.');
                            // localStorage.setItem("airdrop",JSON.stringify({
                            //     username:`${that.address}@${that.convertToShortChain(that.chain)}emails.com`,
                            //     forwarding: $("#forwarding").val(),
                            //     level1: $("#refercode").val(),
                            //     emls_total: 1000,
                            // }))
                            window.location.href = "./account-info.html"
                        } else {
                            that.showToast(rest);
                        }
                        console.log(rest);
                    })
                })
                .catch((e) => {
                    console.log(e);
                    var err = typeof e == 'string' ? e : e.message;
                    that.showToast(err);
                    $('#register').attr('disabled', false).text('Register');
                });
        })
    },

    getNonce: function (address, cb) {
        var that = this;
        $.ajax({
            url: that.host + '/nonce/' + address + "/" + that.chain,
            type: 'get',
            async: false,
            beforeSend: function () {
            },
            success: function (res) {
                if (cb) {
                    cb(res)
                }
            },
            error: () => {
                cb(null);
            }
        })
    },

    accountInfo: function (data, cb) {
        var that = this;
        $.ajax({
            url: that.host + '/accountInfo/',
            type: 'post',
            async: false,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
        }).done(function (msg) {
            console.log(msg)
            if (cb) {
                cb(msg)
            }
        });
    },

    /**
     * {
     * @param obj
     * @param cb
     */
    register: function (data, cb) {
        var that = this;
        $.ajax({
            url: that.host + '/register2',
            type: 'post',
            async: false,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
        }).done(function (msg) {
            console.log(msg)
            if (cb) {
                cb(msg)
            }
        });
    }

}
