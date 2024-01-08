var wallet = {

    host: "https://mailapi.coinaddress.info/api",

    address: "",

    chain: "1",

    init: function () {
        var that = this;
        $('#getStarted').unbind().bind('click', function () {
            $('#walletModal').modal('show');
        });

        $('#register').unbind().bind('click', function () {
            if (!that.address) {
                if (typeof window.ethereum == 'undefined') {
                    alert("MetaMask is not installed!");
                }
                ethereum.request({method: 'eth_requestAccounts'});
            } else {
                that.commit();
            }
        });

        $('#metamask').unbind().bind('click', function () {
            if (typeof window.ethereum == 'undefined') {
                alert("MetaMask is not installed!");
            }
            ethereum.request({method: 'eth_requestAccounts'}).then((accounts) => {
                that.address = accounts[0];
                $('#addrSpan').empty().append(accounts[0]);
            });

            ethereum.request({method: 'eth_chainId'}).then((chain) => {
                that.chain = chain;
                $('#addrSpan').empty().append(chain);
            });
        });

        $('#connect').unbind().bind('click', function () {
            if (typeof window.ethereum == 'undefined') {
                alert("MetaMask is not installed!");
            }
            ethereum.request({method: 'eth_requestAccounts'}).then((accounts) => {
                that.address = accounts[0];
                $('#addrSpan').empty().append(accounts[0]);
            });
            ethereum.request({method: 'eth_chainId'}).then((chain) => {
                console.log(chain, "chain");
                that.chain = chain;
                $('#chainSpan').empty().append(that.convertToChain(chain));
            });
        });

        if (typeof window.ethereum !== 'undefined') {
            ethereum.on('accountsChanged', function (accounts) {
                console.log("accountsChanged", accounts);
                that.address = accounts[0];
                $('#addrSpan').empty().append(accounts[0]);
            });

            ethereum.on('chainChanged', function (chain) {
                that.chain = chain;
                $('#chainSpan').empty().append(that.convertToChain(chain));
            });

        }
    },

    convertToChain: function (chain) {
        if (chain == "0x1") {
            $('#register').attr('disabled',false).text('Register');
            return "Ethereum Network";
        } else if (chain == "0x38") {
            $('#register').attr('disabled',false).text('Register');
            return "Balance Smart Chain"
        } else if (chain == "0x14") {
            $('#register').attr('disabled',false).text('Register');
            return "Elastos Smart Chain";
        } else {
            $('#register').attr('disabled',true).text('Unknown network');
            return "Unknown network!";
        }
    },

    convertToShortChain: function (chain) {
        return chain == "0x1" ? "eth." : chain == "0x38" ? "bsc." : chain == "0x14" ? "esc." : ""
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
                        <p><a href="https://mx.emails.com/mail" target="_blank" class="btn btn-outline-primary">Go to Login</a></p>
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
                        <p><a href="https://mx.emails.com/mail" target="_blank" class="btn btn-outline-primary">Go Login</a></p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
        `;
        $('.altxs').empty().append(h);
    },

    commit: function () {
        var that = this;
        var pwd = $("#inputPassword").val();
        if (!pwd || pwd.length <8) {
            that.showToast('The password must be at least 8 characters length.');
            $("#inputPassword").focus();
            return;
        }
        $('.altxs').empty()
        $("#register").attr("disabled",true).text('Confirming...');
        that.getNonce(that.address, function (nonce) {
            if (nonce && nonce.indexOf("Already") > -1) {
                $('#register').attr('disabled',false).text('Register');
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
                        password: pwd,
                        nonce: nonce,
                        chain: that.chain,
                        sig: result
                    }, function (rest) {
                        $('#register').attr('disabled',false).text('Register');
                        $('#inputPassword').val('');
                        if (rest === true) {
                            that.showSuccessToast('Register Successfully.');
                        } else {
                            that.showToast(rest);
                        }
                        console.log(rest);
                    })
                })
                .catch((e) => {
                    console.log(e);
                    var err = typeof e =='string'?e:e.message;
                    that.showToast(err);
                    $('#register').attr('disabled',false).text('Register');
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
            }
        })
    },

    /**
     * {
    "address":"",
    "password":"12345678",
    "nonce":"2222",
    "sig":"0x111"
     * @param obj
     * @param cb
     */
    register: function (data, cb) {
        var that = this;
        $.ajax({
            url: that.host + '/register/',
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