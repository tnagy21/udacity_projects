/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
// used in setActiveSection function, added globaly to save perfotmance from retrive the active section while user scrolling.
let activeSection = document.getElementsByClassName('your-active-class')[0];
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
 * @description Add or remove style from li and section.
 * @param {Element} section - Apply style to this section.
 * @param {string} sectionClass - New style to the section. 
 * @param {string} addLiClass - Style to be added to li.
 * @param {string} removeLiClass - Style to be removed from to li.
 */
function addRemoveStyle(section, sectionClass, addLiClass, removeLiClass)
{
    let li = document.getElementById(section.id + 'li' )
    li.classList.remove(removeLiClass);
    li.classList.add(addLiClass);

    sectionClass == '' ? section.classList.remove(...section.classList)  : section.classList.add(sectionClass);
}
/**
 * @description During user scroll, loop on all sections and if the section in the viewport
 * then apply active style on the section and the menu link of this section.
 */
function setActiveSection()
{
    sections.forEach(section => { 
            let sectionBounding = section.getBoundingClientRect();

            // The current section in the loop is the active section and does not apply active style yet.
            if (sectionBounding.top >= 0 &&  sectionBounding.top <sectionBounding.height && section.id != activeSection.id)
            {
                    //Remove active style from old active section and old active menu link
                    addRemoveStyle(activeSection, '', 'menu__link','active__menu');

                    //Add active style to the active section and active menu link.
                    addRemoveStyle(section, 'your-active-class', 'active__menu','menu__link');
                    
                    activeSection =  section;
            }
        }
    )
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description Loop on the sections and build the menu link for each section which scroll smoothly to its section
 * then add them to the UL element in the header.
 */
function buildNav()
{
    //using fragment to enahnce performance of adding menu links.
    const fragment = document.createDocumentFragment();
    
    sections.forEach(section => { 
            //Get section name
            let secName = section.getAttribute('data-nav');
            let txtNode = document.createTextNode(secName);

            // Create new LI for each section and set its style.
            let liElement = document.createElement('li'); 
            liElement.id = section.id + 'li';  
            if (section.className == 'your-active-class')
                liElement.className = 'active__menu';
            else
                liElement.className = 'menu__link';

            //Create new link for each section
            let anchor = document.createElement('a');
            anchor.addEventListener('click', () => {
                section.scrollIntoView({behavior:'smooth'});
            });
            anchor.id = section.id + 'anchor';
            
            // Add the new link to the fragment
            anchor.appendChild(txtNode);
            liElement.appendChild(anchor);
            fragment.appendChild(liElement);
        }
    );
    const ulElement = document.getElementById('navbar__list')
    ulElement.appendChild(fragment)
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Set sections as active
document.addEventListener('scroll',setActiveSection)

/** 
 * End Events
*/