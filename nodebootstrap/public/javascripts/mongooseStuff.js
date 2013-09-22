function validateForm()
{
  var x = document.forms["getUrl"]["urlin"].value;
  if (x == null || x == "")
   {
     alert("Must have some form of input here!");
     return false;
   }
  alert(x); 
  extract_feels(x);
}
