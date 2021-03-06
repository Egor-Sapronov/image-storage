var auth = {
    setAccessToken: function (token) {
        localStorage.setItem('accessToken', token);
        $.ajaxSetup({
            headers: { 'Authorization': 'Bearer ' + token }
        });
    },

    getAccessToken: function () {
        return localStorage.getItem('accessToken');
    }
};


$.ajaxSetup({
    headers: { 'Authorization': 'Bearer ' + auth.getAccessToken() }
});


