/**
 * Created by Administrator on 2017/7/3.
 */
//步数列表
var stepList = {
	step: [5900, 5000, 3000, 2563, 125, 22521, 9632],	//字符串
	barHeight: [],
	stepTop: 20000,
	showingStepIdx: 6,	//显示步数的index
	todayStep: 621,	//今天步数
	date: [24, 25, 26, 27, 28, 29, 30]	//字符串
};
/*	设置图表
 * */
function setGraph($el) {
	var $step = $el.find('.graph-content-bars em');
	var $barWrap = $el.find('.graph-content-bars li');
	var $bar = $el.find('.graph-content-bars i');
	var $date = $el.find('.graph-date li');
	//根据步数循环,产生数据
	stepList.step.forEach(function (item, idx) {
		if ( item > 20000 ){	//高度限制
			stepList.barHeight[idx] = 100;
		}else{
			stepList.barHeight[idx] = item * 100 / stepList.stepTop;
		}
		//设置bar高度
		$bar.eq(idx).css({
			height: stepList.barHeight[idx] + '%'
		});
		console.log(stepList.barHeight[idx] + '%');
		//设置步数
		$step.eq(idx).text(item);
		//日期
		$date.eq(idx).text(stepList.date[idx]);
	});
	/*	事件绑定:点击柱子移动步数位置
	* */
	$barWrap.click(function () {
		$(this).find('em').css({
			top: '2%',
		});
		$(this).siblings('li').find('em').css({
			top: '100%'
		});
	});
}

$(function () {
	setTimeout(function () {	//延时为了查看动画效果
		setGraph($('.graph'));
	}, 500);
});