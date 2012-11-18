var root;
var topDiv;
var searchDiv;
var searchBox;
var listDiv;
var statusDiv;
var articleDiv;
var optionsDiv;
var logArr = [];
var logIndex = 0;
var radialMenuDiv;
var articleTitle;
var articleBody;
var articleArray = [];
var articleIndex = 0;
var feed; //used for list of articles, details will use diffbot or testArticles
var diffBotToken = "ebae03a3b0bfdf0ac146712a862c39ab";
var articleIndex;
var mode = 'login';
var scrollFactor = 10;
var selectedArticle;
var buttonPressed;


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
	
	$(loginDiv).prepend('<img src="img/Logo.png" alt="Logo" height="30%"/>');
	root.append(loginDiv);
	
	
loginList("margi");
loginList("jon");
loginList("dan");
	
	topDiv = document.createElement('div');
	$(topDiv).addClass("topDiv");
	$(topDiv).css({
		position: 'absolute',
		top: '0%',
		left: '0%',
		height: '6%',
		width: '30%',
		background: '#888',
	})
	//Logo
	$(topDiv).prepend('<img src="img/Logo.png" alt="Logo" height="100%"/>');

	//Article
	sectionSpan = document.createElement('span');
	$(sectionSpan).addClass("sectionSpan");
	$(sectionSpan).css({
		position: 'absolute',
		top: '15%',
		left: '82%',
		height: '100%',
		'font-size': '1.5em',
		'text-align': 'right',
	})
	$(sectionSpan).text('Articles');
	$(topDiv).append(sectionSpan);
	root.append(topDiv);

	searchBox = document.createElement('input');
	searchBox.placeholder = "Search";
	$(searchBox).css({
		width: '100%',
		height: '100%',
		'font-size': '150%',
	})
	$(searchBox).change(filterArticleElements($(searchBox).val()))
	$(searchBox).keyup(function(){
		filterArticleElements($(searchBox).val())
	});

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
		position: 'absolute',
		left: '0%',
		top: $(topDiv).height() + $(searchDiv).outerHeight(),
		width: '30%',
		height: '81%',
		background: '#aaa',
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
		background: '#eee',
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

	radialMenuDiv = document.createElement('div');
	$(radialMenuDiv).addClass('radialMenuDive');
	$(radialMenuDiv).css({
		position: 'absolute',
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
	
	//Button
	$(optionsDiv).append('<img src="img/buttonRed.png" alt="shareButton" class="optButton"/>');
	
	//ShareSpan
	shareSpan = document.createElement('span');
	$(shareSpan).addClass("optionSpan");
	$(shareSpan).text('Share');
	$(optionsDiv).append(shareSpan);
	
	//Button
	$(optionsDiv).append('<img src="img/buttonBlue.png" alt="viewButton" class="optButton"/>');
	
	//ViewSpan
	viewSpan = document.createElement('span');
	$(viewSpan).addClass("optionSpan");
	$(viewSpan).text('View');
	$(optionsDiv).append(viewSpan);

	//Button
	$(optionsDiv).append('<img src="img/buttonGreen.png" alt="flagButton" class="optButton"/>');
	
	//FlagSpan
	flagSpan = document.createElement('span');
	$(flagSpan).addClass("optionSpan");
	$(flagSpan).text('Flag');
	$(optionsDiv).append(flagSpan);
	
	//Button
	$(optionsDiv).append('<img src="img/buttonYellow.png" alt="searchButton" class="optButton"/>');
	
	//SearchSpan
	searchSpan = document.createElement('span');
	$(searchSpan).addClass("optionSpan");
	$(searchSpan).text('Search');
	$(optionsDiv).append(searchSpan);

	root.append(optionsDiv);

	$(".optionSpan").css({
		'font-size': '200%', 
		width: '150%',
	});

	$(".optButton").css({
		'vertical-align': 'middle',
		height:'90%',
	});

	getArticleList();

	buttonPressed = 0;
	document.onkeydown = keyStroke;
}



function loginList(data){
//make a couple logins.
var loginElement = document.createElement('div');
$(loginElement).addClass('loginElement');
//$(loginElement.attr('id', data);
$(loginElement).css({
position: 'relative',
	top: '10%',
	left: '45%',
	'-moz-box-shadow': 'inset 0px 1px 0px 0px #f9eca0',
	'-webkit-box-shadow': 'inset 0px 1px 0px 0px #f9eca0',
	'box-shadow': 'inset 0px 1px 0px 0px #f9eca0',
	'background-color': '#f0c911',
	'-moz-border-radius': '21px',
	'-webkit-border-radius': '21px',
	'border-radius': '21px',
	'border':  '3px solid #e65f44',
	'display': 'block',
	'color': '#c92200',
	'font-family': 'arial',
	'font-size': '28px',
	'font-weight': 'bold',
	'padding':'22px 29px',
	'text-decoration':'none',
	'text-shadow':'1px 1px 0px #ded17c',
})

$(loginDiv).append(loginElement);
$(loginElement).outerWidth($(loginDiv).outerWidth()/7);
//$(loginElement).outerHeight($(loginDiv).outerHeight()/8);

var logTitle = document.createElement('div');
$(logTitle).addClass('logTitle');
$(logTitle).css({
position: 'absolute',
left: '0%',
top: '0%',
height: '100%',
		width: '100%',
		'font-size': '120%',
		'font-Weight': 'Bold',
		'text-align': 'center',
		})

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
	//var url = "http://www.npr.org/rss/rss.php?id=1001";
	var url = 'http://dl.dropbox.com/u/112925/topNews.xml';

	$.jGFeed(url, function(xml){
		feed = xml;
		for (var i = 0; i < feed.entries.length; i++){
			articleArray.push(makeArticleListElement(feed.entries[i]));
		}
		//getArticleDetails(feed.entries[0].link);
		selectArticle(0);
	}, 10)
}

//uses diffbot (only use in final build)
//gets article details and sets it as main display article
//maybe do some caching??
function getArticleDetails(link){
	/*
	var req = "http://www.diffbot.com/api/article?token="+diffBotToken+"&format=json&callback=?&tags=true&url=" + link;
	$.getJSON(req, function(json){
		setDisplayedArticle(json);
		//console.log(json)
		//articleDetails.push(json);
	});
	*/
	//returns article details when supplied with link
	setDisplayedArticle(testArticles[link]);
}

function addToList(array){
	for (var i = 0; i < array.length; i++){
		$(listDiv).append(articleArray[i]);
	}
}

function selectArticle(index){
	$('.articleElement').css({
		background: '#ddd',
	})
	$(articleArray[index]).css({
		background:'#888',
	})
	$(articleArray[index]).click();
}
function nextLogin(){
if(logIndex <logArr.length-1){
logIndex++;
selectLogin(logIndex);
}
}

function selectLogin(logIndex){
$(logArr[logIndex]).css({
	background: '#ddd',
	})
}
function nextArticle(){
	if(articleIndex < articleArray.length - 1){
		articleIndex++;
		selectArticle(articleIndex);
	}
	if($(articleArray[articleIndex]).position().top > $(listDiv).height()-scrollFactor){
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

//contains title, date, snippet
function makeArticleListElement(data){
	var articleElement = document.createElement('div');
	$(articleElement).data('data', data);
	$(articleElement).addClass('articleElement');
	$(articleElement).attr('id', data.title);
	$(articleElement).css({
		border: '1px solid black',
		background: '#ddd',
		padding: '1% 3%',
	})
	$(listDiv).append(articleElement);
	$(articleElement).outerWidth($(listDiv).outerWidth());
	$(articleElement).outerHeight($(listDiv).outerHeight()/5);

	var elementTitle = document.createElement('div');
	$(elementTitle).addClass('elementTitle');
	$(elementTitle).css({
		height: '40%',
		width: '100%',
		'font-size': '120%',
		'font-Weight': 'Bold',
	})
	$(elementTitle).text(data.title);
	$(articleElement).append(elementTitle)

	var elementSnippet = document.createElement('div');
	$(elementSnippet).addClass('elementSnippet');
	$(elementSnippet).css({
		height: '50%',
		width: '100%',
		'font-size': '100%',
		'color': '#444',
	})
	$(elementSnippet).text(data.contentSnippet);
	$(articleElement).append(elementSnippet)

	//click function
	$(articleElement).click(function(){
		$('.articleElement').css({
			background: '#ddd',
		})
		$(this).css({
			background: '#888',
		})
		getArticleDetails($(this).data('data').link);
	})

	return articleElement;
}


//searches and filters through list, quite buggy, case sensitive right now
function filterArticleElements(text){
  	if(text){
		$('.articleElement').children(":not(:contains("+text+"))").parent().slideUp();
		$('.articleElement').children(":contains("+text+")").parent().slideDown()
	} else {
		$('.articleElement').slideDown();
	}
}

function radialMenu(key){
//String.fromCharCode(e.keyCode)
	$(radialMenuDiv).hide(600, function() {
		$(radialMenuDiv).empty();
		var image;
		switch(key){
			case 65: //share, a
				image = 'RBShare.png';
				break;
			case 83: //Flag, s
				image = 'RBFlag.png';
				break;
			case 68: //View, d
				//radialKeyStroke(key, func1, func2, func3, func4);
				image = 'RBView.png';
				break;
			case 170: //Search, f
				//focus on search and allow keyboard to show up
				break;	
		}
		
		$(radialMenuDiv).prepend('<img src="img/'+ image +'" alt="Logo" />');
		$(radialMenuDiv).show(600);
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


//keypress handlers;
/* 37 = left
 * 38 = up
 * 39 = right
 * 40 = down
 * 65 = a
 * 83 = s
 * 68 = d
 * 170 = f
 * ;
 */
function keyStroke(ev) {
	key = ((ev.which)||(ev.keyCode));
	if (buttonPressed !== 0) {
		switch(buttonPressed){
			case 65: //Share - a
				//radialKeyStroke(key, func1, func2, func3, func4);
				break;
			case 83: //Flag - s
				radialKeyStroke(key, markRead, star, markUnread, unstar);
				break;
			case 68: //View - d
				//radialKeyStroke(key, func1, func2, func3, func4);
				break;
			case 170: //Search - f
				//focus on search and allow keyboard to show up
				break;	
		}	

		buttonPressed = 0;
		$(radialMenuDiv).hide(600);
	}
	else if (mode!='search' && buttonPressed != key && (key == 65 || key == 83 || key == 68 || key == 170)){ 
		radialMenu(key);
		buttonPressed = key;
	} else {
		switch(key){
			//down
			case 40: 
				ev.preventDefault();
				switch(mode){
					case 'login':
						nextLogin();
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
				}
				break;
			//up
			case 38:
				ev.preventDefault();
				switch(mode){
					case 'list':
						previousArticle();
						break;
					case 'article':
						scrollArticle(-$(articleDiv).height()/1.5);
						break;
				}
				break;
			//right
			case 39:
				ev.preventDefault();
				switch(mode){
					case 'login':
						mode = 'search';
					case 'list':
						mode = 'article';
						focusArticle(true);
						break;
					case 'search':
						mode = 'article';
						break;
				}
				break;
			//left
			case 37:
				ev.preventDefault();
				switch(mode){
					case 'article':
						focusArticle(false);
						mode = 'list';
						break;
				}
			break;
		}
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

