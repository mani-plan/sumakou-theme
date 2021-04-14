<?php get_header(); ?>

<div class="main-img-area works" id="pagetop">
  <p class="page-title">施工事例</p>
</div><!-- /.main-img-area -->

<div class="page inner narrow">
<?php if(have_posts()): while(have_posts()): the_post(); ?>
<article>
<section>
  <header class="entry-hdr">
    <p class="cat"><?php
        $terms = get_the_terms($post->ID,'workscat');
        foreach( $terms as $term ) {
          echo '<a href="'.get_term_link($term->slug, 'workscat').'">'.$term->name.'</a>';
        }
        ?></p>
<?php
  $taxonomy_slug = 'workstag';
  $category_terms = wp_get_object_terms($post->ID, $taxonomy_slug);
  if(!empty($category_terms)){
    if(!is_wp_error($category_terms)){
      echo '<p class="addition">';
      foreach($category_terms as $category_term){
        echo '#<a href="'.get_term_link($category_term->slug, $taxonomy_slug).'">'.$category_term->name.'</a>&nbsp;&nbsp;';
      }
      echo '</p>';
    }
  }
?>
    <h1 class="entry-title"><?php the_title(); ?><span><?php the_field('works_name'); ?></span></h1>
    <p class="works-info">
      <?php if(get_field('works_location')): ?>
        <i class="fas fa-map-marker-alt"></i><?php the_field('works_location'); ?>　
      <?php endif; ?>
      <?php if(get_field('works_finish')): ?>
        <i class="far fa-calendar"></i><?php the_field('works_finish'); ?>
      <?php endif; ?>
    </p>
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

<div class="btn tac"><a href="<?php echo esc_url(home_url('/works')); ?>">一覧に戻る</a></div>

<?php endwhile; endif; ?>

</div><!-- /.page -->



<?php get_footer(); ?>