
$(document).ready(function () {
    var orderJS = new OrderJS();
    window.stateOrder = 'all';
    window.orderJS = orderJS;
    window.approvedRate = 1;
    window.timeDelay = 50;
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showDetailTransport(self) {
    var idBill = self.id.replace('select-detail-', '');
    $('.div-front').show();
    window.orderJS.getListTransportDetail(idBill);
}

function updateApproved(self) {
    var id = self.id.replace('btnApproved-', '');
    window.orderJS.updateStateByIDBill(id, 'shipping');
    sleep(window.timeDelay).then(() => { location.reload(); }); 
}

function updateCancelled(self) {
    var id = self.id.replace('btnCancelled-', '');
    window.orderJS.updateStateByIDBill(id, 'cancelled');
    sleep(window.timeDelay).then(() => { location.reload(); }); 
}


//===================================================================//
class OrderJS {
    constructor() {
        this.initEvents();
    }

    initEvents() {
        self = this;
        this.getListOrder('all');
        $('#icon-close').click(function () {
            $('.div-front').hide();
        });

        $('#order-state-filter').change(function () {
            var state = $('#order-state-filter').val();
            window.stateOrder = state;
            self.getListOrder(state);
        });
    }

    convertStateToVi(state) {
        var listState = ['complete', 'shipping', 'return', 'unapproved', 'cancelled'];
        var listStateVi = ['Hoàn thành', 'Đang giao', 'Trả hàng', 'Chưa duyệt', 'Đã hủy'];
        return listStateVi[listState.indexOf(state)];
    }

    fillDataOrder(response) {
        self = this;
        window.countTotal = 0;
        window.countApproved = 0;
        $('#gird-transport tbody').empty();
        // var data = response.Countries;
        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state != 'cancelled' || item.state != 'unapproved')
                window.countApproved++;
            var idDetail = 'select-detail-' + item.id;
            var trHTML = $(`<tr>
            <td>` + item.id + `</td>
            <td>` + item.dateConfirm.replace('T', ' ') + `</td>
            <td>` + item.name + `</td>
            <td>` + item.addressReceive + `</td>
            <td>` + item.phone + `</td>
            <td style="text-align: right;">` + self.commaSeparateNumber(parseInt(item.totalCost)) + `</td>
            <td style="text-align: center;">` + self.convertStateToVi(item.state) + `</td>
            <td style="text-align: center;">` + self.addApprovalCancel(item.state, item.id) + `</td>
            <td style="text-align: center;">` + `<i class="fas fa-info-circle" id=` + idDetail + ` onclick="showDetailTransport(this)"></i>` + `</td>
            </tr> `);
            $('#gird-transport tbody').append(trHTML);//chen duoi
            //$('.grid tbody').prepend(trHTML);// chen tren
        });
        self.changePercentApproved();
    }

    addApprovalCancel(state, idBill) {
        var idApproved = 'btnApproved-' + idBill;
        var idCancelled = 'btnCancelled-' + idBill;
        if (state == 'unapproved')
            return `<button class="btn btn-approval" id=` + idApproved + ` onclick="updateApproved(this)">Duyệt</button>
                <button class="btn btn-cancel" id=` + idCancelled + ` onclick="updateCancelled(this)">Hủy</button>`;
        else if (state == 'cancelled')
            return `<button class="btn btn-approval" id=` + idApproved + ` onclick="updateApproved(this)">Duyệt</button>`;
        return "";
    }

    getListOrder(state) {
        self = this;
        var URL;
        if (state === 'all')
            URL = "/api/bill/list-order";
        else if (state === 'approved')
            URL = "/api/bill/list-transport";
        else
            URL = "/api/bill/list-transport/" + state;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json" //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataOrder(response);
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

    updateStateByIDBill(idBill, state)
    {
        self = this;
        $.ajax({
            url: '/api/bill/update-transport/' + idBill + '/' + state,
            method: 'PUT',
            contentType: 'application/json',
            dataType: 'json'
        }).done(function (response) {
            if (response) {
                self.getListOrder(window.state);
            }
            else {
                alert("Cập nhật không thành công!");
            }
           
        }).fail(function (response) {
            alert("Hiện tại ứng dụng đang được bảo trì, vui lòng thử lại sau!");
        });
    }

    //Bill Detail
    fillDataTransportDetail(response) {
        self = this;
        $('#gird-transport-detail tbody').empty();
        $.each(response, function (index, item) {
            var trHTML = $(`<tr>
            <td>` + item.idProduct + `</td>
            <td>` + item.name + `</td>
            <td>` + item.prices + `</td>
            <td>` + item.quantity + `</td>
            <td>` + self.commaSeparateNumber(item.prices * item.quantity) + `</td>
            <td>` + item.state + `</td>
            </tr> `);
            //$('#gird-transport-detail tbody').append(trHTML);//chen duoi
            $('#gird-transport-detail tbody').prepend(trHTML);
        });
    }

    getListTransportDetail(idBill) {
        self = this;
        $.ajax({
            url: '/api/bill/list-transport-detail/' + idBill,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json" //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataTransportDetail(response);
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    changePercentApproved() {
        window.approvedRate = (window.countDone / window.countApproved).toFixed(2);
        var rate = window.approvedRate;
        /* bacground-size * width = 10.000 */
        var width = String(rate * 100);
        var background_size_width = 10000 / width;
        $('.percent').css("width", width + '%');
        $('.percent').css("background-size", background_size_width + '% 100%');
    }
}

