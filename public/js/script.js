const inputUrl = document.getElementById('new-post-url');
const inputCaption = document.getElementById('new-post-caption');
const enteredUrl = document.getElementById('entered-url');
const enteredCaption = document.getElementById('entered-caption');


inputCaption.oninput = () => {
    enteredCaption.innerHTML = inputCaption.value;
};

inputUrl.oninput = () => {
    enteredUrl.setAttribute('src', inputUrl.value);
    console.log(inputUrl.value)
}

if (inputUrl.value === '') {
    enteredUrl.removeAttribute('src');
    enteredUrl.setAttribute('src', 'https://media.musclegrid.io/karate4jax.com/uploads/2017/04/26233456/default-image-800x600.jpg')
    
    console.log(inputUrl.value)
}