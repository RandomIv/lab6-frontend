const downloadBtn = document.getElementById('downloadBtn');
const cardsContainer = document.getElementById('cardsContainer');
const message = document.getElementById('message');

function fetchUserData() {
    downloadBtn.disabled = true;
    message.textContent = '';
    cardsContainer.innerHTML = '';

    fetch('https://randomuser.me/api/?results=5')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP помилка! Статус: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            message.textContent = 'success!';
            displayUserCards(data.results);
        })
        .catch(function(error) {
            message.textContent = 'Помилка: ' + error.message;
            console.error('Помилка при завантаженні даних:', error);
        })
        .finally(function() {
            downloadBtn.disabled = false;
        });
}

function displayUserCards(users) {
    users.forEach(function(user) {
        const fullName = user.name.title + ' ' + user.name.first + ' ' + user.name.last;
        const pictureUrl = user.picture.large;
        const city = user.location.city;
        const postcode = user.location.postcode;
        const cell = user.cell;

        const cardHTML = `
            <div class="user-card">
                <img src="${pictureUrl}" alt="User Photo" class="user-picture">
                <div class="user-info">
                    <div class="info-item">
                        <div class="info-label">Місто</div>
                        <div class="info-value">${city}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Поштовий індекс</div>
                        <div class="info-value">${postcode}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Мобільний телефон</div>
                        <div class="info-value">${cell}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Повне ім'я</div>
                        <div class="info-value">${fullName}</div>
                    </div>
                </div>
            </div>
        `;

        cardsContainer.innerHTML += cardHTML;
    });
}

downloadBtn.addEventListener('click', fetchUserData);