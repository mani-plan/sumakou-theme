<?php
/**
 * The template for displaying archive estates
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 */

get_header(); ?>

<?php
$estate_cat = array();
if ( isset( $_GET['estate_cat'] ) ) {
  $estate_cat = $_GET['estate_cat'];
};
?>

<div class="main-img-area owned-property" id="pagetop">
	<h1 class="page-title">会社案内</h1>
</div><!-- /.main-img-area -->

<div class="page">

  <section class="section">

    <h2 class="cont-title">自社所有物件</h2>

    <ul class="type-icon inner">
      <li><img src="<?php echo esc_url( get_template_directory_uri() );?>/images/ico_single.png"
        alt="一戸建て" class="imghalf">…戸建て</li>
      <li><img src="<?php echo esc_url( get_template_directory_uri() );?>/images/ico_apartment.png"
        alt="アパート" class="imghalf">…アパート</li>
    </ul>

    <?php
      $args = $mani_estate_map->mani_estate_query( $estate_cat );
      $the_query = new WP_Query($args);
    ?>
    <?php get_template_part( 'template-parts/estate', 'map', $the_query ); ?>

  </section><!-- /.section -->

  <?php get_template_part( 'template-parts/estate', 'search', $estate_cat ); ?>

  <?php if ( $the_query->have_posts() ) : ?>
    <?php get_template_part( 'template-parts/estate', 'list', $the_query ); ?>
  <?php else: ?>
    <p class="inner tac">ご指定の条件の物件が見つかりません。<br>
    検索条件を変えてお試しください。</p>
  <?php endif; ?>

</div><!-- /.page -->

<?php
get_sidebar();
get_footer();
