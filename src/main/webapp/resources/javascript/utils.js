/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


 window.onload = function initSelectedButton() 
 {
        window.selectedButton = document.getElementById('aboutUs');  
        window.selectedButton.style.borderLeftColor="rgba(199,0,0,1)";
        window.selectedButton.style.color="rgba(188,127,0,1)";
      
 };
 

 
function colorSelectedButton(data)
{
    var inputId = data.source.id;
    var button = document.getElementById(inputId);
   
    if (!(window.selectedButton === button))
    {
      
        
       if (data.status == "success")
       {
     
          button.style.borderLeftColor = "rgba(199,0,0,1)";
          button.style.color="rgba(188,127,0,1)";    
          window.selectedButton.style.borderLeftColor="rgba(0,0,0,0)";
          window.selectedButton.style.color="white";
          window.selectedButton = button;
        
       }
   }
  }


 
   