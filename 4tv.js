var root;
var topDiv;
var searchDiv;
var searchBox;
var listDiv;
var statusDiv;
var articleDiv;
var optionsDiv;
var articleTitle;
var articleBody;
var articleArray = [];
var feed; //used for list of articles, details will use diffbot or testArticles
var diffBotToken = "ebae03a3b0bfdf0ac146712a862c39ab";
var selectedArticle;

//sets out basic layout
function init(){
	root = $(".root");
	
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
		height: '92%',
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

	optionsDiv = document.createElement('div');
	$(optionsDiv).addClass('optionsDiv');
	$(optionsDiv).css({
		position: 'absolute',
		right: '0%',
		bottom: '0%',
		height: '6%',
		width: '70%',
		background: 'rgba(0,0,0,.6)',
	})
	root.append(optionsDiv);

	getArticleList();
}

//fetches xml
//only use testArticles from now and dont fetch;
function getArticleList(){
	//var url = "http://www.npr.org/rss/rss.php?id=1001";
	var url = 'http://dl.dropbox.com/u/112925/topNews.xml';

	$.jGFeed(url, function(xml){
		feed = xml;
		makeArticleListElement(feed.entries[0], true);
		for (var i = 1; i < feed.entries.length; i++){
			makeArticleListElement(feed.entries[i]);
		}
		getArticleDetails(feed.entries[0].link);
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

//contains title, date, snippet
function makeArticleListElement(data, selected){
	var articleElement = document.createElement('div');
	$(articleElement).data('data', data);
	$(articleElement).addClass('articleElement');
	$(articleElement).attr('id', data.title);
	$(articleElement).css({
		border: '1px solid black',
		background: '#ddd',
		padding: '1% 3%',
	})
	if(selected){
		$(articleElement).css({
			background:'#888',
		})
	}
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