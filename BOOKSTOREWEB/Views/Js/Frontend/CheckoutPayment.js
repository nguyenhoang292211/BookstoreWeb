//import { add } from "./Home/minicart";

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

$(document).ready(function () {


    var paraID = readCookie("sessionID");
    if (paraID) {
        var transportJS = new TransportJS(paraID);
        window.transportJS = transportJS;


        window.resultUpdateOrderState = true;
        window.completionRate = 1;

    }
    else {
        alert('you must to login');
        window.location.href="http://google.com";
    }


});


class TransportJS {

    constructor(paraID) {
        this.feeShipping = 17000;
        this.totalPriceNotShipping = 0;
        this.idCustomer = paraID;
        this.idProduct = 1;
        this.idShop = 1;
        this.idndexDel = 1;
        this.idVoucher = 1; //Default
        this.idPayment = 1; //Default :)
        
        //alert(this.idCustomer);
        this.initEvents();

    }
   
    //End function for element GUI
    initEvents() {
        self = this;
        window.orderState = 'all';

        self.getDelivery();
        self.getTransport(self.idCustomer);
        self.getCustomerInfo(self.idCustomer);
        $('#btnBuying').click(function () {
            self.getValuebill();
           
        })

    }
    getValuebill() {
        let namecus = $('#nameCustomer').val();
        let addressCus = $('#addressCustomer').val();
        let phoneCus = $('#phoneCustomer').val();
        let idDelivery = self.idndexDel; //Chua co o tren

       
        //self = this;
        var bill = {
            IDCustomer: self.idCustomer,
            IDDelivery: self.idndexDel,
            IDPayment: self.idPayment,
            IDVoucher: self.idVoucher,
            addressReceive: addressCus,
            Phone: phoneCus,
            FeeShip: self.feeShipping,
            TotalCost: self.feeShipping + self.totalPriceNotShipping
        };
        $.ajax({
            url: "/api/cart/createBill",
            method: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(bill),
            traditional: true
        }).done(function (response) {
            if (response) {
                //self.getListTransport();

                alert("Thanh toán thành công!!!");
                self.fillProductCheckout();
            }
            else {
                alert("Cập nhật không thành công!");
            }
            window.resultUpdateOrderState = response;
        }).fail(function (response) {
            alert("Hiện tại ứng dụng đang được bảo trì, vui lòng thử lại sau!");
        });
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
    getTransport(idCus) {
        self = this;
        // var URL = self.getUrlApi(window.orderState);
        var URL = "/api/cart/listBuying/" + idCus;
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

        var URL = "/api/cart/delivery";
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDelivery(response) //Gọi hàm load dữ liệu (ở trên :()
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
        $('#tableBody').empty();
        $('#partPayment').empty();

        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;

            let itemProduct = `<tr class="rem1">  <td class="invert">` + count + `<input class="saveId" type="text" style="display:none;" value="` + item.id + `"> 
               </td>  <td class="invert-image"> <a href="single.html"> <img src="images/s1.jpg" alt=" " class="img-responsive"> </a></td> <td class="invert">  
                <div class="qty" >  <input style="button" class="btn-minus" value="-" ><input type="text" class="input-value" name="quantityWantBuy" value="` +
                item.quantity + `"> <input  class="btn-plus" style="button" value="+">  </div ></td > <td class="invert">` +
                item.name + `</td> <td class="invert">` +
                item.price + `</td> <td class="invert"> <div class="rem"><div class="close1"> </div> </div> </td> </tr>`;

            var subTotal = ' <li> Product '
                + count + '  <i> -</i> <span>$'
                + item.quantity * item.price + `</span>   </li>`;
            $('#tableBody').append(itemProduct);
            $('#partPayment').append(subTotal);

            totalPrice += item.price * item.quantity;
            count++;

        });
        self.totalPriceNotShipping = totalPrice;
        var paymentValue = '<li>  Fee shipping (standard) <i> -</i><span id="FeeShip">$'
            + this.feeShipping + ' </span >  </li>';
        $('#partPayment').append(paymentValue);
        totalPrice += this.feeShipping;
        var TotalPriceUI = '<li>  Total <i> -</i> <span id="TotalPriceWithShip">$'
            + totalPrice + '</span >   </li>';
        $('#partPayment').append(TotalPriceUI);

        $('.btn-minus').click(function () {
            //  alert($(this).closest('div').find(':nth-child(2)').val());
            var minusValue = parseInt($(this).closest('div').find(':nth-child(2)').val());
            if (minusValue >= 2) {
                $(this).closest('div').find(':nth-child(2)').val(minusValue - 1);
                var idItem = $(this).parent().parent().parent().find(':first-child').find(':first-child').val();

                self.minusAproduct(idItem);
            }


        })
        $('.btn-plus').click(function () {
            var plusValue = parseInt($(this).closest('div').find(':nth-child(2)').val());
            // plusValue++;
            $(this).closest('div').find(':nth-child(2)').val(plusValue + 1);
            // self.updateQuantityInCart(3, 6, plusValue);
            var idItem = $(this).parent().parent().parent().find(':first-child').find(':first-child').val();

            self.plusAproduct(idItem);

        })
        $('.close1').click(function () {
            var idItem = $(this).parent().parent().parent().find(':first-child').find(':first-child').val();
            alert(idItem);
            self.deleteProduct(idItem);
        })

    }
    deleteProduct(idPro) {
        self = this;

        var URL = "/api/cart/deleteOutCart/" + self.idCustomer + "/" + idPro;
        $.ajax({
            url: URL,
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {

            self.getTransport(self.idCustomer); //Gọi hàm load dữ liệu (ở trên :(   )
            
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
    minusAproduct(idPro) {
        self = this;

        var URL = "/api/cart/minusAProduct/" + self.idCustomer + "/" + idPro;
        $.ajax({
            url: URL,
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {

            self.getTransport(self.idCustomer); //Gọi hàm load dữ liệu (ở trên :(   )
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
    plusAproduct(idPro) {
        self = this;

        var URL = "/api/cart/plusAProduct/" + self.idCustomer + "/" + idPro;
        $.ajax({
            url: URL,
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {

            self.getTransport(self.idCustomer); //Gọi hàm load dữ liệu (ở trên :(   )
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
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
        // alert("thao toan");
        window.countTotal = 0;
        window.countDone = 0;
        var opDelivery = '';
        localStorage.setItem('feeShipping', response[0].feeShip);

        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;
            opDelivery += '<option class="opDelivery" >'
                + item.name + ' (' + item.feeShip + ') </label></option> ';

        });
        $('#selectionDelivery').append(opDelivery);
        $("#selectionDelivery").change(function () {
         //   alert($(this)[0].selectedIndex);


            let value = $('#selectionDelivery :selected').text();
            let myresult = value.substring(
                value.lastIndexOf("(") + 1,
                value.lastIndexOf(")"));
            self.idndexDel = $(this)[0].selectedIndex;

            self.feeShipping = parseInt(myresult);
            self.updateBillByDelivery();

        });

    }
    //Update Sau khi đổi đơn vị vận chuyển
    updateBillByDelivery() {
        $("#FeeShip").html('$'+self.feeShipping);
        $("#TotalPriceWithShip").html('$'+(self.totalPriceNotShipping + self.feeShipping));
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

                alert("Thanh toán thành công!!!");
                // self.fillProductCheckout();
                self.getTransport(self.idCustomer);
               // for (let i = 0; i < 100; i++);

                self.getQuantityInCart(self.idCustomer);
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