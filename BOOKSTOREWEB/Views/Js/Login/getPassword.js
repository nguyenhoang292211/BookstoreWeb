$(document).ready(function () {
    var getPassWordJS = new GetPassWordJS();
});

class GetPassWordJS {

    constructor() {
        this.initEvents();
    }

    initEvents() {
        $("#btnSubmitCode").click(this.getCode.bind(this));
        $("#btnForgetPassword").click(this.checkCode.bind(this));
        $("#btnSubmitPassword").click(this.changePassWord.bind(this));
    }

    getCode() {
        var email = $("#txtEmail").val();
        if (this.isEmail(email) == false) {
            $("#error-input-email").html("Email không hợp lệ!");
        }
        else {
            $("#error-input-email").html("");
            this.isExistEmail();
        }
    }

    isExistEmail() {
        self = this;
        var customer = {
            email: $("#txtEmail").val()
        }
        $.ajax({
            url: "/api/customer/isexistemail",
            method: "POST",
            data: JSON.stringify(customer),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            contentType: "application/json",
            dataType: "json"
        }).done(function (response) {
            if (response != "") {
                $("#error-input-email").html("");
                self.sendCode();
            }
            else {
                $("#error-input-email").html("Email không tồn tại!");
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });
    }

    isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    } 

    sendCode() {
        var customer = {
            email: $("#txtEmail").val()
        }
        $.ajax({
            url: "/api/account/sendemail",
            method: "POST",
            data: JSON.stringify(customer),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            contentType: "application/json", //Kiểu dữ liệu trả về.
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            if (response.length == 6) {
                window.code = response;
            }
            else {
                alert("Gửi email thất bại! Vui lòng thử lại!");
            }
        }).fail(function (response) {
            alert("Hệ thống hiện đang trong thời gian bảo trì, bạn vui lòng quay lại sau!");
        });
    }

    checkCode() {
        var txtCode = $("#txtCode").val();
        if (window.code == txtCode) {
            $("#error-input-code").html("");
            $(location).attr('href', '/Views/Pages/Login/changePassword.html');
        }
        else {
            $("#error-input-code").html("Mã code không hợp lệ!");
        }
    }

    //Thay đổi mật khẩu.
    changePassWord() {
        if (this.checkNewPassWord() == true) {
            this.updatePassWord();
        }
    }

    checkNewPassWord() {
        var result = false;
        var newPassWord = $("#txtNewPassWord").val();
        var reNewPassWord = $("#txtReNewPassWord").val();
        if (newPassWord == "") {
            $("#error-input-newpassword").html("Vui lòng nhập mật khẩu!");
            result = false;
        }
        else {
            $("#error-input-newpassword").html("");
            result = true;
        }
        if (reNewPassWord == "") {
            $("#error-input-renewpassword").html("Vui lòng nhập lại mật khẩu!");
            result = false;
        }
        else {
            $("#error-input-renewpassword").html("");
            result = true;
        }
        if (newPassWord == reNewPassWord) {
            $("#error-input-renewpassword").html("");
            result = true;
        }
        else {
            $("#error-input-renewpassword").html("Mật khẩu không khớp!");
            result = false;
        }
        return result;
    }

    updatePassWord() {
        var account = {
            password: $("#txtNewPassWord").val()
        }
        $.ajax({
            url: "/api/account/updatepassword",
            method: "POST",
            data: JSON.stringify(account),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json'
        }).done(function (response) {
            if (response == true) {
                alert("Mật khẩu cập nhật thành công!");
                $(location).attr('href', '/Views/Pages/Login/signIn.html');
            }
        }).fail(function (response) {
            alert("Hệ thống đang bảo trì, vui lòng thực hiện lại sau!");
        });
    }

    
}