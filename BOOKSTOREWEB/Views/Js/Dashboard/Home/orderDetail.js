$(document).ready(function () {
    var orderDetailJS = new OrderDetailJS();
});

class OrderDetailJS {
    constructor() {
        this.initEvents();
    }

    initEvents() {
        this.getListOrderDetail(1);
    }


    fillDataOrderDetail(response) {
        self = this;
        $('#gird-order-detail tbody').empty();
        var i = 1;
        window.sum = 0;
        // var data = response.Countries;
        $.each(response, function (index, item) {
            window.sum += item.quantity * item.prices;
            var trHTML = $(`<tr>
            <td>` + i++ + `</td>
            <td>` + item.idProduct + `</td>
            <td>` + item.name + `</td>
            <td class="text-center">` + item.quantity + `</td>
            <td class="text-right">` + self.commaSeparateNumber(item.prices) + `</td>
            <td class="text-right">` + self.commaSeparateNumber(item.prices * item.quantity) + `</td>
            </tr> `);
            $('#gird-order-detail tbody').append(trHTML);//chen duoi
            //$('.grid tbody').prepend(trHTML);// chen tren
        });
    }

    getListOrderDetail(idBill) {
        self = this;
        $.ajax({
            url: "/api/bill/list-transport-detail/" + idBill,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json" //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataOrderDetail(response);
            self.getInfoBill(idBill);
        }).fail(function (response) {
            alert("Hệ thống đang bảo trì, vui lòng thử lại sau!");
        });
    }

    fillDataInfoCustomer(response) {
        $.each(response, function (index, item) {
            var trHTML = $(`
               <p>Họ tên: <b> ` + item.name + `</b></p>
               <p>Số điện thoại: <b>` + item.phone + `</b></p>
               <p>Email: <b> ` + item.email + `</b></p>
               <p>Địa chỉ: <b> ` + item.addressReceive + `</b></p>
             `);
            $('#footer-order-detail').append(trHTML);//chen duoi
            //$('.grid tbody').prepend(trHTML);// chen tren
        });
    }

    getInfoCustomer(idBill){
        self = this;
        $.ajax({
            url: "/api/bill/info-customer/" + idBill,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json" //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataInfoCustomer(response);
        }).fail(function (response) {
            alert("Hệ thống đang bảo trì, vui lòng thử lại sau!");
        });
    }

    fillDataInfoBill(response) {
        $.each(response, function (index, item) {
            var trHTML = $(`
               <p>` + self.commaSeparateNumber(item.feeShip) + `</p>
             `);
            $('#transport-fee').append(trHTML);
            var trHTML = $(`
               <p>` + self.commaSeparateNumber(item.totalCost) + `</p>
             `);
            $('#total-cost').append(trHTML);
        });
    }

    getInfoBill(idBill) {
        self = this;    
        $.ajax({
            url: "/api/bill/info-bill/" + idBill,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            dataType: "json" 
        }).done(function (response) {
            self.fillDataInfoBill(response);
            self.getInfoCustomer(idBill);
        }).fail(function (response) {
            alert("Hệ thống đang bảo trì, vui lòng thử lại sau!");
        });
    }


    commaSeparateNumber(val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        val += ' VNĐ';
        return val;
    }
}