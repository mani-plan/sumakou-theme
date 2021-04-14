<?php get_header(); ?>

<div class="main-img-area contact" id="pagetop">
  <h1 class="page-title">お問い合わせ</h1>
</div><!-- /.main-img-area -->

<div class="page">

  <section class="section inner narrow">
  <h2 class="cont-title">お問い合わせ・<br class="sp-only">ご来社予約</h2>
  <p class="contact-txt">下記フォームより必要項目をご入力の上お問い合わせください。<br>
    ご来社の予約は、下記の<a href="#calender" class="tdu scroll">営業カレンダー</a>よりスタッフ在社の日時をあらかじめご確認いただけるとスムーズです。<br>
  カレンダーに記載のない日時についてはご相談ください。</p>

  <p class="notice">※全ての項目についてご記入ください。</p>
<?php if(have_posts()): while(have_posts()): the_post(); ?>
  <?php the_content(); ?>
<?php endwhile; endif; ?>
  </section><!-- /.section -->

  <section class="section inner" id="calender">
  <h2 class="cont-title">営業カレンダー</h2>
  <div class="calender">
    <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FTokyo&amp;src=c3VtYWlrb3Vib3VtYXRzdXlhbWFAZ21haWwuY29t&amp;src=bzRiNTU4aWZnMDY4ZnRvNzc4NmM0YmdzZHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=amEuamFwYW5lc2UjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23039BE5&amp;color=%23E67C73&amp;color=%230B8043&amp;title=%E5%96%B6%E6%A5%AD%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC&amp;showTitle=0&amp;showTabs=0&amp;showCalendars=1&amp;showTz=0" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
  </div>
  </section><!-- /.section -->


</div><!-- /.page -->

<?php get_footer(); ?>