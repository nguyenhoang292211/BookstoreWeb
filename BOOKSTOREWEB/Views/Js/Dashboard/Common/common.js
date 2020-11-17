$(document).ready(function(){
    var common = new Common();
    window.timeHide = 400;
});

class Common{
    constructor(){
        this.initEvents();
    }

    initEvents()
    {
        $("#btnOrderForm").click(this.showOrderForm.bind(this));
        $("#btnProduct").click(this.showProduct.bind(this));
        $("#btnPromote").click(this.showPromote.bind(this));
    }

    hideOrderForm()
    {
        $("#function-detail-order-form").slideUp(window.timeHide);
    }

    showOrderForm()
    {
        $("#function-detail-order-form").slideToggle(window.timeHide);
        this.hideProduct();
        this.hidePromote();
    }

    hideProduct()
    {
        $("#function-detail-product").slideUp(window.timeHide);
    }

    showProduct()
    {
        $("#function-detail-product").slideToggle(window.timeHide);
        this.hideOrderForm();
        this.hidePromote();
    }

    hidePromote()
    {
        $("#function-detail-promote").slideUp(window.timeHide);
    }

    showPromote()
    {
        $("#function-detail-promote").slideToggle(window.timeHide);
        this.hideOrderForm();
        this.hideProduct();
    }
}