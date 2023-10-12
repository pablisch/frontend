import formExtractor from './util/formExtractor.js';  

const button1 = document.querySelector('.press-me');
const button2 = document.querySelector('.dont-press-me');

button1.addEventListener('click', async () => {
  // check if any p elements exist
  const pElements = document.querySelectorAll('p');
  if (pElements.length === 0) {
    try {
      const res = await fetch('http://127.0.0.1:3000/', { method: 'GET' })
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

document.getElementById("submit-form").addEventListener("click", async(e) => {
  e.preventDefault();

  const form = document.getElementById("user-form");

  const formData = new FormData(form);

  for (const entry of formData) {
    console.log(entry[0], entry[1]);
  }

  console.log('formData name:', formData.get("name")); 
  
  const processedData = formExtractor(formData);

  if (!processedData) {
    console.log('Doh!');
    const noticeElement = document.createElement('p');
      noticeElement.textContent = "Some fields are incomplete.";
      document.body.appendChild(noticeElement);
      setTimeout(() => {
        noticeElement.remove();
      }, 3000);
    return;
  } else {
    console.log('Yay!');
    try {
      const res = await fetch('http://127.0.0.1:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(processedData)
      })
      const data = await res.text();
      console.log(data);
      const noticeElement = document.createElement('p');
      noticeElement.textContent = `New user created for ${processedData.name}`;
      document.body.appendChild(noticeElement);
      setTimeout(() => {
        noticeElement.remove();
      }, 3000);
    } catch (err) {
      console.log(err)
    }
  }
});

