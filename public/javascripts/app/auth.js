var auth = {
    setRefreshToken: function (token) {
        localStorage.setItem('refreshToken', token);
    },

    setAccessToken: function (token) {
        localStorage.setItem('accessToken', token);
        $.ajaxSetup({
            headers: { 'Authorization': 'Bearer ' + token }
        });
    },

    getAccessToken: function () {
        return localStorage.getItem('accessToken');
    },

    getRefreshToken: function () {
        return localStorage.getItem('refreshToken');
    },

    updateToken: function () {
        var tokenModel = new TokenModel();
        tokenModel.set({refresh_token: this.getRefreshToken()});
        tokenModel.save().success(function (model, res) {
            this.setRefreshToken(model.refresh_token);
            this.setAccessToken(model.access_token);
        });
    }

};

$(document).ready(function () {
    $.ajaxSetup({
        headers: { 'Authorization': 'Bearer ' + auth.getAccessToken() }
    });
});

