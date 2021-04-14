<?php

add_theme_support( 'title-tag' );

//style script 読み込み
define("DIRE", get_template_directory_uri());
function add_files(){
    wp_enqueue_style('googlefont_style','//fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
    wp_enqueue_style('reset_style',DIRE.'/css/reset.css');
    wp_enqueue_style('all_style',DIRE.'/css/all.css');
    wp_enqueue_style('my_style',DIRE.'/css/style.css');

    if(is_front_page()) {
      wp_enqueue_style('slick_style','https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
      wp_enqueue_script('slick_script','https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', array('jquery'), true);
    }

    wp_enqueue_script('my_script',DIRE.'/js/common.js', array('jquery'), true);
}
add_action('wp_enqueue_scripts', 'add_files');

// post-thumbnail
add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size(400, 267, true );
add_image_size( 'estate-thumb', 60, 60, true );


/*【出力カスタマイズ】年別アーカイブリストに年を表示する */
function filter_to_archives_link( $link_html, $url, $text, $format, $before, $after ) {
  if ( 'html' === $format ) {
    $link_html = "<li>$before<a href='$url'>$text"."年"."$after</a></li>";
  }
  return $link_html;
}
add_filter('get_archives_link', 'filter_to_archives_link', 10, 6 );


/**
 * https://qiita.com/sutty/items/a9a711bddb82069d37d6
 */
if (!function_exists( 'mani_estate_acf_google_map_api' ) ) {
  function mani_estate_acf_google_map_api( $api ) {
    $api['key'] = GMAP_API_KEY;
    return $api;
  }
  add_filter('acf/fields/google_map/api', 'mani_estate_acf_google_map_api');
}

if (!function_exists( 'mani_estate_css' ) ) {
  function mani_estate_css() {
    wp_enqueue_style( 'mani-estate-style', get_stylesheet_uri() );
  }
  add_action( 'wp_enqueue_scripts', 'mani_estate_css' );
}

if (!function_exists( 'mani_estate_scripts' ) ) {
  function mani_estate_scripts() {
    wp_enqueue_script( 
      'googlemap-script',
      get_theme_file_uri( '/js/googlemap.js' ),
      array(),
      filemtime( get_theme_file_path( '/js/googlemap.js' ) ),
      true
    );
    wp_enqueue_script(
      'googlemapsapi',
      '//maps.googleapis.com/maps/api/js?key=' . GMAP_API_KEY,
      array(),
      '',
      true
    );
  }
  add_action('wp_enqueue_scripts', 'mani_estate_scripts');
}



// works
function cptui_register_my_cpts() {

  /**
   * Post Type: 施工事例.
   */

  $labels = [
    "name" => __( "施工事例", "sumakou-theme" ),
    "singular_name" => __( "施工事例", "sumakou-theme" ),
  ];

  $args = [
    "label" => __( "施工事例", "sumakou-theme" ),
    "labels" => $labels,
    "description" => "",
    "public" => true,
    "publicly_queryable" => true,
    "show_ui" => true,
    "show_in_rest" => true,
    "rest_base" => "",
    "rest_controller_class" => "WP_REST_Posts_Controller",
    "has_archive" => true,
    "show_in_menu" => true,
    "show_in_nav_menus" => true,
    "delete_with_user" => false,
    "exclude_from_search" => false,
    "capability_type" => "post",
    "map_meta_cap" => true,
    "hierarchical" => false,
    "rewrite" => [ "slug" => "works", "with_front" => true ],
    "query_var" => true,
    "menu_position" => 5,
    "menu_icon" => "dashicons-hammer",
    "supports" => [ "title", "editor", "thumbnail" ],
  ];

  register_post_type( "works", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );

function cptui_register_my_taxes() {

  /**
   * Taxonomy: 施工事例のカテゴリー.
   */

  $labels = [
    "name" => __( "施工事例のカテゴリー", "sumakou-theme" ),
    "singular_name" => __( "施工事例のカテゴリー", "sumakou-theme" ),
  ];

  $args = [
    "label" => __( "施工事例のカテゴリー", "sumakou-theme" ),
    "labels" => $labels,
    "public" => true,
    "publicly_queryable" => true,
    "hierarchical" => true,
    "show_ui" => true,
    "show_in_menu" => true,
    "show_in_nav_menus" => true,
    "query_var" => true,
    "rewrite" => [ 'slug' => 'workscat', 'with_front' => true, ],
    "show_admin_column" => false,
    "show_in_rest" => true,
    "rest_base" => "workscat",
    "rest_controller_class" => "WP_REST_Terms_Controller",
    "show_in_quick_edit" => false,
      ];
  register_taxonomy( "workscat", [ "works" ], $args );

  /**
   * Taxonomy: 施工事例のタグ.
   */

  $labels = [
    "name" => __( "施工事例のタグ", "sumakou-theme" ),
    "singular_name" => __( "施工事例のタグ", "sumakou-theme" ),
  ];

  $args = [
    "label" => __( "施工事例のタグ", "sumakou-theme" ),
    "labels" => $labels,
    "public" => true,
    "publicly_queryable" => true,
    "hierarchical" => false,
    "show_ui" => true,
    "show_in_menu" => true,
    "show_in_nav_menus" => true,
    "query_var" => true,
    "rewrite" => [ 'slug' => 'workstag', 'with_front' => true, ],
    "show_admin_column" => false,
    "show_in_rest" => true,
    "rest_base" => "workstag",
    "rest_controller_class" => "WP_REST_Terms_Controller",
    "show_in_quick_edit" => false,
      ];
  register_taxonomy( "workstag", [ "works" ], $args );
}
add_action( 'init', 'cptui_register_my_taxes' );


  /**
   * OGPタグ/Twitterカード設定を出力
   */
function my_meta_ogp() {
  if( is_front_page() || is_home() || is_singular() ){
    global $post;
    $ogp_title = '';
    $ogp_descr = '';
    $ogp_url = '';
    $ogp_img = '';
    $insert = '';

    if( is_singular() ) { //記事＆固定ページ
       setup_postdata($post);
       $ogp_title = $post->post_title;
       $ogp_descr = mb_substr(get_the_excerpt(), 0, 100);
       $ogp_url = get_permalink();
       wp_reset_postdata();
    } elseif ( is_front_page() || is_home() ) { //トップページ
       $ogp_title = get_bloginfo('name');
       $ogp_descr = get_bloginfo('description');
       $ogp_url = home_url();
    }

    //og:type
    $ogp_type = ( is_front_page() || is_home() ) ? 'website' : 'article';

    //og:image
    if ( is_singular() && has_post_thumbnail() ) {
       $ps_thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full');
       $ogp_img = $ps_thumb[0];
    } else {
     $ogp_img = 'https://sumakou.jp/wp-content/themes/sumakou-theme/images/ogp.png';
    }

    //出力するOGPタグをまとめる
    $insert .= '<meta property="og:title" content="'.esc_attr($ogp_title).'" />' . "\n";
    $insert .= '<meta property="og:description" content="'.esc_attr($ogp_descr).'" />' . "\n";
    $insert .= '<meta property="og:type" content="'.$ogp_type.'" />' . "\n";
    $insert .= '<meta property="og:url" content="'.esc_url($ogp_url).'" />' . "\n";
    $insert .= '<meta property="og:image" content="'.esc_url($ogp_img).'" />' . "\n";
    $insert .= '<meta property="og:site_name" content="'.esc_attr(get_bloginfo('name')).'" />' . "\n";
    $insert .= '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    $insert .= '<meta name="twitter:site" content="sumakouMYJ" />' . "\n";
    $insert .= '<meta property="og:locale" content="ja_JP" />' . "\n";

    echo $insert;
  }
} //END my_meta_ogp

add_action('wp_head','my_meta_ogp');//headにOGPを出力

