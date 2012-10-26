var root;
var topDiv;
var searchDiv;
var searchBox;
var listDiv;
var statusDiv;
var articleDiv;
var optionsDiv;
var feed;

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
		width: '68%',
		padding: '1%',
		background: '#eee',
	})
	root.append(articleDiv);

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

	fetchArticles();
}

//fetches xml
function fetchArticles(){
	$.jGFeed('http://dl.dropbox.com/u/112925/topNews.xml', function(xml){
		feed = xml;
		listTitles();
	}, 10)
}

function listTitles(){
	$(articleDiv).text("Articles fetched:")
	var list = document.createElement('ul');
	$(list).addClass('list');
	$(articleDiv).append(list);
	for (var i = 0; i < feed.entries.length; i++){
		var title = document.createElement('li');
		$(title).text(feed.entries[i].title);
		$(list).append(title);
		console.log(feed.entries[i].title);
	}
}