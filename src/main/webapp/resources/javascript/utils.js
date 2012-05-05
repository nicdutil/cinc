/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


 window.onload = function initSelectedButton() 
 {
        window.selectedButton = document.getElementById('aboutus');  
        window.selectedButton.style.borderLeftColor="rgba(220,0,0,0.5)";
        window.selectedButton.style.color="rgba(188,127,0,0.9)";
 };

function colorSelectedButton(data)
{
    var inputId = data.source.id;
    var button = document.getElementById(inputId);
    
    if (data.status == "success" && !(window.selectedButton === button)) {
      
        button.style.borderLeftColor = "rgba(220,0,0,0.5)";
        button.style.color="rgba(188,127,0,0.9)";    
        window.selectedButton.style.borderLeftColor="rgba(0,0,0,0)";
        window.selectedButton.style.color="rgba(0,0,0,0.85)";
        window.selectedButton = button;
    }
}

 
   