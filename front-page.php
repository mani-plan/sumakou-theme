<?php
/*
Template Name: FrontPage
*/
?>

<?php get_header(); ?>

<div class="top-info-area inner" id="top-info">
  <h2>お知らせ</h2>

<?php
  $args = array(
    'post_type' => 'post',
    'category_name' => 'information',
    'posts_per_page' => 5
  );
  $the_query = new WP_Query($args); if($the_query->have_posts()):
?>
<ul class="top-info-list">
<?php while ($the_query->have_posts()): $the_query->the_post(); ?>
    <li><?php the_time('Y/m/d'); ?>　<a href="<?php the_permalink(); ?>"><?php echo wp_trim_words( get_the_title(), 25, '...' ); ?></a></li>
<?php endwhile; ?>
</ul>
    <?php wp_reset_postdata(); ?>
<?php endif; ?>

  <div class="link-more"><i class="far fa-bell"></i><a href="<?php echo esc_url(home_url('/blog')); ?>">すべてのお知らせを見る</a></div>
</div><!-- /.top-info-area -->

<div class="top-concept-area">
  <div class="top-concept-text">
    <div class="top-concept-inner">
      <h3>私たちの家づくり</h3>
        <p>私たち住まい工房まつやまでは、お客様の意見を重視した、納得出来る住まい作りができるよう、お話をたくさんいたします。<br>
        最適な材料と工法、設備を用いてオンリーワンの一軒にいたします。</p>
      </div>
    <div class="btn"><a href="<?php echo esc_url(home_url('/concept')); ?>">詳しく見る</a></div>
  </div>
</div><!-- /.top-concept-area -->


<div class="top-works-area">

<h2 class="cont-title">施工事例</h2>


<?php
  $args = array(
    'post_type' => 'works',
    'posts_per_page' => 6
  );
  $the_query = new WP_Query($args); if($the_query->have_posts()):
?>
<ul class="post-list inner">
<?php while ($the_query->have_posts()): $the_query->the_post(); ?>
  <li class="fadein"><a href="<?php the_permalink(); ?>">
    <div class="thumb-area">
      <?php if(has_post_thumbnail()) : ?>
        <?php the_post_thumbnail(); ?>
      <?php else : ?>
        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/thumb_default.png" alt="noimage">
      <?php endif; ?>
      <p class="cat"><?php
            $terms = get_the_terms($post->ID,'workscat');
            foreach( $terms as $term ) {
            echo $term->name;
            }
            ?></p>
    </div>
    <h3><?php the_title(); ?></h3>
    <?php if(get_field('works_name')): ?>
    <p class="addition"><?php the_field('works_name'); ?></p>
    <?php endif; ?>
  </a>
<?php
  $taxonomy_slug = 'workstag';
  $category_terms = wp_get_object_terms($post->ID, $taxonomy_slug);
  if(!empty($category_terms)){
    if(!is_wp_error($category_terms)){
      echo '<p class="addition tag">';
      foreach($category_terms as $category_term){
        echo '<span><a href="'.get_term_link($category_term->slug, $taxonomy_slug).'">'.$category_term->name.'</a></span>';
      }
      echo '</p>';
    }
  }
?>
</li>
<?php endwhile; ?>
</ul><!-- /.post-list -->
    <?php wp_reset_postdata(); ?>
<?php endif; ?>

<div class="btn tac inner"><a href="<?php echo esc_url(home_url('/works')); ?>">もっと見る</a></div>

</div><!-- /.top-works-area -->

<div class="top-blog-area">

<h2 class="cont-title">ブログ</h2>

<div class="top-blog-cat inner">
  カテゴリー：
<?php
$args = array(
  'orderby' => 'ID'
  );
$categories = get_categories( $args );
foreach ( $categories as $category ) {
    echo '<span><a href="' . get_category_link( $category->term_id ) . '">' . $category->name . '</a></span>';
}
?>
</div>

<?php
  $args = array(
    'post_type' => 'post',
    // 'category__not_in' => 1,
    'posts_per_page' => 3
  );
  $the_query = new WP_Query($args); if($the_query->have_posts()):
?>
<ul class="post-list inner">
<?php while ($the_query->have_posts()): $the_query->the_post(); ?>
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
    <?php wp_reset_postdata(); ?>
<?php endif; ?>

<div class="btn tac inner"><a href="<?php echo esc_url(home_url('/blog')); ?>">もっと見る</a></div>

</div><!-- /.top-blog-area -->

<?php get_footer(); ?>