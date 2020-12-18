

function openTab(evt, idelement, content, type) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-change");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.background = "grey";
    }
    var nametype = document.getElementById(idelement).innerHTML;
    window.productJS.getListbookWithnametype(nametype, content);
    
    document.getElementById(type).style.display = "block";
    document.getElementById(idelement).style.background = "Blue";
}

$(document).ready(function () {
    var productJS = new ProductJS();
    window.customer = null;
    window.productJS = productJS;
    //số lượng một sản phẩm bất kì trong cart 

    alert("hhh");
})


//Lây danh sách cuốn sách theo thể loại khi click 


//====================================================================================//

class ProductJS {
    constructor() {
        this.initEvents();
    }

    initEvents() {
        self = this;
       // alert("đang load event");
       // self.getListTypebook();
        // self.getListHotDealbook();
      self.gettheBestsaler();
        self.getCategory();
    }

    checkquantity(idpro, idCus) {
        self = this;
        var URL = "/api/product/checkquantity/" + idCus + "/" + idpro;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {

            this.Amountproductincart = response;

        }).fail(function (response) {
            alert("khong check quantity được");
        });
    }

    loadtheBestsaler(response) {
        window.count = 0;
        $('#best-saler-product').empty();
        $.each(response, function (index, item) {
            window.count++;
            var strHTML = $(` <div class="col-md-3 product-men women_two">
                        <div class="product-googles-info googles">
                            <div class="men-pro-item">
                                <div class="men-thumb-item">
                                    <img src="../../../Images/Frontend/Home/product-1.jpg" class="img-fluid" alt="">
                                    <div class="men-cart-pro">
                                        <div class="inner-men-cart-pro">
                                              <a class="id-PRO" style="display:block;">`+ item.ID +`</>
                                            <a style="color:white;" class="link-product-add-cart">Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-info-product">
                                    <div class="info-product-price">
                                        <div class="grid_meta">
                                            <div class="product_price">
                                                <h4>
                                                    <a style="font-size:14px ;">`+ item.Name + `</a>
                                                </h4>
                                                <div class="grid-price mt-2">
                                                    <span class="money ">`+ item.Price + `</span>
                                                </div>
                                            </div>
                                            <ul class="stars">
           
                     
                                               <li>
                                                    <a href="">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="googles single-item hvr-outline-out">
                                                 <form action="#" method="post">
                                                    <label class="id-PRO">`+ item.ID +`</label>
                                                    <input type="hidden" name="cmd" value="_cart">
                                                    <input type="hidden" name="add" value="1">
                                                    <input type="hidden" name="googles_item" value="Farenheit">
                                                    <input type="hidden" name="amount" value="575.00">
                                                    <button type="submit" class="googles-cart pgoogles-cart">
                                                        <i class="fas fa-cart-plus"></i>
                                                    </button>
                                                 </form>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>`);

        $('#best-saler-product').append(strHTML);//chen duoi
            //$('.grid tbody').prepend(trHTML);// chen tren

        });

        alert("vô ròi");
        //tạo sự kiện cho button add to cart
       
        var buttonaddtocart = document.getElementsByClassName("googles-cart");
        for (var i = 0; i < buttonaddtocart.length; i++) {
            var add = buttonaddtocart[i];
            add.onclick= function (event) {
                var button = event.target;
                var product = button.parentElement.parentElement;
                var idpro = product.getElementsByClassName("id-PRO")[0].innerHTML;
                var idcus = 3;
                var idshop = 1;
               //THÊM VÀO GIỎ HÀNG
               window.productJS.HandleCart(idcus, idpro, idshop);
               return false;
            };
        }   

        var viewDetail = document.getElementsByClassName("inner-men-cart-pro");
        for (var i = 0; i < viewDetail.length; i++) {
            var button = viewDetail[i];
            button.onclick = function (event) {
                var t = event.target;
                    // Store
                window.location.href = "DetailProductPage.html?ID=" + t.parentElement.getElementsByClassName("id-PRO")[0].innerText;
               // idproduct.innerText = (t.parentElement.getElementsByClassName("id-PRO")[0]).innerText;
              //  window.location.href = "DetailProductPage.html";
            };
        }
    }


    loadListHotdeal(response) {
        $("#autoWidth").empty();
        $.each(response, function (index, item) {
            var strHTML = $(`<li class="item-a">
                                <div class="box">
                                    <div class="slide-img">
                                        <img alt="1" src="../../../Images/Frontend/Home/book2.jpg">
                                        <label class="discount_label">`+ item.Discount_percent+`%</label>
                                        <label class="id-PRO" style="display:block;color:red;font-size:15;">`+item.ID+`</label>
                                        <div class="overlay">
                                            <button type="button" class="buy-btn btn-cart">Add to cart</button>
                                            <button type="button" class="buy-btn btn-detail">Detail</button>
                                        </div>
                                    </div>
                                    <!--detail-box--------->
                                    <div class="detail-box">
                                        <!--type-------->
                                        <div class="type">
                                            <a href="#" ">`+ item.Name + `</a>
                                            <span>`+ item.Author + `</span>
                                            <div class="rate-point">
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                            </div>
                                        </div>
                                        <!--price-------->
                                        <a href="#" class="price">`+ item.Price + `</a>
                                    </div>
                                </div>
                            </li>`);
            $('#autoWidth').append(strHTML);
        });

       
            
        $('#autoWidth').lightSlider({
            autoWidth: true,
            loop: true,
            onSliderLoad: function () {
                $('#autoWidth').removeClass('cs-hidden');
            }
        });

        //Xử lí sự kiện thêm vào giỏ hàng
        var buttonaddtocart = document.getElementsByClassName("btn-cart");
        for (var i = 0; i < buttonaddtocart.length; i++) {
            var add = buttonaddtocart[i];
            add.onclick = function (event) {
                var button = event.target;
                var product = button.parentElement.parentElement;
                var idpro = product.getElementsByClassName("id-PRO")[0].innerText;
                var idcus = 4;
                var idshop = 1;
                //lấy số lượng sản phẩm trong giỏ, nếu chưa thì =1;
                // window.productJS.checkquantity(idpro, idcus)
                // var quantity;
                window.productJS.HandleCart(idcus, idpro, idshop);
                return false;
            };
        }      
    }
    //Lấy danh sách tất cả sách
    gettheBestsaler (){
        self = this;
        var URL ="/api/product/listbestsaler";
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.loadtheBestsaler(response);
            alert("sfsdfsdf");
        }).fail(function (response) {
                console.log(response);
            alert("Lỗi load sản phẩm");
        });
    }

    //Lấy danh sách loại sách
    loadListTypebook(response) {
        $("#Typebook-right").empty();
        $("#container-left").empty();
        var count = 0;
        $.each(response, function (index, item) {
            count++;
            var strHTML1 = $(`<div class="tab-change" id="type`+ item.id+`">
                                <section class="slider">
                                    <ul id="autoWidth`+item.id+`" class="cs-hidden">
                                    </ul>
                                </section>
                              </div>`);
            $('#container-left').append(strHTML1);

            if (index == 0)
                var strHTML2 = $(`<button class="tablinks" id="btn_` + item.id + `" onclick="openTab(event,'btn_` + item.id + `','autoWidth` + item.id + `','type` + item.id+`')" >` + item.name + `</button>`)
            else
                var strHTML2 = $(`<button class="tablinks" id="btn_` + item.id + `" onclick="openTab(event,'btn_` + item.id + `','autoWidth` + item.id + `','type` + item.id + `')" >` + item.name + `</button>`)
            $('#Typebook-right').append(strHTML2);

        });
        document.getElementById("btn_1").onclick();
        
    }

    //Lấy danh sách thể loại sách
    getListTypebook() {
        self = this;
        var URL = "/api/product/listalltypeproduct";
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.loadListTypebook(response);
            alert("Load xong thẻ loại");
           
            
        }).fail(function (response) {
          alert("Lỗi load thể loại");
            });

    }

    
    //Lấy danh sách sách theo thể loại
    getListbookWithnametype(typename,autoWidthid) {
        self = this;
        var URL = "/api/product/listalltypeproduct/" + typename;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.loadListHotbook(response,autoWidthid);
        }).fail(function (response) {
            console.log(response);
            alert("Lỗi load sản phẩm");
        });

    }

    //Lấy danh sách sản phẩm giảm giá
    getListHotDealbook() {
        self = this;
        var URL = "/api/product/listallHotdeal";
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.loadListHotdeal(response);
            alert("Load xong hot book");


        }).fail(function (response) {
            alert("Lỗi load hot book");
        });
    }

    getTypeProductWithCate(idCate,count) {
        var URL = "/api/Category/type/" + idCate;
        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "", //Kiểu dữ liệu truyền lên.
        }).done(function (products) {
            var ul = document.createElement("ul");
            $.each(products, function (index, item) {
               

                var li = document.createElement("li");
                li.setAttribute("class", "media-mini mt-3");

                var a = document.createElement("a");
                
                var text = document.createTextNode(item.Name);
                a.setAttribute("href", "ProductPage.html?type=" + item.ID);
             
                a.appendChild(text);
                li.appendChild(a);
                ul.appendChild(li);

               
            });
            var container = document.getElementsByClassName("col-md-4 media-list span4 text-left")[count];
            container.appendChild(ul);
            


        }).fail(function () {

        });
    }


    loadCategory(listcategory) {
        self = this;
        $('#nav-category').empty();
        var container = document.getElementById("nav-category");
        $.each(listcategory, function (index, item) {
            

            var divcontaint = document.createElement("div");
            divcontaint.setAttribute("class", "col-md-4 media-list span4 text-left");
            

            var h5titleCate = document.createElement("h5");
            h5titleCate.setAttribute("class", "tittle-w3layouts-sub");
            var content = document.createTextNode(item.Name);

            h5titleCate.appendChild(content);

            divcontaint.appendChild(h5titleCate);

            container.appendChild(divcontaint);

            self.getTypeProductWithCate(item.ID, index);
        });

    }

    //Load category trên thanh narbar
    getCategory() {
        self = this;
        var URL = "";
        $.ajax({
            url: "/api/Category/type",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //Định nghĩa type data trả về.
            },
            dataType: "json", //Kiểu dữ liệu truyền lên.
        }).done(function (response) {
            self.loadCategory(response);
            self.gettheBestsaler();

        }).fail(function (response) {
            alert("Lỗi category");
        });
    }




    //Thêm sản phẩm vào giỏ
    HandleCart(idcus, idproduct, idshop) {
        var cart = {
            IDCustomer: idcus,
            IDproduct: idproduct,
            IDshop: idshop,
           // Quantity: quantity
        };
        $.ajax({
            url: "/api/product/addtocart",
            method: "POST",
            data: JSON.stringify(cart),
            contentType: "application/json",
            dataType: "json",
            traditional: true
        }).done(function (res) {
            if (res == true) {
                alert("Sản phẩm đã thêm vào giỏ!");
               // $(location).attr('href', '/Views/Pages/Login/signIn.html');
            }
            else {
                alert("Thêm vào giỏ hàng không thành công!")
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
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