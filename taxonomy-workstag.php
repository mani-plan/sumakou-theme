<?php get_header(); ?>

<div class="main-img-area works" id="pagetop">
  <h1 class="page-title">施工事例</h1>
</div><!-- /.main-img-area -->

<div class="page inner">

<ul class="top-cat-list">
  <li><a href="<?php echo esc_url(home_url('/works')); ?>">全て</a></li>
  <?php wp_list_categories('orderby=ID&title_li=&taxonomy=workscat'); ?>
</ul><!-- /.top-cat-list -->

<div class="side-list">
  <button class="btn-open-list">タグ検索</button>
  <ul class="monthly-archive">
    <?php
    $term_list = get_terms('workstag');
    $result_list = [];
    foreach ($term_list as $term) {
    $u = (get_term_link( $term, 'workstag' ));
    echo "<li><a href='".$u."'>#".$term->name."&nbsp;(".$term->count.")</a></li>";
    }
    ?>
  </ul>
</div><!-- /.side-list -->

<h2 class="cont-title sub"><?php single_term_title(); ?></h2>
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

<?php else: ?>

  <p>まだ記事がありません。</p>

<?php endif; ?>

<?php get_template_part('pagination'); ?>


</div><!-- /.page -->



<?php get_footer(); ?>