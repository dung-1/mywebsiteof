    var user = [{
            id: "USER1",
            user: "admin",
            emal: "dung123@gmail.com",
            password: "12345678",
            role: "admin"
        },
        {
            id: "USER2",
            user: "admin",
            emal: "tamdkr@gmail.com",
            password: "11111111",
            role: "user"
        },
    ];

    // đẩy mảng user vào local
    var saveUser = function() {
            localStorage.setItem('llistUser', JSON.stringify(user))
        }
        //lấy list user 
    var loadUser = function() {
        user = JSON.parse(localStorage.getItem('llistUser'))
    }
    if (localStorage.getItem("llistUser") != null) {

        loadUser();
    }
    saveUser();


    function validate1() {

        var u = document.getElementById("username").value;
        var val = document.querySelector('#email').value
        var p1 = document.getElementById("password").value;
        var p2 = document.getElementById("password-repeat").value;
        // var regExp = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/;
        var reg = val.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/g)
            // reg là thể kiểm tra, tìm lỗi và xử lý các tiện ích tìm kiếm các chuỗi từ người dùng nhập vào dựa vào những mẫu quy định sẵn
        if (u == "" || (u.length < 6)) {
            alert("Nhập tên tối thiểu 6 Ký tự ");
            return false;
        }
        if (reg) {} else {
            alert("Vui lòng nhập e mail có chứ @gmail.com")
            return false;
        }
        // if (m != regExp.test(email)) {
        //     alert('email không hợp !');


        // } else {
        //     alert('email không hợp lệ!');
        //     return false;
        // }


        if ((p1 == "") || (p1.length < 8)) {
            alert("Nhập mật khẩu tối thiểu 8 Ký tự ");
            return false;
        }

        if (p2 != p1) {
            alert("NHẬP MẬT KHÔNG CHÍNH XÁC!");
            return false;
        }
        if ((u != "") && (p1 == p2)) {
            var k = 0;
            for (var i in user) {
                var data = JSON.parse(JSON.stringify(user[i]))

                if (u === data.username) { k++; break; }
            }
            if (k != 0) {
                alert("tài khoản đã tồn tại");
                window.location.reload();
                return false;
            } else {

                var User = {
                    id: "USER" + parseInt(user.length + 1),
                    username: u,
                    password: p1,
                    email: email,
                    role: "admin"
                }

                user.push(User);
                localStorage.setItem('llistUser', JSON.stringify(user));
                alert("Đăng ký thành công");
                location.assign('formdangnhap.html');
                return true;
            }
        }
    }