//import { add } from "./Home/minicart";

//import { write } from "fs/promises";

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
function writeCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
$(document).ready(function () {


    // var paraID = readCookie("sessionID");
    var paraID = 1;
    if (paraID) {
        var transportJS = new TransportJS(paraID);
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

    constructor(paraID) {
        // this.feeShipping = 17000;
        this.totalPriceNotShipping = 0;
        this.idCustomer = paraID;
        this.idProduct = 1;
        this.idShop = 1;
        this.idndexDel = 1;
        this.idVoucher = 1; //Default
        this.idPayment = 1; //Default :)

        this.initEvents();

    }

    //End function for element GUI
    initEvents() {
        self = this;
        window.orderState = 'all';

        //  self.getDelivery();
        self.getTransport(self.idCustomer);
       // self.getCustomerInfo(self.idCustomer);
        $('#btnBuying').click(function () {
            self.getValuebill();

        });

    }
   
    calPayment() {
        
        $('.checkItem').each(function () {
            // checked:0,  unchecked: 1
            let t = this.checked ? 0 : 1;
            alert(t);
            if (t == 0) {
                let myIdItem = $(this).parent().find(':nth-child(2)').val();
                console.log(myIdItem);
                let quantityItem = $(this).parent().parent().find(':nth-child(3)').find(':nth-child(2)').val();
                console.log(quantityItem);
                let priceItem = $(this).parent().parent().find(':nth-child(5)').text();
                console.log(priceItem);
            }

        })
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
                var h3 = `<h3>Your cart is empty! Click <a href="http://google.com">Here</a> to continue shopping</h3>`;
                $('#tableCart').empty();
                $('#tableCart').append(h3);

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

    

    fillProductCheckout(response) {
        self = this;

        window.countTotal = 0;
        window.countDone = 0;
        let count = 1;
        //let totalPrice = 0;
        $('#tableBody').empty();
        $('#partPayment').empty();
        let totalPrice = 0;
        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;

            let itemProduct = `<tr class="rem1">  <td class="invert"> <input class="checkItem" type="checkbox"> <input class="saveId" type="text" style="display:none;" value="` + item.id + `"> 
               </td>  <td class="invert-image"> <a href="single.html"> <img src="images/s1.jpg" alt=" " class="img-responsive"> </a></td> <td class="invert">  
                <div class="qty" >  <input style="color:black;" style="button" class=" my-btn-minus btn-minus" value="-"  ><input type="text" class="input-value" name="quantityWantBuy" value="` +
                item.quantity + `"> <input  class="btn-plus my-btn-plus" style="color:black;" style="button" value="+">  </div ></td > <td class="invert">` +
                item.name + `</td> <td class="invert">` +
                item.price + `</td> <td class="invert"> <div class="rem"><div class="close1"> </div> </div> </td> </tr>`;

           
            $('#tableBody').append(itemProduct);
           
            count++;

        });
       
        var TotalPriceUI = '<li>  Total <i> -</i> <span id="TotalPriceWithShip">$'
            + totalPrice + '</span >   </li>';
        $('#partPayment').append(TotalPriceUI);
        $('#btnSubmitBill').on('click', function () {
            var arr = [];
            let flat = 0;
            $('.checkItem').each(function () {
                
                if (this.checked == true) {
                    let idProSubmit = $(this).parent().find(':nth-child(2)').val();
                    console.log(idProSubmit);
                    arr.push(idProSubmit);
                    flat = 1;
                }
            });
            if (flat == 0) {
                alert("Bạn phải chọn ít nhất 1 sản phẩm");
            }
            else {
                var json_str = JSON.stringify(arr);
                writeCookie("listBuy", json_str, 0.3);
                writeCookie("sessionID", self.idCustomer, 0.3);

                window.location.href = "Payment.html";
            }
         
        })
        $('.my-btn-minus').click(function () {
           
            var minusValue = parseInt($(this).closest('div').find(':nth-child(2)').val());
            
            if (minusValue >= 2) {
                $(this).closest('div').find(':nth-child(2)').val(minusValue - 1);
                var idItem = $(this).parent().parent().parent().find(':first-child').find(':nth-child(2)').val();

                self.minusAproduct(idItem);
            }
            self.calPayment();

        })
        $('.my-btn-plus').click(function () {
            var plusValue = parseInt($(this).closest('div').find(':nth-child(2)').val());
            // plusValue++;

            $(this).closest('div').find(':nth-child(2)').val(plusValue + 1);
          
            var idItem = $(this).parent().parent().parent().find(':first-child').find(':nth-child(2)').val();
            
            self.plusAproduct(idItem);
            self.calPayment();

        })
        $('.close1').click(function () {
            //Get Id
            var idItem = $(this).parent().parent().parent().find(':first-child').find(':nth-child(2)').val();
            alert(idItem);
            var idChecked = $(this).parent().parent().parent().find(':first-child').find(':nth-child(1)').prop('checked', false); 
            var idChecked = $(this).parent().parent().parent().css('display', 'none');
            self.deleteProduct(idItem);
            for (let i = 0; i < 1000; i++)  //  đợi db được cập nhật, trình chưa đủ để viết await
                
           // $('#span-Number').text($('#span-Number').text - 1);
            self.getQuantityInCart(self.idCustomer);
        })
        $('.checkItem').change(function () {
            self.updateMoney();
           
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

            // self.getTransport(self.idCustomer); //Gọi hàm load dữ liệu (ở trên :(   )
            self.updateMoney();
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
           
            
            self.updateMoney();
           // self.getTransport(self.idCustomer); //Gọi hàm load dữ liệu (ở trên :(   )
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

           // self.getTransport(self.idCustomer); //Gọi hàm load dữ liệu (ở trên :(   )
           self.updateMoney();
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    updateMoney() {
        self.totalPriceNotShipping = 0; 
        $('#partPayment').empty();
        let myCount = 1;
        $('.checkItem').each(function () {
            //1: checked, 0: unchecked
          
            let t = this.checked ? "1" : "0";
            if (t == 1) {
                let idItself = $(this).parent().find(':nth-child(2)').val();
                let priceItself = $(this).parent().parent().find(':nth-child(5)').html();
                let quantityItself = $(this).parent().parent().find(':nth-child(3)').find(':nth-child(1)').find(':nth-child(2)').val();
                var subTotal = ' <li> Product '
                    + myCount + '  <i> -</i> <span>$'
                    + quantityItself * priceItself + `</span>   </li>`;

                $('#partPayment').append(subTotal);

                self.totalPriceNotShipping += priceItself * quantityItself;
                myCount++;

            }

        })
        var TotalPriceUI = '<li>  Total <i> -</i> <span id="TotalPriceWithShip">$'
            + self.totalPriceNotShipping + '</span >   </li>';
        $('#partPayment').append(TotalPriceUI);

    }

  

   
}