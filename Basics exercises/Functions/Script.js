var btn = document.getElementById("myBtn");
var output = document.getElementById("myInput");

btn.addEventListener("click", function(){
    var inpt = document.getElementById("myInput").value;
    var temp = inpt.toUpperCase();
    output.value = temp;
});

