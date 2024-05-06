document.getElementById("search-btn").addEventListener("click", function() {
    var searchTerm = document.getElementById("search-input").value;
    searchBooks(searchTerm);
  });
  
  function searchBooks(searchTerm) {
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(searchTerm);
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayResults(data);
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
      });
  }
  
  function displayResults(data) {
    var resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = '';
  
    if (data.totalItems === 0) {
      resultsContainer.innerText = 'Книги не найдены.';
      return;
    }
  
    data.items.forEach(item => {
      var title = item.volumeInfo.title;
      var authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Автор неизвестен';
      
      var resultItem = document.createElement('div');
      resultItem.classList.add('book-result');
      resultItem.innerHTML = '<strong>' + title + '</strong> - ' + authors + '<button class="buy-btn">Купить</button>';
      resultsContainer.appendChild(resultItem);
  
      var buyButton = resultItem.querySelector('.buy-btn');
      buyButton.addEventListener('click', function() {
        showPurchaseForm(title);
      });
    });
  }
  
  function showPurchaseForm(bookTitle) {
    var formHtml = `
      <form id="purchase-form">
        <label for="name-input">Имя:</label><br>
        <input type="text" id="name-input" name="name" required><br>
        <label for="email-input">Почта:</label><br>
        <input type="email" id="email-input" name="email" required><br>
        <label for="phone-input">Телефон:</label><br>
        <input type="tel" id="phone-input" name="phone" required><br>
        <label for="address-input">Адрес:</label><br>
        <input type="text" id="address-input" name="address" required><br><br>
        <button type="submit">Отправить</button>
      </form>
    `;
    
    var formContainer = document.createElement('div');
    formContainer.innerHTML = formHtml;
    formContainer.classList.add('purchase-form-container');
  
    var closeButton = document.createElement('button');
    closeButton.innerText = 'Закрыть';
    closeButton.classList.add('close-btn');
    closeButton.addEventListener('click', function() {
      formContainer.remove();
    });
  
    formContainer.appendChild(closeButton);
    document.body.appendChild(formContainer);
  
    var purchaseForm = document.getElementById('purchase-form');
    purchaseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var formData = new FormData(purchaseForm);
      submitPurchaseForm(formData, bookTitle);
    });
  }
  
  function submitPurchaseForm(formData, bookTitle) {
    // Здесь можно отправить данные формы на сервер или выполнить другие операции
    // В данном примере мы просто выведем данные в консоль
    console.log('Название книги:', bookTitle);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
  }
  const https = require('https');

  // Задаем URL Google Apps Script, куда будем отправлять GET-запрос
  const url = 'https://script.google.com/u/0/home/projects/1xj0BF35W6_kIskWmlEo0owVA8axeMiC--51wbKDQpamwLv0WKBgJOUC9/edit';
  
  // Формируем данные, которые будем добавлять в таблицу
  const bookTitle = 'Название книги';
  const authorName = 'Имя автора';
  
  // Формируем строку запроса с параметрами (название книги и автор)
  const queryParams = `?title=${encodeURIComponent(bookTitle)}&author=${encodeURIComponent(authorName)}`;
  
  // Формируем полный URL с параметрами
  const fullUrl = url + queryParams;
  
  // Выполняем GET-запрос
  https.get(fullUrl, (res) => {
    let data = '';
  
    // Получаем данные
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    // Обрабатываем ответ
    res.on('end', () => {
      console.log('Данные успешно добавлены в таблицу.');
      console.log('Ответ сервера:', data);
    });
  }).on('error', (err) => {
    console.log('Ошибка при выполнении запроса:', err.message);
  });  
  