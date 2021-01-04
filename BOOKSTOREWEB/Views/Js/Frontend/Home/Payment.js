//import { add } from "./Home/minicart";

function readCookie(name) {    //OK
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

$(document).ready(function () {


     var paraID = readCookie("sessionID");
    //  var paraID = 1;
    var arrProPay = readCookie("listBuy");
    if (paraID) {
        var transportJS = new TransportJS(paraID, arrProPay);
        window.transportJS = transportJS;
    
        window.resultUpdateOrderState = true;
        window.completionRate = 1;

    }
    else {
        alert('you must to login');
        window.location.href = "http://google.com";
    }

});


class TransportJS {

    constructor(paraID, arrProPay) {
        this.feeShipping = 17000;
        this.totalPriceNotShipping = 0;
        this.idCustomer = paraID;
        this.idProduct = 1;
        this.idShop = 1;
        this.idndexDel = 1;
        this.idVoucher = 1; //Default
        this.idPayment = 1; //Default :)
        this.discount = 1;

        this.products = JSON.parse(arrProPay);
        
        this.initEvents();

    }

    //End function for element GUI
    initEvents() {
        self = this;
        window.orderState = 'all';

        self.getDelivery();
       
        self.getVoucher();
        self.getCustomerInfo(self.idCustomer);
        if (self.products.length>0) {
            self.getTransport(self.idCustomer);
            $('#btnBuying').click(function () {
                self.getValuebill();

            });
        }
     
    }

    getQuantityInCart(idCus) {          //OK

        self = this;
       
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
            
            $('#span-Number').text(response);
            //Gọi hàm load dữ liệu (ở trên :()
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
    
    getTransport(idCus) {
        self = this;
       
        var listProducts = self.products;
        // var URL = self.getUrlApi(window.orderState);
        var URL = "/api/cart/listSelectPro/" + self.idCustomer;
        $.ajax({
            url: URL,
            method: "POST", 
          
            dataType: 'json', //Kiểu dữ liệu truyền lên.
            contentType: 'application/json',
            data: JSON.stringify(listProducts),
            traditional: true
        }).done(function (response) {
            if (!$.trim(response)) {
                var h3 = `<h3>Your cart is empty! Click <a href="http://google.com">Here</a> to continue shopping</h3>`;
                $('#tableCart').empty();
                $('#tableCart').append(h3);

            }
            else {
                self.fillProductCheckout(response);  //Gọi hàm load dữ liệu (ở trên :()
            }
            self.getQuantityInCart(self.idCustomer);

        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    getDelivery() {
        self = this;
        // var URL = self.getUrlApi(window.orderState);

        var URL = "/api/bill/delivery";
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDelivery(response);
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    getVoucher() {
        self = this;
        // var URL = self.getUrlApi(window.orderState);

        var URL = "/api/bill/voucher";
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillVoucher(response);
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    getCustomerInfo(idCus) {
        self = this;

        // var URL = self.getUrlApi(window.orderState);
        var URL = "/api/cart/customerInfo/" + idCus;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {

            self.fillCustomer(response); //Gọi hàm load dữ liệu (ở trên :()

        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    fillProductCheckout(response) {
        self = this;

        window.countTotal = 0;
        window.countDone = 0;
        let count = 1;
        let totalPrice = 0;
        $('#myTable').empty();
       // self.discount = response[0].discount;

        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;

            // Lặp qua array item được select, gọi RestFull GET
            var table = document.getElementById("myTable");
        
                let cell = document.createElement("tr");

                let col = document.createElement("th");
                col.setAttribute("class", "th-row");
                let colValue = document.createTextNode(count);
                col.appendChild(colValue);
                cell.appendChild(col);

                let col1 = document.createElement("th");
                col1.setAttribute("class", "th-row");
                let imageBook = document.createElement("img");
                imageBook.setAttribute("class", "item-image");
                imageBook.setAttribute("src", 'https://newshop.vn/public/uploads/products/2583/toi-thay-hoa-vang-tren-co-xanh.jpg');
                col1.appendChild(imageBook);
                cell.appendChild(col1);

                let col2 = document.createElement("th");
                col2.setAttribute("class", "th-row");
                let colValue2 = document.createTextNode(item.name);
                col2.appendChild(colValue2);
                cell.appendChild(col2);


                let col4 = document.createElement("th");
                col4.setAttribute("class", "th-row");
                let colValue4 = document.createTextNode(item.price);
                col4.appendChild(colValue4);
                cell.appendChild(col4);


                let col5 = document.createElement("th");
                col5.setAttribute("class", "th-row");
                let colValue5 = document.createTextNode(item.quantity);
                col5.appendChild(colValue5);
                cell.appendChild(col5);

                let col6 = document.createElement("th");
                col6.setAttribute("class", "th-row");
                let colValue6 = document.createTextNode(item.quantity * item.price);
                col6.appendChild(colValue6);
                cell.appendChild(col6);

                document.getElementById("myTable").appendChild(cell);
           

            totalPrice += item.price * item.quantity;
            count++;

        });
       
        $('#money-subTotal').html(totalPrice);
        self.totalPriceNotShipping = totalPrice;
        $('#apply-Delivery').html(self.feeShipping);
      //  $('#apply-Voucher').html('-' + (self.discount == 1) ? '0' : (totalPrice * (1 - self.discount)));
        $('#apply-Voucher').html('-' +  (totalPrice *  self.discount));
      
     
        $('#money-mainTotal').html((totalPrice - (totalPrice *  self.discount)+ self.feeShipping));

        $('#btn-submit').on('click', function () {
            // Get value in current
            let cr_phone = $('#phoneCustomer').val();
          
            let cr_addCus = $('#addressCustomer').val();
            let cr_totalBill = parseInt($('#money-mainTotal').html());
            alert(cr_totalBill);
            //pass to function
            if (cr_phone === "") {
                alert("your pone is need to contact!!! Fill it");
            }
            else if (cr_addCus === "") {
                alert("Where I can delivery for you??");
            }
            else {
                self.setNewBill(self.idCustomer, self.idndexDel, self.idPayment, cr_addCus, cr_phone, self.feeShipping, cr_totalBill);
            }
            });

       
    }

   
    fillCustomer(response) {
        self = this;

        window.countTotal = 0;
        window.countDone = 0;
        var opDelivery = '';
        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;
            $('#nameCustomer').val(item.name);
            $('#phoneCustomer').val(item.phone);
            $('#addressCustomer').val(item.address);

        });
    }

    fillDelivery(response) {
        self = this;
      
        window.countTotal = 0;
        window.countDone = 0;
        var opDelivery = '';
       // localStorage.setItem('feeShipping', response[0].feeShip);
        self.feeShipping = response[0].feeShip;
        $('#selectionDelivery').empty();
        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;
            opDelivery += '<option class="opDelivery" >'
                + item.name + ' (' + item.feeShip + ') </label></option> ';

        });
        $('#selectionDelivery').append(opDelivery);
        $('#selectionDelivery').change(function () {

            let value = $('#selectionDelivery :selected').text();
            let myresult = value.substring(
                value.lastIndexOf("(") + 1,
                value.lastIndexOf(")"));
            self.idndexDel = $(this)[0].selectedIndex;

            self.feeShipping = parseInt(myresult);
            self.updateBillSelectionChange();        //Gọi hàm tính toán lại giá trị của hóa đơn

        });

    }
   
    fillVoucher(response) {
        self = this;
        
        window.countTotal = 0;
        window.countDone = 0;
        var opVoucher = '';
        //localStorage.setItem('discount', response[0].discount);
        self.discount = response[0].discount;
       
        $('#selectionVoucher').empty();
        $.each(response, function (index, item) {
            window.countTotal++;
           
            if (item.state == 'complete')
                window.countDone++;
            opVoucher += '<option class="opVoucher" >'
                + item.name +' (giảm ' + item.discount*100 + ' ) %</label></option> ';

        });
        $('#selectionVoucher').append(opVoucher);
        $('#selectionVoucher').change(function () {
            //   alert($(this)[0].selectedIndex);


            let value = $('#selectionVoucher :selected').text();
            let myresult = value.substring(
                value.lastIndexOf("(giảm ") + 6,
                value.lastIndexOf(" )"));

            self.idVoucher = $(this)[0].selectedIndex;
       
            self.discount = parseInt(myresult)/100;
            // self.updateBillByDelivery();        //Gọi hàm tính toán lại giá trị của hóa đơn
            self.updateBillSelectionChange();
        });

    }
    //Update Sau khi đổi đơn vị vận chuyển
    updateBillSelectionChange() {

        $('#apply-Delivery').html('$' + self.feeShipping);
        $('#apply-Voucher').html('- $' + self.discount * self.totalPriceNotShipping);
      
        $('#money-mainTotal').html('$' + (self.totalPriceNotShipping - self.totalPriceNotShipping * ( self.discount) + self.feeShipping));
    }

    setNewBill(idCus, idDel, idPay, add, phone, feeShip, totalCost) {

        self = this;
        var bill = {
            IDCustomer: idCus,
            IDDelivery: idDel,
            IDPayment: self.idPayment,
            IDVoucher: self.idVoucher,
            addressReceive: add,
            Phone: phone,
            FeeShip: feeShip,
            TotalCost: totalCost
        };

        $.ajax({
            url: "/api/bill/createBill",
            method: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(bill),
            traditional: true
        }).done(function (response) {
            if (response) {
                //self.getListTransport();
                console.log(self.products);
                var listProducts = self.products;
            
                $.ajax({
                    url: "/api/bill/updateBillDetail/" + self.idCustomer,
                    method: "POST",
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify( listProducts),
                    traditional: true
                }).done(function (response) {
                    alert("pass susseccful");
                }).fail(function (response) { alert("Not susscessful!!!");});
              
              self.getTransport(self.idCustomer);

            }
            else {
                alert("Cập nhật không thành công!");
            }
            window.resultUpdateOrderState = response;
        }).fail(function (response) {
            alert("Hiện tại ứng dụng đang được bảo trì, vui lòng thử lại sau!");
        });
      

    }
}