$(document).ready(function () {
    var transportJS = new TransportJS();
});

class TransportJS {
    constructor() {
        this.initEvents();
    }

    initEvents() {
        self = this;
        window.orderStatus = 'all';
        this.getListTransport()
        $('#order-status').on('change', function () {
            window.orderStatus = $('#order-status').val();
            self.getListTransport().bind(this);
        });
    }

    fillDataTransport(response) {
        $('.grid tbody').empty();
        // var data = response.Countries;
        $.each(response, function (index, item) {

            var trHTML = $(`<tr>
            <td>` + item.id + `</td>
            <td>` + item.dateConfirm.replace('T', ' ') + `</td>
            <td>` + item.name + `</td>
            <td>` + item.addressReceive + `</td>
            <td>` + item.phone + `</td>
            <td>` + item.totalCost + `</td>
            <td>` + `<input type="checkbox">` + `</td>
            <td>` + self.selectState(item.state, item.id) + `</td>
            </tr> `);
            $('.grid tbody').append(trHTML);//chen duoi
            //$('.grid tbody').prepend(trHTML);// chen tren
        });
    }

    getUrlApi(state) {
        switch (state) {
            case 'all': case null: return "/api/staff/list-transport";
            default: return "/api/staff/list-transport/" + state;
        }
    }

    getListTransport() {
        self = this;
        var URL = self.getUrlApi(window.orderStatus);
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
        var str = '<select class="select-state" id="select-"' + idBill + ' onchange="getState(this)">';
        for (var i = 0; i < 3; i++) {
            str += '<option value=' + listState[i] + ' + ' + this.selectedOfState(listState[i], state) + '>' + listStateVi[i] + '</option>'
        }
        str += '</select>';
        return str;
    }

    selectedOfState(stateInList, state) {
        if (stateInList == state)
            return 'selected';
        return null;
    }

    getState(self) {
        alert(self.value);
    }

}