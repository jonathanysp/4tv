var root;
var topDiv;
var searchDiv;
var searchBox;
var listDiv;
var statusDiv;
var articleDiv;
var optionsDiv;
var galleryDiv
var logArr = [];
var logIndex = 0;
var radialMenuDiv;
var articleTitle;
var articleBody;
var articleTitleFont;
var articleBodyFont;
var articleArray = [];
var articleIndex = 0;
var feed; //used for list of articles, details will use diffbot or testArticles
var diffBotToken = "ebae03a3b0bfdf0ac146712a862c39ab";
var cache = {};

var articleIndex;
var mode = 'login';
var scrollFactor = 10;
var selectedArticle;
var buttonPressed;
var settingsCogDiv;
var settingsCog;
var settingsDiv;
var settingsArray = [];
var settingIndex = 0;

//debug options

var loginScreen = true;
var fetchArticles = false;
var cacheAmount = 5;


//sets out basic layout
function init(){
	root = $(".root");
	
	loginDiv = document.createElement('div');
	$(loginDiv).addClass("loginDiv");
	$(loginDiv).css({
	position: 'absolute',
	top: '0%',
	left: '0%',
	height: '100%',
	width: '100%',
	'z-index': '100',
	display: 'visible',
	background: '#888',
	})
	
	$(loginDiv).prepend('<div class=filler/><center><img src="img/Logo.png" alt="Logo" height="30%"/></center><div class=filler/>');
	root.append(loginDiv);
	
	
	loginList("margi");
	loginList("jon");
	loginList("dan");
	loginList("Guest");
	//must have at least 1 login.
	selectLogin(0);

	if(!loginScreen){
		mode = 'list',
		$(loginDiv).css("display", "none");
	}

	topDiv = document.createElement('div');
	$(topDiv).addClass("topDiv");
	$(topDiv).css({
		position: 'absolute',
		top: '0%',
		left: '0%',
		height: '6%',
		width: '30%',
		background: '#363666',
	})
	//Logo
	$(topDiv).prepend('<img src="img/Logo.png" alt="Logo" height="100%"/>');

	//Settings Cog
	settingsCogDiv = document.createElement('div');
	$(settingsCogDiv).addClass("settingsCogDiv");
	$(settingsCogDiv).css({
		position: 'absolute',
		right: '0',
		top: '0',
	})
	
	settingsCog = document.createElement('img');
	settingsCog.src = 'img/cog.svg';
	$(settingsCog).css({
		'max-height': '100%',
		'max-width': '100%',
	})

	$(settingsCogDiv).append(settingsCog);
	$(topDiv).append(settingsCogDiv);

	root.append(topDiv);

	//settingsDiv
	settingsDiv = document.createElement('div');
	$(settingsDiv).addClass("settingsDiv");
	$(settingsDiv).css({
		position: 'absolute',
		right: '0%',
		top: '0%',
		height: '92%',
		width: '66%',
		padding: '2% 2%',
		background: '#ddd',
		'overflow-y': 'auto',
		'z-index': 10,
		'display': 'none',
	})
	root.append(settingsDiv);

	//settings (should make dynamic for later TODO)
	var switchUserDiv = document.createElement('div');
	$(switchUserDiv).addClass("switchUserDiv");
	$(switchUserDiv).addClass("setting");
	$(switchUserDiv).css({
		width: '100%',
		height: "9%",
		background: "#eee",
		'margin-bottom': '2%',
		'text-align': 'center',
		'padding': '1% 0%',
		'font-size': '150%',
	})
	$(switchUserDiv).data("enter", function(){
		
		$(loginDiv).fadeIn("slow");
		logIndex = 0;
		
	})
	$(switchUserDiv).html("<p>Switch User</p>");

	var quitDiv = document.createElement('div');
	$(quitDiv).addClass('quitDiv');
	$(quitDiv).addClass("setting");
	$(quitDiv).css({
		width: '100%',
		height: "9%",
		background: "#eee",
		'margin-bottom': '2%',
		'text-align': 'center',
		'padding': '1% 0%',
		'font-size': '150%',

	})
	$(quitDiv).html("<p>Quit</p>");
	$(quitDiv).data("enter", function(){
		window.close();
	})

	settingsArray.push(switchUserDiv);
	settingsArray.push(quitDiv);
	$(settingsDiv).append(switchUserDiv);
	$(settingsDiv).append(quitDiv);

	searchBox = document.createElement('input');
	$(searchBox).addClass("searchBox");
	searchBox.placeholder = " Search";
	searchBox.disabled = true;
	$(searchBox).css({
		width: '100%',
		height: '100%',
		'font-size': '150%',
		'border': '1px #fff solid',
	})
	$(searchBox).change(filterArticleElements($(searchBox).val()))
	$(searchBox).keyup(function(){
		filterArticleElements($(searchBox).val())
	});
	$(searchBox).focus(function(){
		$(searchBox).css({
			'border': '1px #6EA2DE solid',
			'outline': '2px #6EA2DE solid',
			'box-shadow': '0px 0px 20px #6EA2DE',
		})
		searchBox.disabled = false;
	}).blur(function(){
		$(searchBox).css({
			'border': '1px #fff solid',
			'outline': '0px #000 solid',
			'box-shadow': '0px 0px 0px #6EA2DE',
		})
		searchBox.disabled = true;
	})

	searchDiv = document.createElement('div');
	$(searchDiv).addClass("searchDiv");
	$(searchDiv).css({
		position: 'absolute',
		top: $(topDiv).height(),
		left: '0%',
		height: '4%',
		width: '28%',
		background: '#666',
		padding: '1%',
	})
	$(searchDiv).append(searchBox);
	root.append(searchDiv);

	listDiv = document.createElement('div');
	$(listDiv).addClass("listDiv");
	$(listDiv).css({
		'background-color': '#fff',
		position: 'absolute',
		left: '0%',
		top: $(topDiv).height() + $(searchDiv).outerHeight(),
		width: '30%',
		height: '80.5%',
		'overflow-y': 'auto',
		'overflow-x': 'hidden',
	})
	root.append(listDiv);

	statusDiv = document.createElement('div');
	$(statusDiv).addClass('statusDiv');
	$(statusDiv).css({
		position:'absolute',
		left: '0%',
		bottom: '0%',
		width: '30%',
		height: '6%',
		background: '#888',
	})
	root.append(statusDiv);

	articleDiv = document.createElement('div');
	$(articleDiv).addClass('articleDiv');
	$(articleDiv).css({
		position: 'absolute',
		right: '0%',
		top: '0%',
		height: '94%',
		width: '66%',
		padding: '0% 2%',
		background: '#ddd',
		'overflow-y': 'auto',
	})
	root.append(articleDiv);

	articleTitle = document.createElement('h1');
	$(articleTitle).addClass('articleTitle');
	$(articleTitle).css({
		'font-size': '250%'
	})

	articleBody = document.createElement('p');
	$(articleBody).addClass('articleBody');
	$(articleBody).css({
		'font-size': '200%',
		'line-height': '150%',
	})

	$(articleDiv).append(articleTitle);
	$(articleDiv).append(articleBody);

	articleBodyFont = parseInt($(articleBody).css('font-size'), 10);
	articleTitleFont = parseInt($(articleTitle).css('font-size'), 10);

	radialMenuDiv = document.createElement('div');
	$(radialMenuDiv).addClass('radialMenuDive');
	$(radialMenuDiv).css({
		position: 'absolute',
		display: 'table',
		'text-align': 'center',
		right: '0%',
		bottom: '0%',
		height: '100%',
		width: '70%',
		background: 'rgba(0,0,0,0.5)',
	});
	root.append(radialMenuDiv);
	$(radialMenuDiv).hide();

	optionsDiv = document.createElement('div');
	$(optionsDiv).addClass('optionsDiv');
	$(optionsDiv).css({
		position: 'absolute',
		'text-align': 'right',
		right: '0%',
		bottom: '0%',
		height: '6%',
		width: '70%',
		display: 'table-cell',
		'vertical-align': 'middle',
		background: 'rgba(0,0,0,.6)',
	})
	
	//ShareSpanDiv
	shareSpanDiv = document.createElement('div');
	$(shareSpanDiv).addClass("optionSpanDiv");

	//Button
	$(shareSpanDiv).append('<img src="img/buttonRed.png" alt="shareButton" class="optButton"/>');

	//ShareSpan
	shareSpan = document.createElement('span');
	$(shareSpan).addClass("optionSpan");
	$(shareSpan).text('Share');
	$(shareSpanDiv).append(shareSpan);
	
	//ViewSpanDiv
	viewSpanDiv = document.createElement('div');
	$(viewSpanDiv).addClass("optionSpanDiv");
	
	//Button
	$(viewSpanDiv).append('<img src="img/buttonBlue.png" alt="viewButton" class="optButton"/>');
	
	//ViewSpan
	viewSpan = document.createElement('span');
	$(viewSpan).addClass("optionSpan");
	$(viewSpan).text('View');
	$(viewSpanDiv).append(viewSpan);
	
	
	//FlagSpanDiv
	flagSpanDiv = document.createElement('div');
	$(flagSpanDiv).addClass("optionSpanDiv");
	
	//Button
	$(flagSpanDiv).append('<img src="img/buttonGreen.png" alt="flagButton" class="optButton"/>');
	
	//FlagSpan
	flagSpan = document.createElement('span');
	$(flagSpan).addClass("optionSpan");
	$(flagSpan).text('Flag');
	$(flagSpanDiv).append(flagSpan);
	
	//FlagSpanDiv
	searchSpanDiv = document.createElement('div');
	$(searchSpanDiv).addClass("optionSpanDiv");
	
	//Button
	$(searchSpanDiv).append('<img src="img/buttonYellow.png" alt="searchButton" class="optButton"/>');
	
	//SearchSpan
	searchSpan = document.createElement('span');
	$(searchSpan).addClass("optionSpan");
	$(searchSpan).text('Search');
	$(searchSpanDiv).append(searchSpan);
	
	$(optionsDiv).append(searchSpanDiv);
	$(optionsDiv).append(viewSpanDiv);
	$(optionsDiv).append(flagSpanDiv);
	$(optionsDiv).append(shareSpanDiv);
	
	//hacky workaround to load the star image.  
	starIMG = $('<left><img src="img/star.png" alt="star" height="35%"/></left>');
	root.prepend(starIMG);
	$(starIMG).remove();
	
	root.append(optionsDiv);

	//CSS of optionDiv
	$(".optionSpanDiv").css({
		float: 'right',
		display: 'table-cell',
		'text-align': 'left',
		width: '15%',
		'vertical-align': 'middle',
	});


	$(".optionSpan").css({
		display: 'inline-block',
		'font-size': '200%',
		'vertical-align': 'middle',
	});

	$(".optButton").css({
		display: 'inline-block',
		'vertical-align': 'middle',
		height: '92%',
		position: 'relative',
		top: ($(optionsDiv).outerHeight()*0.10)+'px',
	});

	getArticleList();

	scrollBarWidth = 0.005 * ($(listDiv).outerWidth() + $(articleDiv).outerWidth());
	for(var i = 0; i < document.styleSheets.length; i ++) {
		var cursheet = document.styleSheets[i];
		if(cursheet.title == '4tvStyle') {
			cursheet.addRule("::-webkit-scrollbar", "width: " + scrollBarWidth + "px" );
		}
	} 

	buttonPressed = 0;
	document.onkeydown = keyStroke;
}



function loginList(data){

	var loginElement = document.createElement('div');
	$(loginElement).addClass('loginElement');

	$(loginDiv).append(loginElement);
	$(loginElement).outerWidth($(loginDiv).outerWidth()/6);

	var logTitle = document.createElement('div');
	$(logTitle).addClass('logTitle');

	$(logTitle).text(data);
	$(loginElement).append(logTitle);


	//click func
	$(loginElement).click(function(){
		$('.loginElement').css({
			background: '#ddd',
		})
		$(this).css({
			background: '#888',
		})
		$(loginDiv).css({
			display: 'none',
		})
	})
	logArr.push(loginElement);

	return loginElement;


}


//fetches xml
//only use testArticles from now and dont fetch;
function getArticleList(){
	if(fetchArticles){
		var url = "http://www.npr.org/rss/rss.php?id=1001";
	} else {
		var url = 'http://dl.dropbox.com/u/112925/topNews.xml';
	}

	$.jGFeed(url, function(xml){
		feed = xml;
		for (var i = 0; i < feed.entries.length; i++){
			articleArray.push(makeArticleListElement(feed.entries[i]));
		}
		precache(feed);
		selectArticle(0);
	}, 10)
}

//uses diffbot (only use in final build)
//gets article details and sets it as main display article
function getArticleDetails(link, silent){
	
	if(fetchArticles){
		if(cache[link]){
			if(!silent){
				setDisplayedArticle(cache[link]);
			}
			return cache[link];
		} else {
			var req = "http://www.diffbot.com/api/article?token="+diffBotToken+"&format=json&callback=?&tags=true&url=" + link;
			$.getJSON(req, function(json){
				if(!silent){
					setDisplayedArticle(json);
				}
				cache[link] = json;
				return json;
			})
		}
	} else {
		//returns article details when supplied with link
		setDisplayedArticle(testArticles[link]);
	}
}

function precache(){
	for(var i = 0; i <= cacheAmount; i++){
		getArticleDetails(feed.entries[i].link, true);
	}
}

function addToList(array){
	for (var i = 0; i < array.length; i++){
		$(listDiv).append(articleArray[i]);
	}
}

function selectArticle(index){
	articleIndex = index;
	markRead();
	$('.selected').removeClass('selected');
	
	$(articleArray[index]).addClass('selected');
	getArticleDetails($(articleArray[index]).data('data').link);
}



function nextLogin(){
	if(logIndex <logArr.length-1){
		unselectLogin(logIndex);
		logIndex++;
		selectLogin(logIndex);
	}
}

function previousLogin(){
	if(logIndex > 0){
		unselectLogin(logIndex);
		logIndex--;
		selectLogin(logIndex);
	}
}

function selectLogin(logIndex){
	if(logIndex > -1){
		$(logArr[logIndex]).addClass('selected');
	}
}

function unselectLogin(index){
	if(logIndex > -1){
		$(logArr[logIndex]).removeClass('selected');
	}
}

function nextArticle(){
	if(articleIndex < articleArray.length - 1){
		articleIndex++;
		//skips filtered articles
		while($(articleArray[articleIndex]).data("display") === false && articleIndex < articleArray.length - 1){
			articleIndex++;
		}
		selectArticle(articleIndex);
	}

	if (articleIndex == articleArray.length - 1) {
		//Scroll all the way to the bottom if it's the last element.
		$(listDiv).animate({
			scrollTop: $(document).height(),
		}, 500)
	}
	else if($(articleArray[articleIndex]).position().top > $(listDiv).height()-scrollFactor){
		$(listDiv).animate({
			scrollTop: $(articleArray[articleIndex - 1]).position().top + $(listDiv).scrollTop(),
		}, 500)
	}
}

function previousArticle(){
	if(articleIndex == 0){
		//focus search bar
		mode = 'search';
		$(searchBox).focus();		
	} else {
		articleIndex--;
		//skips filtered articles
		while($(articleArray[articleIndex]).data("display") === false && articleIndex > 0){
			articleIndex--;
		}
		selectArticle(articleIndex);
	}
	if($(articleArray[articleIndex]).position().top < 0){
		var scrollArticle = articleIndex - 3;
		if(scrollArticle < 0){
			scrollArticle = 0;
		}
		$(listDiv).animate({
			scrollTop: $(articleArray[scrollArticle]).position().top + $(listDiv).scrollTop(),
		}, 500)
	}
}

function nextSetting(){
	if(settingIndex < settingsArray.length-1){
		settingIndex++;
	}
	selectSetting();
}

function prevSetting(){
	if(settingIndex > 0){
		settingIndex--;
	}
	selectSetting()
}

function selectSetting(){
	$('.setting').css('background', '#eee');
	$(settingsArray[settingIndex]).css('background', '#888');
}

//contains title, date, snippet
function makeArticleListElement(data){
	var articleElement = document.createElement('div');
	$(articleElement).data('data', data);
	$(articleElement).data('display', true);
	$(articleElement).addClass('articleElement');
	$(articleElement).attr('id', data.title);
	$(articleElement).css({
		padding: '1% 3%',
		margin: '1% 1%',
	})
	$(listDiv).append(articleElement);
	$(articleElement).outerWidth($(listDiv).outerWidth()*0.965);
	$(articleElement).outerHeight($(listDiv).outerHeight()/5);

	var elementTitle = document.createElement('div');
	$(elementTitle).addClass('elementTitle');
	$(elementTitle).css({
		height: '40%',
		'font-size': '140%',
		'font-Weight': 'Bold',
		'margin-bottom': '1%',
	})
	$(elementTitle).text(data.title);
	
	unstarIMG = $('<left><img src="img/unstar.png" alt="unstar" height="35%"/></left>');

	$(elementTitle).prepend(unstarIMG).children().css({
			'position' : 'relative',
			'right' : '3px',
				});
	
	$(articleElement).append(elementTitle);

	var elementSnippet = document.createElement('div');
	$(elementSnippet).addClass('elementSnippet');
	$(elementSnippet).css({
		height: '50%',
		'font-size': '120%',
		'color': '#444',
	})
	$(elementSnippet).text(data.contentSnippet);
	$(articleElement).append(elementSnippet)

	return articleElement;
}


//searches and filters through list, quite buggy, case sensitive right now
function filterArticleElements(text){
  	if(text){
		$('.articleElement').children(":not(:contains("+text+"))").parent().stop().slideUp(300).data("display", false);
		$('.articleElement').children(":contains("+text+")").parent().stop().slideDown(300).data("display", true);
	} else {
		$('.articleElement').slideDown(300).data("display", true);
	}
}

function radialMenu(key){
//String.fromCharCode(e.keyCode)
	$(radialMenuDiv).fadeOut(600, function() {
		$(radialMenuDiv).empty();
		var image;
		switch(key){
			case 49: //share, a
				image = 'RBShare.png';
				break;
			case 50: //Flag, s
				image = 'RBFlag.png';
				break;
			case 51: //View, d
				image = 'RBView.png';
				break;
			case 52: //Search, f
				//focus on search and allow keyboard to show up
				break;	
		}

		if (key !== 52) {	
			$(radialMenuDiv).prepend('<img src="img/'+ image +'" alt="radialMenu" class="radialMenuImg" />');
			$(radialMenuDiv).fadeIn(400);

			topPadding = Math.abs(($(radialMenuDiv).height() - 548)/2); //548 is the height of the radialMenuImg

			//CSS of radialMenu Images	
			$(".radialMenuImg").css({
				position: 'relative',
				top: topPadding+'px',
				'text-align': 'center',
			});

		} else {
			$(searchBox).focus();
			$(searchBox).val('');
			mode = 'search';
		}
	});

};

//shows title, text, media
function setDisplayedArticle(data){
	$(articleTitle).text(data.title);
	$(articleBody).children().detach();
	$(articleBody).text('');
	var text = data.text;
	text = newlineToBr(text);
	$(articleBody).append(text);

	//removes old images;
	$('.articleImage').detach();
	//finds the largest image by placing it in a tmp
	//offscreen div and then appends it to the article
	var imgHeights = [];
	var images = [];
	var offScreenDiv = document.createElement('div');
	$(offScreenDiv).css({
		position: 'absolute',
		right: '-100%'
	})
	root.append(offScreenDiv);

	if(data.media){
		for (var i = 0; i < data.media.length; i++){
			if(data.media.length > 0) {
				var image = document.createElement('img');
				$(image).addClass('articleImage');
				image.src = data.media[i].link;
				$(image).css({
					float: 'right',
				})
				$(offScreenDiv).append(image);
				imgHeights.push($(image).height());
				images.push(image);
			}
		}
	}
	var index = imgHeights.indexOf(Math.max.apply(Math, imgHeights));
	$(images[index]).css({
		'max-width': '50%',
	})
	$(offScreenDiv).detach();
	$(articleTitle).after(images[index]);
	
	makeMediaGallery(data.media);
	articleDiv.scrollTop = 0;
}

function makeMediaGallery(media){
	if(media === undefined){
		return;
	}
	$(".galleryDiv").detach();
	galleryDiv = document.createElement('div');
	var galleryTitle = document.createElement('div');
	$(galleryTitle).text("Associated Media");
	$(galleryTitle).css("margin-bottom", "1%");
	$(galleryDiv).addClass("galleryDiv");
	$(galleryDiv).css({
		position: 'absolute',
		width: "0%",
		padding: "1%",
		top: "4%",
		background: "rgba(0,0,0,.9)",
		'margin-bottom': '1%',
		'font-size': articleTitleFont,
		color: 'white',
		overflow: 'auto',
		display: 'none',
		right:0,
	})
	$(galleryDiv).append(galleryTitle);
	
	for(var i = 0; i < media.length; i++){
		if(media[i].type){
			var image = document.createElement('div');
			$(image).css({
				width: '25%',
				height: $(articleDiv).height()*.18 + "px",
				'background-color': "black",
				'background-image': "url("+ media[i].link +")",
				'background-repeat':'no-repeat',
				'background-position':'center center',
				'background-size': 'contain',
				'float': 'left',
				'margin-left': '1%',
				'margin-bottom': '1%',
			})
			$(galleryDiv).append(image);
		}
	}
	$(root).append(galleryDiv);
}

function mediaToggle(){
	if(parseInt($(galleryDiv).css("width")) === 0){
		$(galleryDiv).css("display", "block");
		$(galleryDiv).animate({
			width: "66%",
		}, 500);
	} else {
		$(galleryDiv).animate({
			width: "0%",
		}, 500, function(){
			$(galleryDiv).css("display", "none");
		});
	}
}

function newlineToBr(string){
	var regex = new RegExp("\\n","g");
	//TODO: probably should replace it with something better than 2 <br>
	var replace = "<br><br>";
	return string.replace(regex,replace);
}

function scrollArticle(pos){
	$(articleDiv).stop().animate({scrollTop: $(articleDiv).scrollTop() + pos}, 300);
}

function focusArticle(bool){
	if(bool){
		$(articleDiv).css({
			background: '#ccc',
		})
	} else {
		$(articleDiv).css({
			background: '#ddd',
		})
	}
}

function settingsFocus(bool){
	if (bool){
		settingsCog.src = 'img/cog2.svg';
		$(settingsDiv).fadeIn();
	} else {
		settingsCog.src = 'img/cog.svg';
		$(settingsDiv).fadeOut();
	}
}



function radialKeyStroke(key, funcLeft, funcUp, funcRight, funcDown) {
	switch(key){
		case 37: //left
			funcLeft();
			break;
		case 38: //up
			funcUp();
			break;
		case 39: //right
			funcRight();
			break;
		case 40: //down
			funcDown();
			break;
	}
}

//keypress handlers;
/* 37 = left
 * 38 = up
 * 39 = right
 * 40 = down
 * 65 = a
 * 83 = s
 * 68 = d
 * 70 = f
 * 13 = enter
 * ;
 */
function keyStroke(ev) {
	key = ((ev.which)||(ev.keyCode));
	if (buttonPressed !== 0) {
		switch(buttonPressed){
			case 49: //Share - a
				radialKeyStroke(key, shareTwitter, shareGooglePlus, shareFB, shareEmail);
				break;
			case 50: //Flag - s
				radialKeyStroke(key, markRead, star, markUnread, unstar);
				break;
			case 51: //View - d
				var prevArticle = function() {
					if (articleIndex > 0) {
						previousArticle();
					}
				}
				radialKeyStroke(key, prevArticle, zoomIn, nextArticle, zoomOut);
				break;
			case 52: //Search - f
				//focus on search and allow keyboard to show up
				break;	
		}	

		buttonPressed = 0;
		$(radialMenuDiv).fadeOut(400);
	}
	else if (mode != 'search' && buttonPressed != key && (key == 49 || key == 50 || key == 51 || key == 52)){ 
		radialMenu(key);
		buttonPressed = key;
		return false;
	} else {
		switch(key){
			//down
			case 40: 
				ev.preventDefault();
				switch(mode){
					case 'login':
						nextLogin();
						break;
					case 'list':
						nextArticle();
						break;
					case 'search':
						mode = 'list';
						$(searchBox).blur();
						break;
					case 'article':
						scrollArticle($(articleDiv).height()/1.5);
						break;
					case 'cog':
						settingsFocus(false);
						$(searchBox).focus();
						mode = 'search';
						break;
					case 'settings':
						nextSetting();
						break;
				}
				break;
			//up
			case 38:
				ev.preventDefault();
				switch(mode){
					case 'login':
						previousLogin();
						break;
					case 'list':
						previousArticle();
						break;
					case 'article':
						scrollArticle(-$(articleDiv).height()/1.5);
						break;
					case 'search':
						$(searchBox).blur();
						settingsFocus(true);
						
						mode = 'settings';
						$('.settingsDiv').css('background', '#ccc');
						selectSetting();
						break;
					case 'settings':
						prevSetting();
						break;
				}
				break;
			//right
			case 39:
				ev.preventDefault();
				switch(mode){
					case 'login':
						break;
					case 'list':
						mode = 'article';
						focusArticle(true);
						break;
					case 'search':
					//	mode = 'article';
						break;
					case 'article':
						mediaToggle();
						mode = 'media';
						break;
					case 'media':
						mediaToggle();
						mode = 'article';
						break;
				}
				break;
			//left
			case 37:
				ev.preventDefault();
				switch(mode){
					case 'search':
						break;
					case 'login':
						break;
					case 'article':
						focusArticle(false);
						mode = 'list';
						break;
					case 'settings':
						mode = 'cog';
						$('.settingsDiv').css('background', '#ddd');
						break;
				}
			break;
			//enter
			case 13:
				ev.preventDefault();
				switch(mode){
					case 'settings':
						$(settingsArray[settingIndex]).data("enter")();
						mode = 'login';
						selectLogin(logIndex);
						break;
					case 'login':
						
						$(loginDiv).fadeOut("slow");	
						unselectLogin(logIndex);
						logIndex = 0;
						//selectLogin(logIndex);
						mode = 'list';
						$('.settingsDiv').css('background', '#ddd');
						$('.settingsDiv').css('display', 'none');
						break;
				}
			break;
		}
	}
}

