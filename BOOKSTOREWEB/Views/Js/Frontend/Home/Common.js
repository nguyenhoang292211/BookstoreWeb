
var idCustomer;


function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}

var paraID = readCookie("sessionID");
if (paraID) {
    //var transportJS = new TransportJS(paraID);
    //window.transportJS = transportJS;


    //window.resultUpdateOrderState = true;
    //window.completionRate = 1;


   idCustomer = paraID;
    alert(paraID);

    getQuantityInCart(idCustomer);
}
else {
    alert('you must to login');
    window.location.href = "http://google.com";
}

getQuantityInCart(idCus) {

    self = this;
    // var URL = self.getUrlApi(window.orderState);
    var URL = "/api/product/quantityOfInCart/" + idCus;
    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //Định nghĩa type data trả về.
        },
        dataType: "json", //Kiểu dữ liệu truyền lên.
    }).done(function (response) {
        if (!$.trim(response)) {
            response = 0;
        }

        $('#span-Number').text(response);
        $('#totalQuantity').text(response);
        //Gọi hàm load dữ liệu (ở trên :()
    }).fail(function (response) {
        alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
    });
}
