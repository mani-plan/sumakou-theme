<?php
/**
 * The template for estate search form
 */
?>
<?php $estate_cat = $args;?>

<div class="refined-search inner narrow">
  <h3 class="cont-title sub">絞り込み検索</h3>

  <form role="search" method="get" action="<?php echo esc_url(home_url('/estate')); ?>">
    <ul class="type-icon inner">
      <li>
        <input type="checkbox" name="estate_cat[]" value="house"
          <?php if (in_array( 'house', $estate_cat )) echo "checked"; ?>>
        <img src="<?php echo esc_url( get_template_directory_uri() );?>/images/ico_single.png"
          alt="一戸建て" class="imghalf">…戸建て
      </li>
      <li>
        <input type="checkbox" name="estate_cat[]" value="apartment"
          <?php if (in_array( 'apartment', $estate_cat )) echo "checked"; ?>>
        <img src="<?php echo esc_url( get_template_directory_uri() );?>/images/ico_apartment.png"
          alt="アパート" class="imghalf">…アパート
      </li>
      <li>
        <input type="checkbox" name="estate_cat[]" value="solar"
          <?php if (in_array( 'solar', $estate_cat )) echo "checked"; ?>>
        <img src="<?php echo esc_url( get_template_directory_uri() );?>/images/ico_solar.png"
          alt="太陽光発電" class="imghalf">…太陽光発電
      </li>
    </ul>
      <!--<p class="tac">
        <input type="checkbox" name="estate_cat[]" value="sold"
          <?php if (in_array( 'sold', $estate_cat )) echo "checked"; ?>>
        <img src="<?php echo esc_url( get_template_directory_uri() )?>/images/ico_sold.png"
          alt="売却済み" class="imghalf">…売却済みを表示する
      </p>-->
    <div class="btn"><input type="submit" value="検索する"></div>
  </form>
</div>
