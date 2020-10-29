
$(document).ready(function () {
    debugger;
    var loginJS = new LoginJS();
    loginJS.functionTemp();
});

class LoginJS {
    constructor() {
        debugger;
        this.initEvents();
    }

    initEvents() {
        debugger;
        $("#btnSignIn").click(this.getPermission.bind(this));
    }

     getPermission() {

        //Tạo dữ liệu account dựa trên user và pass trên form Login.
        var account = {};
        account.id = "";
        account.UserName = $("#txtUserName").val();
        account.PassWord = $("#txtPassWord").val();
        account.IDPermission = "";
        alert(account.UserName);
        //Kết nối tới dữ liệu backend.
        $.ajax({
            url : "/api/account/login",
            method : "GET",
            data: JSON.stringify(account),//Dữ liệu truyền xuống là account nên chuyển thành file JSON. Truyền xuống thông qua body request.
            contentType: "application/json", //Kiểu dữ liệu trả về.
            dataType: "", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            switch (response) {
                case 0: alert("Tài khoản hoặc mật khẩu không đúng!"); break;
                case 1: alert("Bạn là admin!"); break;
                case 2: alert("Bạn là nhân viên!"); break;
                case 3: alert("Bạn là khách hàng!"); break;
                default: alert("Bạn là đối tượng chưa được xác định");
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });
     }

    functionTemp() {

    }
}