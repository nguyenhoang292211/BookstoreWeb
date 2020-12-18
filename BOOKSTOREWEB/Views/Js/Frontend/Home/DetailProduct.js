$(document).ready(function () {
    var para = 6;

    var transportJS = new TransportJS(para);
    window.transportJS = transportJS;
    window.resultUpdateOrderState = true;
    window.completionRate = 1;


});



//===================================================================//
class TransportJS {

    constructor(para) {
        this.idProduct = para;
        this.idCus = 1;

        this.initEvents();
    }

    initEvents() {
        self = this;
        window.orderState = 'all';
        var idCus = 1;
        var idProduct = 1;

        this.getTransport(idProduct);
        this.getDetailComment(idProduct);
        this.loadCountCart(idCus);
        //save how many start customer give
        var ratedIndex = -1;
        //span-Number
        //button Minus click
        $('.btn-minus').click(function () {
            let value = parseInt($('#quantityWantBy').val());
            if (value == 1) return;
            value--;
            $('#quantityWantBy').val(value);
        });
        //butto Plus click
        $('.btn-plus').click(function () {
            let value = parseInt($('#quantityWantBy').val());
            if (value == 0) return;
            value++;
            $('#quantityWantBy').val(value);
            alert(this.inCus);


        });
        $('#user-rating .fa-star').on('click', function () {
            ratedIndex = parseInt($(this).data('index')) + 1;
            localStorage.setItem('ratedIndex', ratedIndex);

            self.resetStarColor();
            self.setStars(ratedIndex);

        })
        $('#btn-submit').click(function () {
            //variable global
            var idCustomer = 1;
            var idProduct = 1;
            var idShop = 1;
            var content = document.getElementById('user-comment').value;
            var rating = ratedIndex + 1;

            self.saveComment(idCustomer, idProduct, idShop, content, ratedIndex);
            // self.fillDataTransportComment(idProduct);
            // self.getDetailComment(idProduct);
        })
        $('#addToCart').click(function () {
            let numberBuy = parseInt($('#quantityWantBy').val());
            alert(numberBuy);
            self.createOrder(self.idCus, self.idProduct, numberBuy);
        })

    }
    //save to cart
    createOrder(idCus, idPro, quantity) {

        alert(idCus + " " + idPro);
        self = this;
        // var URL = self.getUrlApi(window.orderState);
        var URL = "/api/product/createOrder/" + idCus + "/" + idPro + "/" + quantity;
        $.ajax({
            url: URL,
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            alert('Thêm thành công');
            self.loadCountCart(idCus);
            //Gọi hàm load dữ liệu (ở trên :()
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
    //get respone from API,fill product which select in this page (main product)
    fillDataTransport(response) {
        self = this;

        window.countTotal = 0;
        window.countDone = 0;
        var totalSum = 0;


        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;

            $('#nameProduct').text(item.name);
            document.getElementById("nameProduct").innerHTML = item.name;
            //Thảo format data
            let xRating = item.rating;
            for (let i = 1; i <= xRating; i++) {
                let rating = ' <i class="fa fa-star"></i>';
                $('#detailproduct-rating').append(rating);
            }
            $('#priceProduct').html('$' + String(item.price));
            var specification = '<li>Author :' + item.author + '</li> <li>Publisher by: ' + item.publisher + '</li>';
            $('#p1-author').append(specification);
            $('#p1-description').html(item.description);



        });
    }

    // API get comment in this product
    fillDataTransportComment(response) {
        self = this;

        window.countTotal = 0;
        window.countDone = 0;

        var totalSum = 0;

        document.getElementById('bootstrap-tab-text-grid').innerHTML = "";
        $.each(response, function (index, item) {
            window.countTotal++;
            if (item.state == 'complete')
                window.countDone++;

            totalSum++;
            //code add comment by js
            //  var divPreview = document.createElement("div");
            //  divPreview.setAttribute("class", "reviewer");

            // Name of customer ' comment
            var h4Name = document.createElement("h6");
            var h4NameValue = document.createTextNode(item.name);
            h4Name.appendChild(h4NameValue);
            //Date posting
            document.getElementById("bootstrap-tab-text-grid").appendChild(h4Name);

            var span12 = document.createElement("span");
            var span12Text = document.createTextNode(String(item.datePost));
            span12.appendChild(span12Text);
            document.getElementById("bootstrap-tab-text-grid").appendChild(span12);

            //Rating
            var divRating = document.createElement("div");
            divRating.setAttribute("class", "ratting");


            var pContent = document.createElement("p");
            var pValue = document.createTextNode(item.content);
            pContent.appendChild(pValue);
            document.getElementById("bootstrap-tab-text-grid").appendChild(pContent);
            //  document.getElementById("bootstrap-tab-text-grid").appendChild(divPreview);

            let xRating = item.rating;
            var i_rating = ' <div class="ratting">';
            for (var i = 1; i <= xRating; i++) {
                i_rating += '<i class="far fa-star"></i>';
            }
            i_rating += '</div> <br>';
            //  document.getElementById("bootstrap-tab-text-grid").appendChild(divPreview);
            //divPreview.appendChild(i_rating);
            $('#bootstrap-tab-text-grid').append(i_rating);


        });
    }
    loadCountCart(idCus) {


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

            $('#span-Number').text(response);
            //Gọi hàm load dữ liệu (ở trên :()
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }

    // Đã chuyển
    getUrlApi(state) {
        switch (state) {
            case 'all': case null: return "/api/product/list-product";
            default: return "/api/cart/list-product/" + state;
        }
    }

    getTransport(idProduct) {
        self = this;
        // var URL = self.getUrlApi(window.orderState);
        var URL = "/api/product/detailproduct/" + idProduct;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataTransport(response);  //Gọi hàm load dữ liệu (ở trên :()
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
    getDetailComment(idProduct) {
        self = this;

        var URL = "/api/product/comment/" + idProduct;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.fillDataTransportComment(response);  //Gọi hàm load dữ liệu (ở trên :(   )
        }).fail(function (response) {
            alert("Hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }
    //save comment

    //For make rating
    resetStarColor() {

        for (var i = 0; i < 5; i++) {
            $('#user-rating  .fa-star:eq(' + i + ')').css('font-weight', 'normal');
        }
    }
    setStars(max) {
        self.resetStarColor();
        for (var i = 1; i <= max; i++) {

            $('#user-rating  .fa-star:eq(' + (i - 1) + ')').css('font-weight', 900);
        }
    }

    clearComment() {
        document.getElementById('user-comment').value = "";
        self.resetStarColor();
    }
    saveComment(idCus, idPro, idShop, content, rating) {

        self = this;
        var Comment = {
            IDCustomer: idCus,
            IDProduct: idPro,
            IDShop: idShop,
            Content: content,
            Rating: rating
        };
        $.ajax({
            url: "/api/product/createComment",
            method: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(Comment),
            traditional: true
        }).done(function (response) {
            if (response) {
                //self.getListTransport();
                self.clearComment();
                self.getDetailComment(idPro);
                alert("Để lại ý kiến thành công!!! Lưu ý, nếu bạn chưa mua hàng, bạn chỉ có thể để lại bình luận, rating sẽ được xem xét");

            }
            else {
                alert("Cập nhật không thành công!");
            }

        }).fail(function (response) {
            alert("Hiện tại ứng dụng đang được bảo trì, vui lòng thử lại sau!");
        });
    }




    //using 
    //Thao- Get list Book of perional customer-- cho xu li
    getlisttransportdetail(idCus) {
        self = this;
        $.ajax({
            url: '/api/product/list-product/' + idCus,
            method: "get",
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json' //định nghĩa type data trả về.
            },
            datatype: "json", //kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.filldatatransportdetail(response);
        }).fail(function (response) {
            alert("hệ thống đang trong thời gian bảo trì, vui lòng thử lại sau!");
        });
    }


}

