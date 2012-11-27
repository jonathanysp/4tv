function star() {
	
	//change to starred 

	//starBit = true;
	console.log('star');
}

function unstar() {
	//change to unstarred 

	//starBit = false;
	console.log('unstar');
}

function markRead() {
	//change to read 

	//readBit = true;
	console.log('read');
}

function markUnread() {
	//change to unread 

	//readBit = false;
	console.log('unread');
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

}

function shareGooglePlus() {

}


