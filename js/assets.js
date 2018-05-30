assets = [];

function Asset(type,title,presenter,month,date,year,text,url){
  this.type = type;
  this.title = title;
  this.presenter = presenter;
  this.month = month;
  this.date = date;
  this.year = year;
  this.text = text;
  this.url = url;
}

/* Stuff */
assets.push(new Asset("talk","Prairie Center of the Arts: Artist Lecture","Natalia Villanueva",1,6,2015,"The artist Geamoon speaks at the Prairie Center of the Arts in Peoria, IL. She speaks about her process, sensibility, and her body of work.", "https://www.youtube.com/embed/ii9m8k3A7XA"));
assets.push(new Asset("seminar","How to Do Art","L'Eau",9,22,2016,"This lecture is blah blah", "#"));
assets.push(new Asset("lecture","The Church","Natalia Villanueva",3,6,2017,"This lecture is blah blah", "#"));
assets.push(new Asset("lecture","My Cat L'Eau","Natalia Villanueva",9,17,2017,"This lecture is blah blah", "#"));
assets.push(new Asset("seminar","Bubble Water","Earl Power Murphy",9,19,2017,"This lecture is blah blah", "#"));
assets.push(new Asset("seminar","Christmas Shit","The Bing Bong Boys",12,25,2017,"This lecture is blah blah", "#"));
