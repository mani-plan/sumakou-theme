<footer>
  <div class="contact-ftr">
    <div class="inner">
      <div class="btn btn-contact"><a href="<?php echo esc_url(home_url('/contact')); ?>">お問い合わせ・<br class="sp-only">ご来社予約フォーム</a></div>
      <p>お電話でのお問い合わせ</p>
      <p><a href="tel:089-904-4325">089-904-4325</a></p>
    </div>
  </div><!-- /.contect-ftr -->
  <div class="inner">
  <nav class="nav-ftr">
    <ul class="fb">
      <li><a href="<?php echo esc_url(home_url('/')); ?>">トップページ</a></li>
      <li><a href="<?php echo esc_url(home_url('/concept')); ?>">私たちの家づくり</a></li>
      <li><a href="<?php echo esc_url(home_url('/works')); ?>">施工事例</a>
        <ul>
          <?php wp_list_categories('orderby=ID&title_li=&taxonomy=workscat'); ?>
        </ul></li>
      <li><a href="<?php echo esc_url(home_url('/company')); ?>">会社案内</a>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/company#service')); ?>">事業内容</a></li>
          <li><a href="<?php echo esc_url(home_url('/company#about')); ?>">会社概要</a></li>
          <li><a href="<?php echo esc_url(home_url('/company#access')); ?>">アクセス</a></li>
          <li><a href="<?php echo esc_url(home_url('/solardata')); ?>">太陽光発電実績</a></li>
          <li><a href="<?php echo esc_url(home_url('/estate')); ?>">自社所有物件</a></li>
          <li><a href="<?php echo esc_url(home_url('/target')); ?>">弊社の目標</a></li>
        </ul></li>
      <li><a href="<?php echo esc_url(home_url('/blog')); ?>">ブログ</a>
        <ul>
          <?php wp_list_categories('hide_empty=0&orderby=ID&title_li='); ?>
        </ul></li>
      <li><a href="<?php echo esc_url(home_url('/contact')); ?>">お問い合わせ・ご来社予約</a>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/contact#calender')); ?>">営業カレンダー</a></li>
          <li class="youtube"><a href="https://www.youtube.com/channel/UCpV1q-gseuFr6IRk_gvli2g" target="_blank"><i class="fab fa-youtube"></i>Youtubeチャンネル</a></li>
          <li class="tw"><a href="https://twitter.com/sumakouMYJ" target="_blank"><i class="fab fa-twitter"></i>Twitter</a></li>
        </ul></li>
    </ul>
  </nav><!-- /.nav-ftr -->

  <div class="pagetop">
    <p><span>ページの<br>先頭へ↑</span></p>
    <a href="#pagetop"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/illu_pagetop.png" alt="ページの先頭へ"></a>
  </div>

  <div class="ftr-info">
    <h2><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/logo_ftr.svg" alt="株式会社住まい工房まつやま"></h2>
    <p>本社：〒791-8006　愛媛県松山市安城寺町1136番地1</p>
    <p>事務所：〒791-8013　愛媛県松山市山越6丁目6-8</p>
  </div>
  <p class="copyright">&copy; 2020 Sumaikoubou matsuyama.</p>
  </div><!-- /.inner -->
</footer>

<?php if(is_front_page()): ?>
  <script type="text/javascript">
    jQuery('.cover,.mv-area,.mv-images .img').css('height',jQuery(window).height());
  </script>
  <script type="text/javascript">
    jQuery(document).ready(function(){
      jQuery('.mv-images').slick({
        autoplay: true,
        fade: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: false
      });
    });
  </script>
  <script type="text/javascript">
    jQuery(document).ready(function(){
      jQuery('.top-info-list').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        vertical: true
      });
    });
  </script>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>