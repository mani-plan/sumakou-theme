<?php
/*
Template Name: ChartPage
*/
?>

<?php get_header(); ?>
<?php
if (have_posts()) :
    while (have_posts()) :
        the_post();
        $slug = $post->post_name; ?>
<div class="main-img-area <?php echo $slug; ?>"
  style="background-image: url(<?php
    if (has_post_thumbnail()) {
        $image_id = get_post_thumbnail_id();
        $image_url = wp_get_attachment_image_src($image_id, true);
        echo $image_url[0];
    } else {
        echo get_bloginfo('template_directory') . '/images/main_company.jpg';
    }
    ?>);" id="pagetop">
  <h1 class="page-title"><?php the_title();?></h1>
</div><!-- /.main-img-area -->

<div class="page inner">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
    let solarsheet = '<?php echo GDOCS_SOLAR_SHEET;?>';
</script>
  
        <?php the_content(); ?>

</div><!-- /.page -->

        <?php
    endwhile;
endif;
?>

<?php get_footer(); ?>