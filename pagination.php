<ul class="pagination">
<?php $maxpage = $wp_query->max_num_pages;
$current = $paged;
if(!$current) {$current = 1;} ?>

<?php if(!($maxpage==1)): ?>

<?php if( get_previous_posts_link() ) :?>
<li class="previous"><?php previous_posts_link('＜'); ?></li>
<?php endif; ?>

<?php for($i=1; $i <= $maxpage; $i++): ?>
  <?php if($i == $current): ?>
  <li><?php echo $i; ?></li>
  <?php else: ?>
  <li><a href="<?php echo get_pagenum_link($i); ?>"><?php echo $i; ?></a></li>
  <?php endif; ?>
<?php endfor; ?>

<?php if( get_next_posts_link() ) :?>
<li class="next"><?php next_posts_link('＞'); ?></li>
<?php endif; ?>

<?php endif; ?>

</ul>