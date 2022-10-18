$(document).ready(function(){
	//lnb slide down
	$(".lnb_a1").click(function(){
		$(this).next(".depth2-wrap").slideToggle(200);
		$(this).parent(".lnb_l1").toggleClass("close");
		return false;
	})
	
	//paging selection
	// $(".paging").find("li").click(function(){
	// 	$(this).addClass("on");
	// 	$(".paging li").not(this).removeClass("on");
	// });

	//tab-top
	// $(".tab-top li").click(function(){
	// 	$(this).addClass("on");
	// 	$(".tab-top li").not(this).removeClass("on");
	// 	var target = $(this).data("view");
	// 	$(target).show();
	// 	$(".tabCont").not(target).hide();
	// });
	
	//클래스 일정관리
	$(".timetable-wrap .btn_schedule").click(function(){
		$(".scheduleWriting").show();
	})
	
	//calendar
	// $(".calendar .on").click(function(){
	// 	$(this).addClass("sel");
	// 	$(".sel").not(this).removeClass("sel");
	// });
	
	//colorbox 모달팝업
		// 알림장 등록
	$(".btn_noticeWriting").colorbox({
		inline:true,
		href:"#noticeList_Writing",
		width: 900,
		height: 730,
	});
		// 알림장 상세
	$(".btn_noticeView").colorbox({
		inline:true,
		href:"#noticeList-wrap",
		width: 900,
		height: 810,
	});
		// 리뷰관리
	$(".btn_review").colorbox({
		inline:true,
		href:"#review-wrap",
		width: 900,
		height: 810,
	});
		// 클래스_이용내역
	$(".btn_history").colorbox({
		inline:true,
		href:"#popup_history",
		width: 1000,
		height: 860,
	});
		// 주소찾기
	// $(".btn_address").colorbox({
	// 	inline:true,
	// 	href:"#find_address",
	// 	width: 800,
	// 	height: 660,
	// });
	
			// 수업관리
	$(".btn_lesson").click(function(){
		$("body").append('<div class="dimmed"></div>');
		$("#popup-wrap").fadeIn(200);
		$("#reservation_pop").fadeIn(200);
	});
	$("#reservation_pop .popClose").click(function(){
		$("#reservation_pop").fadeOut(200);
		$("#popup-wrap").fadeOut(200);
		$(".dimmed").remove();
	});
		// 고객검색
	$(".btn_member").click(function(){
		$("#search_member").fadeIn(200);
	});
	$("#search_member .popClose").click(function(){
		$("#search_member").fadeOut(200);
	});
	
})

//레이어 팝업
function layerOpen(obj) {
	$("#layerPop").show();
	$("."+obj).show();
	return false;
}
function layerClose(obj) {
	$("."+obj).hide();
	$("#layerPop").hide();
	return false;
}

//윈도우 팝업
function windowOpen(url,name,w,h) {
 
	var xPos = (document.body.offsetWidth/2) - (w/2); // 가운데 정렬
	xPos += window.screenLeft; // 듀얼 모니터일 때
	var yPos = (document.body.offsetHeight/2) - (h/2);
 
    window.open(url, name, 'width='+ w +', height='+ h +', left=' + xPos + ', top='+ yPos );
}

//클래스 일정관리 닫기
function classClose() {
	$(".scheduleWriting").hide();
}
