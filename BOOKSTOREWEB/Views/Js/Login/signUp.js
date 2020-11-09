$(document).ready(function(){
    var signUpJS = new SignUpJS();
});

class SignUpJS{
    constructor(){
        this.initEvents();
        var resultSignUp = true;
    }

    initEvents()
    {
        $("#btnSignUp").click(this.checkAddUser.bind(this));
    }

    addCustomer()
    {
        var user = { 
            customer: {
                name: $("#txtName").val(),
                birthday: $("#txtBirthDay").val(),
                phone: $("#txtPhone").val(),
                gender: $("#genderMale").val() == 'on' ? "Male" : "Female",
                email: $("#txtEmail").val(),
                address: $("#txtAddress").val(),
            },
            account: {
                username: $("#txtUserName").val(),
                password: $("#txtPassWord").val(),
            }
        };
        $.ajax({
            url: "/api/customer/addcustomer",
            method: "POST",
            data: JSON.stringify(user),
            contentType: "application/json",
            dataType: "json",
            traditional: true
        }).done(function (res) {
            if (res == true) {
                alert("Đăng kí thành công!");
            $(location).attr('href', '/Views/Pages/Login/signIn.html');
            }
            else {
                alert("Đăng kí không thành công!")
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });

    }

    checkAddUser()
    {
        var result = true;
        if (this.checkSignUp() == false)
            return;
        this.isExistEmail();
        //this.isExistUserName();
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
            if (response == false) {
                self.isExistUserName();
            }
            else {
                $("#error-input-email").html("Email đã tồn tại!");
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });
    }


    isExistUserName() {
        self = this;
        var username = $("#txtUserName").val();
        $.ajax({
            url: "/api/account/isexistusername/" + username,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: ""
        }).done(function (response) {
            if (response == false) {
                $("#error-input-username").html("");
                self.addCustomer();
            }
            else {
                $("#error-input-username").html("Tên đăng nhập đã tồn tại!");
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });
    }

    checkSignUp()
    {
        var result = true;
        var name = $("#txtName").val();
        var birthday =  $("#txtBirthDay").val();
        var phone =  $("#txtPhone").val();
        var gender =  $("#genderMale").val() == 'on' ? "Male" : "Female";
        var email = $("#txtEmail").val();
        var address = $("#txtAddress").val();
        var username = $("#txtUserName").val();
        var password = $("#txtPassWord").val();
        var rePassword = $("#txtRePassWord").val();
        var checkProvision = $("#checkProvision").is(':checked');
        if (name == "")
        {
            $("#error-input-name").html("Vui lòng nhập tên!");
            result = false;
        }
        else
        {
            $("#error-input-name").html("");
        }

        var today = new Date();
        var fullDate = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
        if (birthday >= fullDate)
        {
            $("#error-input-birthday").html("Ngày sinh không hợp lệ!");
            result = false;
        }
        else
        {
            $("#error-input-birthday").html("");
        }

        if (phone == "")
        {
            $("#error-input-phone").html("Vui lòng nhập số điện thoại!");
            result = false;
        }
        else
        {
            $("#error-input-phone").html("");
        }

        if (email == "")
        {
            $("#error-input-email").html("Vui lòng nhập địa chỉ email!");
            result = false;
        }
        else
        {
            if (this.isEmail(email))
            {
                $("#error-input-email").html("");
            }
            else{
                $("#error-input-email").html("Email không hợp lệ!");
            }
            
        }

        if (username == "")
        {
            $("#error-input-username").html("Vui lòng nhập tài khoản!");
            result = false;
        }
        else
        {
            $("#error-input-username").html("");
        }

        if (password == "")
        {
            $("#error-input-password").html("Vui lòng nhập mật khẩu!");
            result = false;
        }
        else
        {
            $("#error-input-password").html("");
        }

        if (rePassword == "")
        {
            $("#error-input-repassword").html("Vui lòng nhập lại mật khẩu!");
            result = false;
        }
        else
        {
            $("#error-input-repassword").html("");
        }

        if (password == rePassword)
        {
            $("#error-input-repassword").html("");
        }
        else
        {
            $("#error-input-repassword").html("Mật khẩu không trùng khớp!");
            result = false;
        }

        if (checkProvision == false)
        {
            $("#error-input-provision").html("Vui lòng đọc điều khoản!");
            result = false;
        }
        else
        {
            $("#error-input-provision").html("");
        }
        return result;
    }

    isEmail(email)
    {
        var regex= /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    } 
}