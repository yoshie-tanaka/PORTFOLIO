const targetElements = document.querySelectorAll(".animationTarget");
/* console.log(targetElements); */

console.log("画面の高さ", window.innerHeight);
document.addEventListener("scroll",  function() {
    for (let i = 0; i < targetElements.length; i++) {
        const getElementDistance = targetElements[i].getBoundingClientRect().top + targetElements[i].clientHeight * 0.6;

        if( i === 1){
            console.log(getElementDistance);
        }
        
        // liが見えたらHTMLにshowとつくようにする
        if (window.innerHeight > getElementDistance) {
            targetElements[i].classList.add("show");
        }
   }
})
