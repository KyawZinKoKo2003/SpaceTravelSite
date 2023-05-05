/* 

phone navigation

*/
const navigation = document.querySelector(".primary-navigation");
const navigationIcon = document.querySelector(".mobile-navigation-toggle");
navigationIcon.addEventListener("click", () => {
    const visibility = navigation.getAttribute("data-visible");
    if (visibility === "false") {
        navigation.setAttribute("data-visible", true);
        navigationIcon.setAttribute("aria-expended", true)
    }
    else {
        navigation.setAttribute("data-visible", false);
        navigationIcon.setAttribute("aria-expended", false);
    }
})

/*

end phone navigation
*/


const tablist = document.querySelector('[role="tablist"]');
const tab = tablist.querySelectorAll('[role="tab"]');
var tabFocus = 0;
tablist.addEventListener("keydown", changeTab)
tab.forEach(t => { addEventListener('click', changePanel) });

function changeTab(e) {
    const leftArrowKey = 37;
    const rightArrowKey = 39;
    // change the tab index from 0 to -1
    if (e.keyCode === leftArrowKey || e.keyCode === rightArrowKey) {
        tab[tabFocus].setAttribute("tabindex", -1);
        //handle right arrow key
        if (e.keyCode === rightArrowKey) {
            tabFocus++;
            if (tabFocus >= tab.length) {
                tabFocus = 0;
            }
        }
        else if(e.keyCode === leftArrowKey) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tab.length - 1;
            }
        }
        tab[tabFocus].setAttribute("tabindex", 0);
        tab[tabFocus].focus();
    }

}

function changePanel(e) {
    const targetBtn = e.target;
    const targetPanel = targetBtn.getAttribute("aria-controls");
    const targetImage = targetBtn.getAttribute("data-image");
    const tabContainer = targetBtn.parentNode;
    const mainContainer = tabContainer.parentNode;
    //active link
    mainContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
    targetBtn.setAttribute("aria-selected", true);

    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
    
}
function hideContent(parent, content) {
    parent.querySelectorAll(content).forEach(items => items.setAttribute("hidden", true));
}
function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}