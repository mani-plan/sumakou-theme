<!DOCTYPE html>
<html lang="ja">
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo GTAG_ID?>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '<?php echo GTAG_ID?>');
</script>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <?php wp_head(); ?>
</head>
<body>
  <?php if(is_front_page()):?>
    <?php get_template_part( 'template-parts/top', 'mv' ); ?>
  <?php endif; ?>
<header id="header"<?php if(is_front_page()){ echo ' class="toppage"';} ?>>
  <div class="logo-hdr"><a href="<?php echo esc_url(home_url('/')); ?>"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/logo_hdr.svg" alt="株式会社住まい工房まつやま"></a></div>
  <div class="contact-hdr"><a href="<?php echo esc_url(home_url('/contact')); ?>"><span>お問い合わせ・ご相談</span></a></div>
  <div class="btn-menu"></div>
  <div class="nav-hdr-wrap">
    <nav class="nav-hdr inner scroll">
      <ul>
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
            <li class="sp-only tel"><a href="tel:089-904-4325">TEL 089-904-4325</a></li>
            <li class="youtube"><a href="https://www.youtube.com/channel/UCpV1q-gseuFr6IRk_gvli2g" target="_blank"><i class="fab fa-youtube"></i>Youtubeチャンネル</a></li>
            <li class="tw"><a href="https://twitter.com/sumakouMYJ" target="_blank"><i class="fab fa-twitter"></i>Twitter</a></li>
          </ul></li>
      </ul>
    </nav>
  </div>
</header><!-- /#header -->