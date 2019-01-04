$(function(){
    
    
    $('.navbar a, footer a').on("click",function(event){
        event.preventDefault();
        var hash=this.hash;

        $('html,body').animate({scrollTop:$(hash).offset().top},400,function(){  }) ;

    }) ;
    
    
    
}) ;
/*

	$(document).ready(function() {
		$('.js-scrollTo').on('click', function() { // Au clic sur un élément
			var page = $(this).attr('href'); // Page cible
			var speed = 750; // Durée de l'animation (en ms)
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
			return false;
		});
	});
    
    */