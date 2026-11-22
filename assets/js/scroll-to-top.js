var topScroll = document.getElementById("topScroll");
if (topScroll) {
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topScroll.style.display = "block";
    } else {
      topScroll.style.display = "none";
    }
  };
  topScroll.addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
