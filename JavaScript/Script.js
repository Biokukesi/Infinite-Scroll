const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Data fetching
const initial_count = 5;
const final_count = 30;
const count = initial_count;
const apiKey = 'HTVxVAQTMkJnyrl_88IurJcH2cZAmkoA4aM01fP2ISc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageloaded()
{
  imagesLoaded++;
  if(imagesLoaded === totalImages )
  {
   ready = true;
   loader.hidden = true;
   count = 30;



  }
}
// Helper Function to set Attributes to DOM Elements

function setAttributes(element, attributes)
{
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links and photos

function displayPhotos()
{
  imagesLoaded = 0;
  totalImages = photosArray.length; 
  console.log('total images', totalImages); 

  photosArray.forEach((photo) =>{ 
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank')
    
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    img.addEventListener('load', imageloaded);
    
    // Put the <img> inside <a>, then both in img container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });

}

// Event Listener, check if loaded
 




// Get Photos From api
async function getPhotos()
{
    try
    {
        const responce = await fetch(apiUrl);
        photosArray = await responce.json();
        displayPhotos();
       

    } catch(error)
    {

    }
}

// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', ()=>{
  if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready)
  {
    ready = false;
    getPhotos();
  }
})

// On load
getPhotos();