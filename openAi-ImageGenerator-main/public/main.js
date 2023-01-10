function onSubmit(e) {
    e.preventDefault();
  
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
  
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
  
    if (prompt === '') {
      alert('Add some request.');
      return;
    }
  
    generateImageRequest(prompt, size);
  }
  
  async function generateImageRequest(prompt, size) {
    try {

      const response = await fetch('/openai/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Image not generated');
      }
  
      const data = await response.json();
  
      const imageUrl = data.data;
  
      document.querySelector('#image').src = imageUrl;

    } catch (error) {
      document.querySelector('.msg').textContent = error;
    }
  } 
  
  document.querySelector('#image-form').addEventListener('submit', onSubmit);