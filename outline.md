# Layout

## Fixed objects
 - topDiv
	 - top left bar, contains logo, header text
 - searchDiv
	 - contains searchbar
 - listDiv
	 - contains articleElements
 - statusDiv
	 - contains update info etc.
 - articleDiv
	 - contains title, byline, text body

## Dynamic objects
 - articleElements
	 - has title, first sentence, date
	 - when selected, updates articleDiv
	 - highlighted when selected

## Cursor
 - in list mode
	 - change view option to sort option
	 - up/down in listDiv goes to next article
	 - right moves to article mode
 - in article mode
	 - change sort option to view option
	 - up/down scrolls article
	 - left moves to article mode
 - text input mode
	 - activated when either search option in pressed
	 - or when searchbar is selected