$(document).on("click", ".navbar-right .dropdown-menu", function(e){
	e.stopPropagation();
});
$('.owl-carousel').owlCarousel({
    ltr:true,
    loop:true,
    margin:10,
    nav:false,
    autoplay:true,
    singleItem:true,
    dots: false,
    items:1

})