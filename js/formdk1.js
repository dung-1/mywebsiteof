var user = [];
var loadUser = function() {
    user = JSON.parse(localStorage.getItem('llistUser'))
}
if (localStorage.getItem("llistUser") != null) {
    loadUser();
}

function validata2() {
    var yy = document.getElementById("username1").value;
    var py1 = document.getElementById("password1").value;
    if (yy == "") {
        alert("Vui lòng nhập tên!");
        return false;
    }
    if (py1 == "") {
        alert("Vui lòng nhập mật khẩu!");
        return false;
    }
    var k = 0;
    for (var i in user) {
        k++;
        var data = JSON.parse(JSON.stringify(user[i]))
        if (
            ((yy == data.username) &&
                (py1 == data.password) &&
                (data.role == "admin"))) {
            alert("Đăng nhập thành công");
            location.assign("Admin-TrangChu.html");
            return true;
        }
        if (
            ((yy == data.username) &&
                (py1 == data.password) &&
                (data.role == "user"))) {
            alert("Đăng nhập thành công");
            k = i;
            window.location.href = 'Trangchu.html';
            return true;
        }
    }
    if (k == user.length) {
        alert("Bạn đăng nhập sai rồi!")
        document.getElementById("username1").value = "";
        document.getElementById("password1").value = "";
        return true;
    }
}