(function ($) {

    /**
     * Add shrink class to header on scroll.
     */
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var height = $('.hero-section').outerHeight();
        var header = $('.site-header').outerHeight();
        if (scroll >= header) {
            $(".site-header").addClass("shrink");
        } else {
            $(".site-header").removeClass("shrink");
        }
    });

    /*
     * Move before header into nav on mobile.
     */
    $( window ).on( 'resize', function () {
        if ( $( window ).width() < 896 ) {
            $( '.header-widget-area' ).appendTo( '.nav-primary .menu' );
        } else {
            $( '.header-widget-area' ).appendTo( '.site-header .wrap' );
            $( '.nav-primary .header-widget-area' ).remove();
        }
    } ).resize();

    /**
     * Show/hide video lightbox.
     */
    $('.front-page-4 .wp-video').append('<button class="hide-video">×</button>');
    $('.front-page-4 .wp-video').prepend('<div class="before"></div>');
    $('.show-video, .open-video').on('click', function (e) {
        e.preventDefault();
        $('.widget_media_video').toggleClass('visible');
    });
    $('.hide-video, .before').on('click', function () {
        $('.front-page-4 .widget_media_video').toggleClass('visible');

        // First get the  iframe URL.
        var url = $('.front-page-4 iframe').attr('src');

        // Then assign the src to null, this then stops the video been playing.
        $('.front-page-4 iframe').attr('src', '');

        // Finally reassign the URL back to the iframe, so when you hide and load it again you still have the link.
        $('.front-page-4 iframe').attr('src', url);

    });

    // Append icon for enews footer widget.
    $('.footer-widgets .enews form').append('<i class="fa fa-send-o"></i>');

    // Add back to top button.
    $('.site-footer > .wrap').append('<a href="#top" class="back-to-top"></a>');

    // Add id to top of page for scrolling target.
    $('html').attr('id', 'top');

    // Hide menu when anchor link is clicked.
    $('.menu-item a[href*="#"]').on( 'click', function() {
        if( $( '.menu-toggle' ).hasClass( 'activated' ) ) {
            $('.nav-primary').fadeToggle();
            $('.menu-toggle').removeClass('activated');
        }
    });

    // Initialize fitVids script.
    $('.site-container').fitVids();

    /**
     * Smooth scrolling.
     */
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    // Remove WooCommerce tabs
    .not('[href*="#tab-"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 130
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

    // QJones Custom Scripts

    // Clone Before Footer Section and place it after Front Page 2
    if( $('body').hasClass('home') ) {
        var $beforeFooter = $('.before-footer').clone();
        $beforeFooter.insertAfter('.front-page-2')
        .prepend( '<!--<p>This section has been cloned and placed here by customizer-script.js.</p>-->' );
        $beforeFooter.find('a').prop('id', 'cloned-link');
    }

    // Identify external links
    $(
        ".content a[href^='http://']:not([href*='" +
        location.hostname +
        "']),.content a[href^='https://']:not([href*='" +
        location.hostname +
        "']),.content a[href^='// ']:not([href*='" +
        location.hostname +
        "'])"
    )
        .addClass('external')
        .attr('target', '_blank')
        .attr('rel', 'noreferrer noopener');

    // Append external link icon
    $('a.external').append('<i class="fa fa-external-link" aria-hidden="true" />');

    // Performs a smooth page scroll to an anchor on page load
    $(window).on('load', function () {
        if (window.location.hash) {
            var target;
            try {
                target = $(window.location.hash);
            }
            catch (err) {
                return;
            }
            if (!target.length) {
                target = $('[name="' + window.location.hash.slice(1) + '"]');
                if (!target.length) {
                    return;
                }
            }
            else {
                $('html,body').animate({
                    scrollTop: target.offset().top - 130
                }, 1000);
                target.parent().addClass('highlight');
            }
        }
    });

    // Add Description to Basic Web Design Package Product Page
    $('.postid-1826').find('h1[itemprop="headline"]').after('<p itemprop="description">Get a Fully Functional and Mobile Responsive Website</p>');

    // Add Description to Web Design & Development Product Page
    $('.postid-1833').find('h1[itemprop="headline"]').after('<p itemprop="description">Keep Your Software Up To Date and Secure</p>');

    // Add Description to Pro-Plus Design & Development Product Page
    $('.postid-1834').find('h1[itemprop="headline"]').after('<p itemprop="description">Premium Web Development and Customization</p>');

    // Add Description to Yearly Website Maintenance Product Page
    $('.postid-1835').find('h1[itemprop="headline"]').after('<p itemprop="description">Keep Your Software Up To Date and Secure</p>');

    // Remove the Leave a Comment link from the Entry Meta Section
    $('.entry-comments-link').remove();

    // Add IDs the Footer Quick Links Menu Items
    if ( $('#menu-footer-menu li:eq(0) a').length ) {
        var $quickLink1 = $('#menu-footer-menu li:eq(0) a');
        var $thisLinkText1 = $('#menu-footer-menu li:eq(0) a').text().replace(/[^a-z0-9\s]/gi, '').replace(/ /g, '-');
        $quickLink1.prop('id', $thisLinkText1);
    }

    if ( $('#menu-footer-menu li:eq(1) a').length ) {
        var $quickLink2 = $('#menu-footer-menu li:eq(1) a');
        var $thisLinkText2 = $('#menu-footer-menu li:eq(1) a').text().replace(/[^a-z0-9\s]/gi, '').replace(/ /g, '-');
        $quickLink2.prop('id', $thisLinkText2);
    }

    if ( $('#menu-footer-menu li:eq(2) a').length ) {
        var $quickLink3 = $('#menu-footer-menu li:eq(2) a');
        var $thisLinkText3 = $('#menu-footer-menu li:eq(2) a').text().replace(/[^a-z0-9\s]/gi, '').replace(/ /g, '-');
        $quickLink3.prop('id', $thisLinkText3);
    }

    if ( $('#menu-footer-menu li:eq(3) a').length ) {
        var $quickLink4 = $('#menu-footer-menu li:eq(3) a');
        var $thisLinkText4 = $('#menu-footer-menu li:eq(3) a').text().replace(/[^a-z0-9\s]/gi, '').replace(/ /g, '-');
        $quickLink4.prop('id', $thisLinkText4);
    }

    if ( $('#menu-footer-menu li:eq(4) a').length ) {
        var $quickLink5 = $('#menu-footer-menu li:eq(4) a');
        var $thisLinkText5 = $('#menu-footer-menu li:eq(4) a').text().replace(/[^a-z0-9\s]/gi, '').replace(/ /g, '-');
        $quickLink5.prop('id', $thisLinkText5);
    }

    // Insert the Hero Section Background Image into the Content for Social Sharing
    if ( $( 'body' ).hasClass('single-post') ) {
        var $bg = $( '.hero-section' ).css( 'background-image' );
        var $bgImg = $bg.replace( 'url(','' ).replace( /"/g, '' ).split( "?" )[0];
        if ( $( 'article.type-post' ).hasClass( 'has-post-thumbnail' ) ) {
            $( 'article.has-post-thumbnail > .entry-content' ).prepend( '<img aria-hidden=\"true\" src=\"' + $bgImg + '\">' );
        }
    }

})(jQuery);
