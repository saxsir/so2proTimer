/*!
 * so2proTimer script v1.0.0
 *
 * Copyright 2013 saxsir
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * If you are interested in programming, please come and join hhlab!!
 * http://www.sfc.keio.ac.jp/introducing_labs/20110712.html
 *
 * Date: 2013-10-29
 */
(function(d) {
  //@todo: 複数イベントを綺麗に整理できるように管理オブジェクトと締め切りオブジェクトをつくる

  // 2014/1/19 23:59:59まで
  var startTime = new Date(2014, 3, 1, 0, 0, 0),
    deadline = new Date(2015, 0, 20, 23, 59, 59),
    allTerm = ((deadline - startTime) / 1000) | 0,
    days = d.getElementById('days'),
    hours = d.getElementById('hours'),
    minitutes = d.getElementById('minitues'),
    seconds = d.getElementById('seconds'),
    progressBar = d.getElementById('remaining');

  function getRemainingTime(_deadline) {
    var now = new Date(),
      remainingTime = ((_deadline - now) / 1000) | 0,
      rtDay = (remainingTime / (60 * 60 * 24)) | 0,
      rtHour = ((remainingTime - rtDay * 24 * 60 * 60) / (60 * 60)) | 0,
      rtMin = ((remainingTime - (rtDay * 24 * 60 * 60) - (rtHour * 60 * 60)) / 60) | 0,
      rtSec = (remainingTime - (rtDay * 24 * 60 * 60) - (rtHour * 60 * 60) - (rtMin * 60));
    return {
      rt: remainingTime,
      day: rtDay < 10 ? '0' + rtDay : rtDay,
      hour: rtHour < 10 ? '0' + rtHour : rtHour,
      min: rtMin < 10 ? '0' + rtMin : rtMin,
      sec: rtSec < 10 ? '0' + rtSec : rtSec,
      rate: remainingTime / allTerm
    };
  }

  function updateWindow() {
    var rt = getRemainingTime(deadline);
    // 残り時間を更新
    days.innerHTML = rt.day;
    hours.innerHTML = rt.hour;
    minitues.innerHTML = rt.min;
    seconds.innerHTML = rt.sec;
    // プログレスバーを更新
    progressBar.style.width = rt.rate * 100 + '%';
    if (rt.rate < 0.1) {
      progressBar.className += ' progress-bar-danger';
    }
  }

  //updateWindow();
  var timer = setInterval(updateWindow, 1000);
}(document));
