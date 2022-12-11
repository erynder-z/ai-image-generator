document.getElementById('image-form').addEventListener('submit', onsubmit);

function onsubmit(e) {
  e.preventDefault();

  document.getElementById('msg').textContent = '';
  document.getElementById('image').src = '';
  const prompt = document.getElementById('prompt').value;
  const size = document.getElementById('size').value;

  if (prompt === '') {
    alert('please enter some text!');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showLoading();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, size }),
    });

    if (!response.ok) {
      hideLoading();
      throw new Error('Image could not be generated');
    }

    const imgData = await response.json();
    const imageUrl = imgData.data;

    document.getElementById('image').src = imageUrl;

    hideLoading();
  } catch (err) {
    document.getElementById('msg').textContent = err;
    hideLoading();
  }
}

const showLoading = () => {
  document.querySelector('.loader-overlay').classList.add('show');
};

const hideLoading = () => {
  document.querySelector('.loader-overlay').classList.remove('show');
};
