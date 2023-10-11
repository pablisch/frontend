const button1 = document.querySelector('.press-me');
const button2 = document.querySelector('.dont-press-me');

button1.addEventListener('click', async () => {
  // check if any p elements exist
  const pElements = document.querySelectorAll('p');
  if (pElements.length === 0) {
    try {
      const res = await fetch('http:////127.0.0.1:3000/', { method: 'GET' })
      const data = await res.json();
      console.log(data);
      const resultElement = document.createElement('p');
      resultElement.textContent = JSON.stringify(data);
      document.body.appendChild(resultElement);
    } catch (err) {
      console.log(err)
    }
  }
});

button2.addEventListener('click', async () => {
  const pElements = document.querySelectorAll('p');
  pElements.forEach(element => element.remove());
});
