<?php
/**
 * The template for estate map
 */
?>
<?php $the_query = $args;?>

<div class='map-container'><div class='wrap'><div class='acf-map'>
<?php
  if ( $the_query->have_posts() ) :

  $images = get_stylesheet_directory_uri() . '/images/';

  while ( $the_query->have_posts() ) : $the_query->the_post();

    $location = get_field('location');
    $title = get_the_title();
    $terms = get_the_terms($post->ID, 'estate_cat');

    $slugs = array();
    $excludes = ['sold'];
    foreach( $terms as $term ) {
      if ( in_array( $term->slug, $excludes, true ) ) {
        continue;
      }
      $slugs[] = $term->slug;
    }
    $slugs = array_values($slugs);

    if( !empty($location) ) {
    ?>
    <div
      class="marker"
      data-lat="<?php echo $location['lat'];?>"
      data-lng="<?php echo $location['lng'];?>"
      data-images="<?php echo $images;?>"
      data-icon="<?php
      //  echo $slugs[0];
       global $mani_estate_map;
        $icon = $mani_estate_map->get_map_icon($slugs);
        echo $icon;
       ?>"
      >
      <h4><?php the_title();?></h4>
      <p class="address"><?php echo $location['address'];?></p>
    </div>
    <?php
    }

  endwhile;
  wp_reset_postdata();
else :?>
  <div
    class="marker"
    data-lat="<?php echo '33.8583053';?>"
    data-lng="<?php echo '132.7493833';?>"
    data-iconbase="<?php echo $iconbase;?>"
    data-icon="house"
    >
    <h4>株式会社住まい工房まつやま</h4>
    <p class="address">愛媛県松山市山越6丁目6-8</p>
  </div>
<?php endif;
?>
</div></div></div>
