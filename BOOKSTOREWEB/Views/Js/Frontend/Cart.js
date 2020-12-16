
if (typeof (Storage) !== "undefined") {
    // Store
    idproduct = sessionStorage.getItem("inforCus");
}

alert(sessionStorage.getItem("inforCus"));
  
getCustomer(sessionStorage.getItem("inforCus"));
function getName(cus) {
    $('#username').text = cus.Name;
}

function getCustomer(idAcc) {
    var URL = "/api/customer/getCustomerInfo/" + idAcc;
    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //Định nghĩa type data trả về.
        },
        dataType: "", //Kiểu dữ liệu truyền lên.
    }).done(function (Cus) {
        getName(Cus);
        alert(Cus.Name);
    }).fail(function (response) {
        alert("khong Lấy được");
    });
}



