<?php
/**
 * The template for estate list
 */
?>
<?php $the_query = $args;?>

<ul class="owned-property-list inner">
  <?php
  while ( $the_query->have_posts() ) : $the_query->the_post();

    $location = get_field('location');
    $terms = get_the_terms($post->ID, 'estate_cat');
    $liclass = '';
    $slugs = array();
    foreach( $terms as $term ) {
      if ( in_array( $term->slug, array('sold', 'solar') ) ) {
        $slugs[] = $term->slug;
      }
    }
    if ( count( $slugs ) > 0 ) {
      $liclass = 'class="' . implode( ' ', $slugs ) . '"';
    }
    $thumbnail = get_the_post_thumbnail($post->ID, array(60, 60));
    if (is_null($thumbnail) || $thumbnail === '') {
      $thumbnail = '<img src="'
                . get_template_directory_uri()
                . '/images/dummy_property_thumb.png" alt="">';
    }
    ?>
    <li <?php echo $liclass;?>><a href="<?php the_field('link'); ?>">
      <div class="image">
        <?php echo $thumbnail;?>
      </div>
      <div class="text">
      <?php the_title();?>
      <p>
        <?php echo $location['address'];?>
      </p>
      </div>
    </a></li>
    <?php

  endwhile;
  wp_reset_postdata();
  ?>
</ul>