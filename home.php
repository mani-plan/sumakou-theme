<?php get_header(); ?>

<div class="main-img-area blog" id="pagetop">
  <h1 class="page-title">ブログ</h1>
</div><!-- /.main-img-area -->

<div class="page inner">

<ul class="top-cat-list">
  <li class="current-cat"><a href="<?php echo esc_url(home_url('/blog')); ?>">全て</a></li>
  <?php wp_list_categories('orderby=ID&title_li='); ?>
</ul><!-- /.top-cat-list -->

<div class="side-list">
  <button class="btn-open-list">年別アーカイブ</button>
  <ul class="monthly-archive">
    <?php wp_get_archives('type=yearly&show_post_count=1'); ?>
  </ul>
</div><!-- /.side-list -->

<h2 class="cont-title sub">全て</h2>

<?php if(have_posts()): ?>
<ul class="post-list">
<?php while(have_posts()): the_post(); ?>
  <li class="fadein"><a href="<?php the_permalink(); ?>">
    <div class="thumb-area">
      <?php if(has_post_thumbnail()) : ?>
        <?php the_post_thumbnail(); ?>
      <?php else : ?>
        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/thumb_default.png" alt="noimage">
      <?php endif; ?>
      <p class="cat"><?php $category = get_the_category(); 
                if ( $category[0] ) { echo $category[0]->cat_name; } ?></p>
    </div>
    <h3><?php the_title(); ?></h3>
    <p class="addition"><?php the_time('Y/m/d'); ?></p>
  </a></li>
<?php endwhile; ?>
</ul><!-- /.post-list -->

<?php else: ?>

  <p>まだ記事がありません。</p>

<?php endif; ?>

<?php get_template_part('pagination'); ?>


</div><!-- /.page -->



<?php get_footer(); ?>