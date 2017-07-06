/**
 * Created by Administrator on 2017/7/3.
 */
//步数列表
var stepList7days = {
	step: [5900, 5000, 3000, 2563, 125, 22521, 9632],	//可以是字符串
	barHeight: [],
	stepTop: 20000,
	date: [24, 25, 26, 27, 28, 29, 30]	//可以是字符串
};
var stepList30days = {
	step: [15900, 5000, 3000, 2563, 125, 22521, 0,
		5900, 6321, 3000, 2563, 125, 4217, 0,
		4586, 5000, 3000, 2563, 5621, 22521, 0,
		5900, 1256, 3000, 2563, 125, 3652, 0,
		5900, 22222
	],
	barHeight: [],
	stepTop: 20000,
	date: ['', 2, '','','','','',
		'', '', 9,'','','','',
		'', '', 16,'','','','',
		'', '', 23,'','','','',
		'', 30
	]
};
/*	设置图表
*	@param $el对应dom对象 stepList步数对象， barWidthPercent平分后柱子占据包裹层的宽度百分比
 * */
function setGraph($el, stepList, barWidthPercent) {
	var $bars = $el.find('.graph-content-bars');
	var $barWrap = $bars.find('li');
	var $dates = $el.find('.graph-date');
	//根据步数数量，控制柱子宽度，平分
	var width = 100 / (stepList.step.length) + '%';
	//根据步数循环,产生数据
	stepList.step.forEach(function (item, idx) {
		var stepNum = parseInt(item);
		if (stepNum > 20000) {	//高度限制
			stepList.barHeight[idx] = '100%';
		} else {
			stepList.barHeight[idx] = stepNum * 100 / stepList.stepTop + '%';
		}
		var barStr = '<i style="height:' +
			stepList.barHeight[idx] + ';width:' + barWidthPercent + '%;left:' + ((100-barWidthPercent)/2) + '%' +
			'"></i>';
		var stepStr = '<em>' + stepNum + '</em>';
		$bars.append('<li onclick="barWrapClick(' + $el.index($el.className) + ',' + idx + ')" style="width:' + width + '">' +
			barStr + stepStr +
			'<b></b></li>');	//添加元素，带点击事件
		//日期
		$dates.append('<li style="width:' + width + '">' + stepList.date[idx] + '</li>');
	});
}

/*	事件绑定:点击柱子移动步数位置
* 	@param graphIdx对应表格的序号 liIdx对应柱子包裹层的序号
 * */
function barWrapClick(graphIdx, liIdx) {
	var $this = $('.graph').eq(graphIdx).find('.graph-content-bars li').eq(liIdx);
	var $siblings = $this.siblings('li');
	$this.find('em').css({
		top: '2%',
		opacity: 1
	});
	$this.find('b').show();
	$siblings.find('em').css({
		top: '100%',
		opacity: 0
	});
	$siblings.find('b').hide();
}

$(function () {
	setGraph($('.graph').eq(0), stepList7days, 20);
	setGraph($('.graph').eq(1), stepList30days, 75);
});