<?php get_header(); ?>
<?php if(have_posts()): while(have_posts()): the_post(); ?>
<?php $slug = $post->post_name; ?>
<div class="main-img-area <?php echo $slug; ?>" style="background-image: url(<?php if ( has_post_thumbnail() ) {
	$image_id = get_post_thumbnail_id ();
	$image_url = wp_get_attachment_image_src ($image_id, true);
	echo $image_url[0];
} else {
	echo get_bloginfo( 'template_directory' ) . '/images/main_company.jpg';
} ?>);" id="pagetop">
  <h1 class="page-title"><?php the_title(); ?></h1>
</div><!-- /.main-img-area -->

<div class="page inner">

<div class="entry-body">

<?php the_content(); ?>

</div><!-- /.entry-body -->

</div><!-- /.page -->

<?php endwhile; endif; ?>

<?php get_footer(); ?>