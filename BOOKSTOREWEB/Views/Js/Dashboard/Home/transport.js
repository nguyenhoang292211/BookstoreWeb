$(document).ready(function () {
    var transportJS = new TransportJS();
    window.transportJS = transportJS;
    window.resultUpdateOrderState = true;
    window.completionRate = 1;
});

function (self) {
    window.transportJS.updateOrderStateByIdBill(self.id.replace("select-", ""), self.value);
    if (!window.resultUpdateOrderState)
        return;
    window.transportJS.selectColorState(self);
    window.transportJS.changePercentComplete();
}

function showDetailTransport(self) {
    var idBill = self.id.replace('select-detail-', '');
    $('.div-front').show();
    window.transportJS.getListTransportDetail(idBill);
}

//===================================================================//
class TransportJS {
    constructor() {
        this.initEvents();
    }

    initEvents() {
        self = this;
        window.orderState = 'all';
        this.getListTransport()
        $('#order-state').on('change', function () {
            window.orderState = $('#order-state').val();
            self.getListTransport();
        });
        $('#icon-close').click(function () {
            $('.div-front').hide();
        });
        $('#btnSearch').click(this.getListTransportByIDBillAndState.bind(this));
    }

    fillDataTransport(response) {
        self = this;
        window.countTotal = 0;
        window.countDone = 0;
        $('#gird-transport tbody').empty();
        // var data = response.Countries;
        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;
            var idDetail = 'select-detail-' + item.id;
            var trHTML = $(`<tr>
            <td>` + item.id + `</td>
            <td>` + item.dateConfirm.replace('T', ' ') + `</td>
            <td>` + item.name + `</td>
            <td>` + item.addressReceive + `</td>
            <td>` + item.phone + `</td>
            <td style="text-align: right;">` + self.commaSeparateNumber(parseInt(item.totalCost)) + `</td>
            <td style="text-align: center;">` + self.selectState(item.state, item.id) + `</td>
            <td style="text-align: center;">` + `<i class="fas fa-info-circle" id=` + idDetail + ` onclick="showDetailTransport(this)"></i>` + `</td>
            </tr> `);
            $('#gird-transport tbody').append(trHTML);//chen duoi
            //$('.grid tbody').prepend(trHTML);// chen tren
            var select = { value: item.state, id: 'select-' + item.id, fill: true };
            self.selectColorState(select);
        });
        self.changePercentComplete();
    }

    commaSeparateNumber(val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        val += ' VNĐ';
        return val;
    }

    getUrlApi(state) {
        switch (state) {
            case 'all': case null: return "/api/bill/list-transport";
            default: return "/api/bill/list-transport/" + state;
        }
    }

    getListTransport() {
        self = this;
        var URL = self.getUrlApi(window.orderState);
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataTransport(response);
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    selectState(state, idBill) {
        var listState = ['complete', 'shipping', 'return'];
        var listStateVi = ['Hoàn thành', 'Đang giao', 'Trả hàng'];
        var idSelect = 'select-' + idBill;
        var str = '<select class="select-state" id=' + idSelect  + ' onchange="changeState(this)">';
        for (var i = 0; i < 3; i++) {
            var idOption = 'select-' + listState[i];
            str += '<option id=' + idOption + ' value=' + listState[i] + ' ' + this.selectedOfState(listState[i], state) + '>' + listStateVi[i] + '</option>';
        }   
        str += '</select>';
        return str;
    }

    selectedOfState(stateInList, state) {
        if (stateInList.toUpperCase() == state.toUpperCase())
            return 'selected';
        return '';
    }

    getState(self) {
        alert(self.value);
    }

    updateOrderStateByIdBill(idBill, state) {
        self = this;
        $.ajax({
            url: '/api/bill/update-transport/' + idBill + '/' + state,
            method: 'PUT',
            contentType: 'application/json',
            dataType: 'json'
        }).done(function (response) {
            if (response) {
                self.getListTransport();
            }
            else {
                alert("Cập nhật không thành công!");
            }
            window.resultUpdateOrderState = response;
        }).fail(function (response) {
            alert("Hiện tại ứng dụng đang được bảo trì, vui lòng thử lại sau!");
        });
    }

    selectColorState(self) {
        switch (self.value) {
            case 'complete':
                if (!self.fill)
                    window.countDone++;
                $('#' + self.id).removeClass('select-return');
                $('#' + self.id).removeClass('select-shipping');
                $('#' + self.id).addClass('select-complete');
                break;
            case 'shipping':
                if ($('#' + self.id).hasClass('select-complete'))
                    window.countDone--;
                $('#' + self.id).removeClass('select-complete');
                $('#' + self.id).removeClass('select-return');
                $('#' + self.id).addClass('select-shipping');
                break;
            case 'return':
                if ($('#' + self.id).hasClass('select-complete'))
                    window.countDone--;
                $('#' + self.id).removeClass('select-complete');
                $('#' + self.id).removeClass('select-shipping');
                $('#' + self.id).addClass('select-return');
                break;
        }
    }

    changePercentComplete() {
        window.completionRate = (window.countDone / window.countTotal).toFixed(2);
        var rate = window.completionRate;
        /* bacground-size * width = 10.000 */
        var width = String(rate * 100);
        var background_size_width = 10000 / width;
        $('.percent').css("width", width + '%');
        $('.percent').css("background-size", background_size_width + '% 100%');
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
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataTransportDetail(response);
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    //Search
    getListTransportByIDBillAndState() {
        self = this;
        var idBill = $("#txtSearch").val();
        var state = window.orderState;
        var URL = '/api/bill/list-transport/' + idBill + '/' + state;
        if (idBill == "")
            URL = '/api/bill/list-transport';
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataTransport(response);
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
}

