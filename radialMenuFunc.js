function star() {
	//change to starred 
	$(articleArray[articleIndex]).addClass('starred');
	
}

function unstar() {
	//change to unstarred 
	$(articleArray[articleIndex]).removeClass('starred');
}

function markRead() {
	//change to read 
	$(articleArray[articleIndex]).addClass('read');
}

function markUnread() {
	//change to unread 
	$(articleArray[articleIndex]).removeClass('read');
}

function zoomIn() {
	var bodyFont = parseInt($(articleBody).css('font-size'), 10);
	var titleFont = parseInt($(articleTitle).css('font-size'), 10);
	var imageWidth = parseInt($('.articleImage').css('width'), 10);
	var imageHeight = parseInt($('.articleImage').css('height'), 10);
	if (bodyFont < 3*articleBodyFont) {
		var newBodyFont = bodyFont + 0.1*articleBodyFont;	
		var newTitleFont = titleFont + 0.1*articleTitleFont;	
		var newWidth = 1.1*imageWidth;
		var newHeight = 1.1*imageHeight;
		$(articleBody).animate({
			'font-size': newBodyFont + 'px'
		});
		$(articleTitle).animate({
			'font-size': newTitleFont + 'px'
		});
		$('.articleImage').animate({
			'width': newWidth + 'px',
			'height': newHeight + 'px'
		});

	}
}

function zoomOut() {
	var bodyFont = parseInt($(articleBody).css('font-size'), 10);
	var titleFont = parseInt($(articleTitle).css('font-size'), 10);
	var imageWidth = parseInt($('.articleImage').css('width'), 10);
	var imageHeight = parseInt($('.articleImage').css('height'), 10);
	
	if (bodyFont > 0.5*articleBodyFont) {
		var newBodyFont = bodyFont - 0.1*articleBodyFont;	
		var newTitleFont = titleFont - 0.1*articleTitleFont;	
		var newWidth = 0.9*imageWidth;
		var newHeight = 0.9*imageHeight;
		$(articleBody).animate({
			'font-size': newBodyFont + 'px'
		});
		$(articleTitle).animate({
			'font-size': newTitleFont + 'px'
		});
		$('.articleImage').animate({
			'width': newWidth + 'px',
			'height': newHeight + 'px'
		});
	}
	
}


function shareFB() {

}

function shareTwitter() {
	var url = $(articleArray[articleIndex]).data('data').link;
	window.open('https://twitter.com/share?url='+url);
}

function shareGooglePlus() {
	var url = $(articleArray[articleIndex]).data('data').link;
	window.open('https://plus.google.com/share?url='+url);
}

function shareEmail() {
	
}


