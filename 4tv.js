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
var hintDiv;
var settingsHintDiv;
var feed = new Object(); //used for list of articles, details will use diffbot or testArticles
feed.entries = [];
var diffBotToken = "ebae03a3b0bfdf0ac146712a862c39ab";
var cache = {};
var settingsHint = 0;
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
var imageArray = [];
var imageIndex;

//debug options
var loginScreen = false;
var fetchArticles = true;
var cacheAmount = 0;
var hintCount = 0;

//feeds
var npr = "http://www.npr.org/rss/rss.php?id=1001";
var reuters = "http://feeds.reuters.com/reuters/topNews?format=xml";
var offline = 'http://dl.dropbox.com/u/112925/topNews.xml';
var url;
fetchArticles ? url = npr : url = offline;

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
		background: '#5e68c4',
	})
	//Logo
	$(topDiv).prepend('<img src="img/Logo.png" alt="Logo" height="100%" class="logoImage"/>');

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
	leaveSettingsHint();
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


	//optButton css
	$(".optButton").css({
		top: (($(optionsDiv).outerHeight() - $(".optButton").outerHeight())*0.5)+'px',
	});
	
	
	//For more media div
	hintDiv = document.createElement('div');
	$(hintDiv).addClass("hintDiv");
	$(hintDiv).text("Press \u21e8 to see media");
	$(hintDiv).css({
		position: 'absolute',
		top: '1.5%',
		right: '2%',
		background: 'rgba(102,153,204,.8)',
		padding: '.5%',
		color: 'white',
		'font-size': '250%',
		display: 'none'
	});
	$(root).append(hintDiv);

	var slideShowDiv = document.createElement('div');
	$(slideShowDiv).addClass('slideShowDiv');
	$(slideShowDiv).css({
		position: 'absolute',
		width: '80%',
		height: '80%',
		padding: '2% 2%',
		top: '5%',
		left: '9%',
		'background-color': 'rgba(0,0,0,.9)',
		'z-index': 10,
		display: 'none',
	})
	var slideShow = document.createElement('div');
	$(slideShow).addClass('slideShow');
	$(slideShow).css({
		'width': '100%',
		'height': '100%',
		'background-color': "black",
		'background-repeat':'no-repeat',
		'background-position':'center center',
		'background-size': 'contain',
	})
	$(slideShowDiv).append(slideShow);
	$(root).append(slideShowDiv);

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
	$.jGFeed(url, function(xml){
		//console.log('fetching articles');
		feed.feedUrl = xml.feedUrl;
		feed.title = xml.title;
		var first = false;
		if(feed.entries.length == 0){
			first = true;
		}
		for (var i = feed.entries.length; i < xml.entries.length; i++){
			//console.log('adding article: ' + xml.entries[i].title);
			feed.entries.push(xml.entries[i]);
			articleArray.push(makeArticleListElement(feed.entries[i]));
		}
		if(first){
			precache(feed);
			selectArticle(0);
		}
	}, (6 + feed.entries.length));
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
	$('.articleElement.selected').removeClass('selected');
	
	$(articleArray[index]).addClass('selected');
	getArticleDetails($(articleArray[index]).data('data').link);
	
	//preload next article
	if(articleArray.length > index + 1){
		getArticleDetails($(articleArray[index + 1]).data('data').link, true);
	} else {
		getArticleList();
	}
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
		$('.selected').addClass('nofocus');
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
				height: '548px',
				width: '548px',
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
	imageArray = [];
	if(media === undefined){
		$(".galleryDiv").detach();
		galleryDiv = document.createElement('div');
		var galleryTitle = document.createElement('div');
		var tip = document.createElement('div');
		$(galleryTitle).text("No Associated Media");
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
		$(galleryDiv).append(tip);
		$(galleryDiv).append(galleryTitle);
		$(root).append(galleryDiv);
		return;
	}
	$(".galleryDiv").detach();
	galleryDiv = document.createElement('div');
	var galleryTitle = document.createElement('div');
	var tip = document.createElement('div');
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
	$(tip).text("Exit \u21e9");
	$(tip).css({
		position: 'absolute',
		top: "1%",
		right: "1%",
		color: 'white',
		'font-size': '80%',
	});

	$(galleryDiv).append(tip);
	$(galleryDiv).append(galleryTitle);
	
	for(var i = 0; i < media.length; i++){
		if(media[i].type){
			var image = document.createElement('div');
			$(image).addClass("mediaImage");
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
			if(i == 0){
				$(image).css('border', '1px solid white');
			}
			$(galleryDiv).append(image);
			imageArray.push(image);
		}
	}
	imageIndex = 0;
	$(root).append(galleryDiv);
}

function highlightImage(index){
	if(index > imageArray.length){
		imageIndex = imageArray.length;
		index = imageindex;
	} else if(index < 0){
		imageindex = 0;
		index = imageindex;
	}
	$('.mediaImage').css('border', '0px solid white');
	$(imageArray[index]).css('border', '1px solid white');
}



function mediaToggle(toggle){
	if(toggle){
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

function setSlideImage(link){
	console.log(link);
	$('.slideShow').css('background-image', link);
}

function blinkHint(){
	if(hintCount < 5){
		$(hintDiv).fadeIn().delay(1000).fadeOut();
		hintCount++;
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
			background: '#bfd1e5',
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
		$(settingsDiv).fadeIn("slow", blinkSettingsHint);
	} else {
		settingsCog.src = 'img/cog.svg';
		$(settingsDiv).fadeOut();
	}
}

function leaveSettingsHint(){

	settingsHintDiv = document.createElement('div');
	$(settingsHintDiv).addClass("settingsHintDiv");
	$(settingsHintDiv).text("Press \u21e6 to exit the Settings Menu");
	$(settingsHintDiv).css({
		position: 'absolute',
		top: '33%',
		right: '0%',
		background: 'rgba(102,153,204,.8)',
		padding: '.5%',
		color: 'white',
		'font-size': '250%',
		display: 'none',
	});
	$(settingsDiv).append(settingsHintDiv);
	
	
	//$(settingsHintDiv).fadeIn().delay(1000).fadeOut();
		
}
function blinkSettingsHint(){
	if(settingsHint < 3){
		$(settingsHintDiv).fadeIn().delay(1000).fadeOut();
		settingsHint++;
	}
}

function radialKeyStroke(key, funcLeft, funcUp, funcRight, funcDown, img) {
	var imgName;
	var func;
	switch(key){
		case 37: //left
			imgName = 'img/' + img + 'Left.png';
			func = funcLeft;
			break;
		case 38: //up
			imgName = 'img/' + img + 'Up.png';
			func = funcUp;
			break;
		case 39: //right
			imgName = 'img/' + img + 'Right.png';
			func = funcRight;
			break;
		case 40: //down
			imgName = 'img/' + img + 'Down.png';
			func = funcDown;
			break;
	}
	$('.radialMenuImg').attr('src', imgName);
	func();
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
	
	console.log(key);
	console.log(buttonPressed);

	if (buttonPressed !== 0) {
		switch(buttonPressed){
			case 49: //Share - 1
				radialKeyStroke(key, shareTwitter, shareGooglePlus, shareFB, shareEmail, 'RBShare');
				break;
			case 50: //Flag - 2
				radialKeyStroke(key, markRead, star, markUnread, unstar, 'RBFlag');
				break;
			case 51: //View - 3
				var prevArticle = function() {
					if (articleIndex > 0) {
						previousArticle();
					}
				}
				if (key !== 51) {
					radialKeyStroke(key, prevArticle, zoomIn, nextArticle, zoomOut, 'RBView');
				}
				break;
			case 52: //Search - 4
				//focus on search and allow keyboard to show up
				break;	
		}	
		
		console.log('blah');
		console.log(key);
		console.log(buttonPressed);

		setTimeout(function() {
			if (buttonPressed !== 51 || (buttonPressed === 51 && key === 51)){
				buttonPressed = 0;
				$(radialMenuDiv).fadeOut(400);
			}
			else {
				$('.radialMenuImg').attr('src', 'img/RBView.png');
			}
		}, 500);
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
						focusArticle(false); //added this so that there is no scrolling through the article list with a selected (blue bg) article on the right.
						$('.nofocus').removeClass('nofocus');
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
					case 'media':
						mediaToggle(false);
						$('.slideShowDiv').fadeOut();
						mode = 'article';
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
						//leaveSettingsHint();
						settingsFocus(true);
						
						mode = 'settings';
						//leaveSettingsHint();
						$('.settingsDiv').css('background', '#bfd1e5');
						
						
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
						blinkHint();
						$('.selected').addClass('nofocus');
						focusArticle(true);
						break;
					case 'search':
					//	mode = 'article';
						break;
					case 'article':
						mediaToggle(true);
						mode = 'media';
						break;
					case 'media':
						imageIndex++;
						highlightImage(imageIndex);
						setSlideImage($(imageArray[imageIndex]).css('background-image'));
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
						$('.nofocus').removeClass('nofocus');
						mode = 'list';
						break;
					case 'settings':
						mode = 'cog';
						$('.settingsDiv').css('background', '#ddd');
						break;
					case 'media':
						imageIndex--;
						highlightImage(imageIndex);
						setSlideImage($(imageArray[imageIndex]).css('background-image'));
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
						$('.nofocus').removeClass('nofocus');
						mode = 'list';
						$('.settingsDiv').css('background', '#ddd');
						$('.settingsDiv').css('display', 'none');
						break;
					case 'media':
						$('.slideShowDiv').fadeToggle();
						setSlideImage($(imageArray[imageIndex]).css('background-image'));
				}
			break;
		}
	}
}

