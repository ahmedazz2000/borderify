

//document.body.style.fontSize = "30px";
//7f6896d28dd2159027258cfb6ecc8c0d0ad8c580

//document.body.style.fontSize = "30px";
//7f6896d28dd2159027258cfb6ecc8c0d0ad8c580

function alret_me(){
alert("hello world");
}

function inform_me(){
alert("hello world");
}


function inform_me2(){
alert("hello world2");
}



var time_gap=0;
var old_text='';
function getSelectionText(e) {
//$( "body" ).append('<div id="selected_text" style="display:none;"></div>');
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
	else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
	text= text.replace(/[^a-zA-Z ]/g, "");
	
	
		//text.length <=20 && 
	if(text.length > 1 && time_gap==0 && old_text!=text){
	old_text=text;
	time_gap=1;
			if(!document.getElementById("new_elemt_ext")){
    var txt = document.createElement("div");
    txt.innerHTML = '<div id="new_elemt_ext" style="z-index:99999;position:fixed;bottom:0px;left: 0px;padding: 10px;margin: 30px;background-color: black;font-size: 25px;color: white;"><span id="close_elemnt" style="position:relative;top:0px;left: 0px;color: red;cursor: pointer;padding: 10px;" >X</span><span id="new_elemt_ext_en">'+text+'</span><span id="new_elemt_ext_ar" style="direction:rtl;float: right;padding-left: 50px;"></span></div>';	
	document.body.appendChild(txt); 
	document.getElementById("close_elemnt").addEventListener("click", close_translate); 

	}
	else{document.getElementById("new_elemt_ext_en").innerHTML=''+text;show_translate();}
	
//alert($("#new_elemt_ext").html())
/*	
	fetch('http://localhost/dictionary/translate.php').then(function(response) {
// Convert to JSON
alert(response)
}).then(function(j) {
// `j` is a JavaScript object
		document.getElementById("new_elemt_ext_ar").innerHTML=html;

});
*/
	
	
	$.ajax({
	url: "http://localhost/dictionary/translate.php",
	method: "GET",
	data: { search_word: text},
	timeout: 7000,
	cache: false
})
	.done(function( html ) {
	$("#new_elemt_ext_ar").html('<textarea id="translated_word" style="color: black; height: 111px; background-color: white;">'+html+'</textarea><input type="hidden" id="org_translated_word" value="'+text.trim().toLowerCase()+'"><br><audio id="myaudio" controls autoplay><source src="https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Heather22k?inputText='+btoa(text.trim().toLowerCase())+'" type="audio/ogg"></audio><br><button style="margin:5px;" id="change_translate_button">Change</button> <button style="margin:5px;" id="google_button">Google</button> <button style="margin:5px;" id="reverso_button">Reverso</button>');
	document.getElementById("change_translate_button").addEventListener("click", update_translate); 
	document.getElementById("google_button").addEventListener("click", google_translate); 
	document.getElementById("reverso_button").addEventListener("click", reverso_translate); 
time_gap=0;

});
/*	*/
	
	}
	}



function update_translate(elmnt){
var translated_word = encodeURIComponent($('#translated_word').val());	
var org_translated_word = encodeURIComponent($('#org_translated_word').val());	
	$.ajax({
	url: "http://localhost/dictionary/update_translate.php",
	method: "GET",
	data: { translated_word: translated_word, org_translated_word: org_translated_word},
	timeout: 7000,
	cache: false
}).done(function( html ) {
$( "#change_translate_button" ).html('Changed ✓');
});	
}


function google_translate(){


var org_translated_word = $('#org_translated_word').val();	
	$.ajax({
	url: "http://localhost/dictionary/translate2.php",
	method: "GET",
	data: { search_word: org_translated_word},
	timeout: 7000,
	cache: false
}).done(function( html ) {
	$('#translated_word').val(html);
$( "#google_button" ).html('Google ✓');

	});


}
function reverso_translate(){


var org_translated_word = $('#org_translated_word').val();	
	$.ajax({
	url: "http://localhost/dictionary/reverso.php",
	method: "GET",
	data: { search_word: org_translated_word},
	timeout: 7000,
	cache: false
}).done(function( html ) {
	$('#translated_word').val(html);
$( "#reverso_button" ).html('Reverso ✓');

	});


}



function close_translate(){
//$("#new_elemt_ext").hide();	
document.getElementById("new_elemt_ext").style.display="none";
}
function show_translate(){
//$("#new_elemt_ext").hide();	
document.getElementById("new_elemt_ext").style.display="block";
}

//= document.onkeyup = document.onselectionchange
document.onmouseup  = function(e) {
 getSelectionText(e);
};

