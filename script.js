// "Add" button 
const addButton = document.querySelector('#submit');
addButton.addEventListener('click', addToList)
function addToList(event){
	let inputValue = document.querySelector('.input-pairs').value
	if (!inputValue){
		alert('Input must not be empty')
		return
	}
	const pair = inputValue.split('=')
	re = new RegExp("^[a-zA-Z0-9]+$");
	if (pair.length != 2 || ! re.test(pair[0]) || ! re.test(pair[1])){
		alert('Invalid syntax')
		return
	}
	const key = pair[0].trim()
	const value = pair[1].trim()



	let newli = document.createElement('li')
	newli.innerHTML = key + '=' + value
	document.querySelector('.saved-list').appendChild(newli)
	// releasing input
	document.querySelector('.input-pairs').value = ''

}

// "Sort by Name" button
const sortByNameButton = document.querySelector('#sbn');
sortByNameButton.addEventListener('click', sortByName)
function sortByName(event){
	let listItems = document.querySelectorAll('.saved-list li')
	// Converting from NodeList to Array
	listItems = Array.from(listItems)
	let serListItems = listItems.map(elem=> {
		let pair = elem.innerHTML.split('=')
		return pair
	})
	serListItems.sort((a,b)=>{
		if (a[0] < b[0])
		  return -1;
		if ( a[0] > b[0])
		  return 1;
		return 0;
	})

	// console.log(serListItems)
	clearList()
	serListItems.forEach(pair =>{
		let joinedPair = pair.join('=')
		let newli = document.createElement('li')
		newli.innerHTML = joinedPair
		document.querySelector('.saved-list').appendChild(newli)
	})

}


// "Sort by Value" button * this is 98% same function as previous, I know, it's not DRY.
const sortByValueButton = document.querySelector('#sbv');
sortByValueButton.addEventListener('click', sortByValue)
function sortByValue(event){
	let listItems = document.querySelectorAll('.saved-list li')
	// Converting from NodeList to Array
	listItems = Array.from(listItems)
	let serListItems = listItems.map(elem=> {
		let pair = elem.innerHTML.split('=')
		return pair
	})
	// console.log(serListItems)
	serListItems.sort((a,b)=>{
		if (a[1] < b[1])
		  return -1;
		if ( a[1] > b[1])
		  return 1;
		return 0;
	})

	// console.log(serListItems)
	clearList()
	serListItems.forEach(pair =>{
		let joinedPair = pair.join('=')
		let newli = document.createElement('li')
		newli.innerHTML = joinedPair
		document.querySelector('.saved-list').appendChild(newli)
	})

}

// "Delete" button
const delButton = document.querySelector('#del');
delButton.addEventListener('click', clearList)
function clearList(event){
	document.querySelector('.saved-list').innerHTML = ''
}

// "Show XML" button
const showXMLButton = document.querySelector('#xml')
showXMLButton.addEventListener('click', showXML)
function showXML(event){	
	let listItems = document.querySelectorAll('.saved-list li')
	listItems = Array.from(listItems)
	let serListItems = listItems.map(elem=> {
		let pair = elem.innerHTML.split('=')
		return pair
	})
	let xmlItems = ''
	serListItems.forEach(pair =>{
		xmlItems += '[br][tab]<item>'+'[br][tab][tab]<key>' + pair[0] + '</key>' + '[br][tab][tab]<value>' + pair[0] + '</value>' + '[br][tab]</item>'
	})
	xmlStringStart = '<?xml version="1.0" encoding="UTF-8"?>[br]<list>'
	xmlStringEnd = '[br]</list>'

	fullXML = xmlStringStart + xmlItems + xmlStringEnd
	fullXML = fullXML.replace(/</g, '&#x3C;')
	fullXML = fullXML.replace(/>/g, '&#x3E;')
	fullXML = fullXML.replace(/\[br\]/g, '<br>')
	fullXML = fullXML.replace(/\[tab\]/g, '--')

	// document.querySelector('.show-xml').innerHTML = fullXML
	window.open().document.write(fullXML);


}
