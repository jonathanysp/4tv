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
		top: $(topDiv).height() + $(searchDiv).height() + $(searchDiv).padding().top*2,
		width: '30%',
		height: '80%',
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

function fetchArticles(){
	$.jGFeed('http://dl.dropbox.com/u/112925/topNews.xml', function(xml){
		saveFeed(xml);
		listTitles();
	}, 10)
}

function saveFeed(xml){
	feed = xml;
}

function listTitles(){
	for (var i = 0; i < feed.entries.length; i++){
		console.log(feed.entries[i].title);
	}
}