<?php $acf_post_objects = get_field('related_entry'); if( $acf_post_objects ): ?>
<div class="related-entry fadein">
  <h3>関連記事</h3>
  <ul class="related-entry-list">
    <?php foreach( $acf_post_objects as $acf_post_object):
        $permalink = get_permalink( $acf_post_object->ID );
        $post_thumbnail = get_the_post_thumbnail( $acf_post_object->ID );
        $title = get_the_title( $acf_post_object->ID );
        $post_type = get_post_type($acf_post_object->ID);
        $terms_blog = get_the_terms($acf_post_object->ID,'category');
        $terms_works = get_the_terms($acf_post_object->ID,'workscat');
        $date = get_the_date( '' , $acf_post_object->ID );
        $works_name = get_field( 'works_name', $acf_post_object->ID );
     ?>

    <?php if($post_type == 'post'): ?>

    <li><a href="<?php echo esc_url( $permalink ); ?>">
      <div class="image">
        <?php if ( has_post_thumbnail($acf_post_object->ID)): ?>
        <?php echo $post_thumbnail; ?>
        <?php else: ?>
        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/thumb_default.png" alt="noimage" class="noimage">
        <?php endif; ?>
      </div>
      <div class="text">
        <p class="cat"><?php foreach( $terms_blog as $term ) { echo '<span>'.$term->name.'</span>';} ?>／ブログ</p>
        <h4><?php echo esc_html( $title ); ?></h4>
        <p class="addition"><?php echo $date; ?></p>
      </div>
    </a></li>

    <?php else: ?>

    <li><a href="<?php echo esc_url( $permalink ); ?>">
      <div class="image">
        <?php if ( has_post_thumbnail($acf_post_object->ID)): ?>
        <?php echo $post_thumbnail; ?>
        <?php else: ?>
        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/thumb_default.png" alt="noimage" class="noimage">
        <?php endif; ?>
      </div>
      <div class="text">
        <p class="cat"><?php foreach( $terms_works as $term ) { echo '<span>'.$term->name.'</span>';} ?>／施工事例</p>
        <h4><?php echo esc_html( $title ); ?></h4>
        <p class="addition"><?php echo esc_html( $works_name ); ?></p>
      </div>
    </a></li>

    <?php endif; ?>


    <?php endforeach; // ループの終了 ?>
  </ul>
</div><!-- /.related-entry -->
<?php endif;?>