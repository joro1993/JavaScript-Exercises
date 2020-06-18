/*Jag skapade en funktion som heter showtime. I denna funktion så skapade
 jag 4 variablar där jag hämtade aktuella datum med new date.
I varje variabel så skrev jag in timmar, minuter och sekunder med funktionen showTime.
Jag skapade en variabel också som heter session som är en string som det står "F.M" i. 
*/ 
function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = " F.M";

    if(h == 0){
        h = 12;
    }
// Om variabel H är större än 12 blir det "=" E.M istället för F.M.
    if(h > 12){
        h = h - 12;
        session = " E.M";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
// Variabel "var time" sattes här för att programmet ska skilja mellan timmar, minuter och sekunder.
// "+m" kommer få minuterna att visas på hemsidan
// "+s" kommer visa sekunderna på hemsidan
// "+session" visar ifall det är förmiddag eller eftermiddag förkortat "F.M" och "E.M"
// jag hämtade id clockwork genom document.getElementbyId 

    var time = h + ":" + m + ":" + s + session;
    document.getElementById("clockWork").innerText = time;
    document.getElementById("clockWork").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();