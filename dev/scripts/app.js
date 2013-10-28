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
  var startTime = new Date(2013, 3, 1, 0, 0, 0),
    deadline = new Date(2014, 0, 19, 23, 59, 59),
    allTerm = ((deadline - startTime) / 1000) | 0,
    clock = d.getElementById('clock'),
    leftBar = d.getElementById('elapsed'),
    rightBar = d.getElementById('remaining');

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
    };
  }

  function updateWindow() {
    var rt = getRemainingTime(deadline);
    // 残り時間を更新
    clock.innerHTML = rt.day + '日と' + rt.hour + '時間' + rt.min + '分' + rt.sec + '秒';
    // プログレスバーを更新
    leftBar.style.width = (((allTerm - rt.rt) / allTerm) * 100) + '%';
    rightBar.style.width = ((rt.rt / allTerm) * 100) + '%';
  }

  //updateWindow();
  var timer = setInterval(updateWindow, 1000);
}(document));
