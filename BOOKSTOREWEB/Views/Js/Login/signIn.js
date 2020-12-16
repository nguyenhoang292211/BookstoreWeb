
$(document).ready(function () {
    var loginJS = new LoginJS();
});

class LoginJS {
    constructor() {
        this.initEvents();
        var authority = "https://localhost:44349";
        var resultLogin = true;
    }

    initEvents() {
        $("#btnSignIn").click(this.getPermission.bind(this));
        $("#btnSignUp").click(this.goSignUp.bind(this));
    }

    goSignUp() {
        window.location.href = "signUp.html";
    }


    checklogin() {
        var username = $("#username").val;
    }

    checkLogin()
    {
        var username = $("#txtUsername").val();
        var password = $("#txtPassword").val();
        this.resultLogin = true;
        if (username != null) {
            if (username == "")
            {
                $("#error-input-username").html("Không thể để trống tên đăng nhập!");
                this.resultLogin = false;
            }
            else
                $("#error-input-username").html("");
        }
        if (password != null) {
            if (password == "")
            {
                $("#error-input-password").html("Không thể để trống mật khẩu!");
                this.resultLogin = false;
            }
            else
                $("#error-input-password").html("");
        }
    }

    getPermission() {
        this.checkLogin();
        if (!this.resultLogin)
            return;
        //Lấy dữ liệu account từ form login.
        var userName = $("#txtUsername").val();
        var passWord = $("#txtPassword").val();
        //Kết nối tới dữ liệu backend.
        $.ajax({
            url: "/api/account/login/" + userName + "/" + passWord,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            //data: JSON.stringify(account),//Dữ liệu truyền xuống là account nên chuyển thành file JSON. Truyền xuống thông qua body request.
            dataType: "", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            switch (response) {
                case 0: alert("Tài khoản hoặc mật khẩu không đúng!"); break;
                case 1: alert("Bạn là admin!"); break;
                case 2: alert("Bạn là nhân viên!"); break;
                case 3: alert("Bạn là nhân viên giao hàng!"); break;
                case 4:                   
                    $.ajax({
                        url: "/api/account/getIdUser/" + userName,
                        method: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json' //Định nghĩa type data trả về.
                        },
                        dataType: "", //Kiểu dữ liệu truyền lên.
                    }).done(function (response) {
                        alert("Vòa ok");
                        if (parseInt(response) > 0) {
                            sessionStorage.setItem("inforCus", parseInt(response));
                            alert(sessionStorage.getItem("inforCus"));
                            window.location.href = "../Frontend/Home/CartPage.html";

                        }
                        else alert(parseInt(response));

                    }).fail(function (response) {
                        alert("Đăng nhập thất bại");
                    });
                    
                    break;
                default: alert("Bạn là đối tượng chưa được xác định");
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });
    }

    getIdAcount(username) {
        $.ajax({
            url: "/api/account/getUser/" + userName,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "int", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            if (response > 0)
                sessionStorage.setItem("inforCus", response);
            else alert("Ko phải khách hàng");

        }).fail(function (response) {
                alert("Đăng nhập thất bại");
        });
    }

    addAccount() {
        var account = {
            UserName: $("#txtUsername").val(),
            PassWord: $("#txtPassword").val(),
        };
       
        $.ajax({
            url: "/api/account",
            method: "POST",
            data: JSON.stringify(account),//Dữ liệu truyền xuống là account nên chuyển thành file JSON. Truyền xuống thông qua body request.
            contentType: "application/json", //Kiểu dữ liệu trả về.
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            if (response)
                alert("Thêm thành công");
            else
                alert(" Thất bại");
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });
    }

}