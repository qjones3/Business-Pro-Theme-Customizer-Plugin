<?php
/**
 * Plugin Name: Genesis Business Pro Theme Customizer
 * Description: Genesis Business Pro child theme customizer built as a plugin.
 * Author: Quinton Jones
 * Author URI: https://github.com/qjones3
 * Version: 1.0
 *
 * Custom functions for the Genesis Business Pro child theme
 *
 * This file includes custom functions for the Genesis Business Pro child theme.
 *
 * @since 0.0.1
 * @package BusinessProTheme
 *
 */

if( ! defined('ABSPATH') ) {
    die; // Exit if accessed directly.
}

// Adds custom Favicon
function custom_favicon( $favicon_url ) {
	return '/favicon.png';
}
add_filter( 'genesis_pre_load_favicon', 'custom_favicon' );

// Enqueue new stylesheets
function customizer_add_styles() {
	wp_register_style( 'customizer-styles', plugins_url( 'css/customizer-styles.css', __FILE__ ), array(), '1.0' );
	wp_enqueue_style( 'customizer-styles' );
	wp_register_style( 'customizer-print-styles', plugins_url( 'css/print-styles.css', __FILE__ ), array(), '1.0' );
	wp_enqueue_style( 'customizer-print-styles' );
}
add_action( 'wp_print_styles', 'customizer_add_styles' );

// Enqueue new scripts
function customizer_add_scripts() {
	wp_dequeue_script( CHILD_THEME_HANDLE, get_stylesheet_directory_uri() . "/assets/scripts{$directory}/business-pro{$suffix}.js", array( 'jquery' ), CHILD_THEME_VERSION, true );
	wp_register_script( 'customizer-script', plugins_url( 'js/customizer-scripts.js', __FILE__ ), array( 'jquery' ), '1.0', true);
	wp_enqueue_script( 'customizer-script' );
}
add_action( 'wp_print_scripts', 'customizer_add_scripts' );

// REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// replace WordPress Howdy in WordPress 3.3
function replace_howdy( $wp_admin_bar ) {
    $my_account=$wp_admin_bar->get_node('my-account');
    $newtitle = str_replace( 'Howdy,', 'Logged in as: ', $my_account->title );
    $wp_admin_bar->add_node( array(
        'id' => 'my-account',
        'title' => $newtitle,
    ) );
}
add_filter( 'admin_bar_menu', 'replace_howdy',25 );

//* Modify the Genesis content limit read more link
add_filter( 'get_the_content_more_link', 'sp_read_more_link' );
function sp_read_more_link() {
	return '... <small><a class="more-link" href="' . get_permalink() . '" title="Read more about ' .get_the_title() . '">Read More &raquo;</a></small>';
}

// Add Google Tag Manager Script to Body
function google_tag_manager_body() {
if ( current_filter() == 'genesis_before' )
?>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M746VNB" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<?php
}
add_action( 'genesis_before', 'google_tag_manager_body' );
