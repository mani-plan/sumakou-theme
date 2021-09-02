<?php get_header(); ?>

<div class="main-img-area blog" id="pagetop">
  <p class="page-title">ブログ</p>
</div><!-- /.main-img-area -->

<div class="page inner narrow">
<?php if (have_posts()): while(have_posts()): the_post(); ?>
<article>
<section>
  <header class="entry-hdr">
    <p class="cat">
      <?php $category = get_the_category();
      if (isset($category[0])) {
        echo '<a href="' . get_category_link( $category[0]->term_id ) . '">' . $category[0]->cat_name . '</a>';
      } ?></p>
    <p class="addition"><?php the_time('Y/m/d'); ?></p>
    <h1 class="entry-title"><?php the_title(); ?></h1>
  </header><!-- /.entry-hdr -->

<div class="entry-body">

<?php the_content(); ?>

</div><!-- /.entry-body -->

<?php get_template_part('related','entry'); ?>

</section>  
</article>


<ul class="page-link">
<?php if (get_next_post()):?>
  <li><span class="arw-next">＜</span><?php next_post_link('%link'); ?></li>
<?php endif; ?>
<?php if (get_previous_post()):?>
  <li><?php previous_post_link('%link'); ?><span class="arw-prev">＞</span></li>
<?php endif; ?>
</ul>

<div class="btn tac"><a href="<?php echo esc_url(home_url('/blog')); ?>">一覧に戻る</a></div>

<?php endwhile; endif; ?>

</div><!-- /.page -->



<?php get_footer(); ?>