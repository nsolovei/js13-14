$(function() {
   'use strict;'

   var data = {
      categories: [{
         questionName: "Как найти прошлогодний снег?",
         variant: [{
            answer: 'заглянуть в морозилку в общаге',
            rigth: true
         }, {
            answer: 'утром 1 января',
            rigth: true
         }, {
            answer: 'вернуться в прошлое',
            rigth: false
         }],
         inputName: ['11', '12', '13']
      }, {
         questionName: "Собака-3, Кошка-3, Ослик-2, Рыбка-0. Чему равняется Петушок? И почему? ",
         variant: [{
            answer: '5',
            rigth: false
         }, {
            answer: '10',
            rigth: false
         }, {
            answer: '8',
            rigth: true
         }],
         inputName: ['21', '22', '23']
      }, {
         questionName: "Бизнесмен купил лошадь за 10 долл., продал ее за 20 долл. Потом он купил ТУ ЖЕ САМУЮ ЛОШАДЬ за 30 долл., а продал за 40 долл. Вопрос: каков суммарный доход бизнесмена от этих двух сделок? ",

         variant: [{
            answer: '20$',
            rigth: true
         }, {
            answer: '40$',
            rigth: false
         }, {
            answer: '10$',
            rigth: false
         }],
         inputName: ['31', '32', '33']
      }],
      result: "Проверить мои результаты"
   };
   localStorage.setItem('data', JSON.stringify(data));
   var page = localStorage.getItem('data');
   var myData = JSON.parse(page);
  
   var html = $('#test').html();
   var $body = $('body');

   var content = tmpl(html, {
      data: myData
   });

   $body.append(content);

   //modal window
   var $overlay;
   var $modal = $('.js-modal');
   var $close = $('.js-close');
   var $result = $('.js-result');

   function showModal(e) {
      e.preventDefault();
      $close.one('click', hideModal);

      $overlay = $('<div class="overlay"></div>');
      $body.append($overlay);
      $modal.addClass('show');

      $('.container').each(function() {
         var $that = $(this);
         $that.find('input[type="checkbox"]');
      });

      var rightAnswers = [];
      for (var i = 0; i < myData.categories.length; i++) {
         for (var j = 0; j < myData.categories[i].variant.length; j++) {
            var currentAnswer = myData.categories[i].variant[j].rigth;
            rightAnswers.push(currentAnswer);
         }
      }

      var givenAnswers = [];
      $('input[type="checkbox"]').each(function() {
         if ($(this).prop('checked')) {
            givenAnswers.push(true);
         } else {
            givenAnswers.push(false);
         }
      });

      var result = JSON.stringify(givenAnswers) === JSON.stringify(rightAnswers);
      if (result) {
         $result.text('Отличный результат!')
      } else {
         $result.text('Не правильно, попробуй еще раз.');
         
      }

      $('input[type="checkbox"]').each(function() {
         $(this).removeAttr("checked");
      });

   };

   function hideModal() {
      $overlay.remove();
      $modal.removeClass('show')
   }

   $('.js-verify').on('click', showModal);
});