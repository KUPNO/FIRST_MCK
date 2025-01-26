// Инициализация VK Bridge
vkBridge.send('VKWebAppInit')
    .then((data) => {
        if (data.result) {
            console.log('Приложение успешно инициализировано!');
        } else {
            console.log('Ошибка инициализации приложения.');
        }
    })
    .catch((error) => {
        console.error('Ошибка VK Bridge:', error);
    });

// Список вопросов
const questions = [
    {
        image: "images/question1.jpg", // Путь к картинке вопроса
        answers: ["2", "4", "5", "3"],
        correct: "5"
    },
    {
        image: "images/question2.jpg",
        answers: ["Python", "JavaScript", "C++", "Java"],
        correct: "JavaScript"
    },
    {
        image: "images/question3.jpg",
        answers: ["Дж.К. Роулинг", "Толкин", "Чехов", "Пушкин"],
        correct: "Дж.К. Роулинг"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const image = document.getElementById("question-image");
    const answersDiv = document.getElementById("answers");

    // Устанавливаем изображение вопроса
    image.src = question.image;

    // Очищаем предыдущие ответы
    answersDiv.innerHTML = "";

    // Отображаем варианты ответа
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];

    // Проверяем ответ
    if (answer === question.correct) {
        score++;
    }

    // Переходим к следующему вопросу или показываем результат
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const container = document.getElementById("quiz-container");
    const resultDiv = document.getElementById("result");

    // Скрываем викторину
    container.style.display = "none";

    // Очищаем предыдущие результаты
    resultDiv.innerHTML = "";

    // Выбираем картинку для результата
    let resultImage = "";

    if (score === questions.length) {
        resultImage = "images/result_perfect.jpg"; // Картинка для максимального результата
    } else if (score > questions.length / 2) {
        resultImage = "images/result_good.jpg"; // Картинка для хорошего результата
    } else if (score > 0) {
        resultImage = "images/result_average.jpg"; // Картинка для среднего результата
    } else {
        resultImage = "images/result_bad.jpg"; // Картинка для плохого результата
    }

    // Отображаем картинку результата
    const img = document.createElement("img");
    img.src = resultImage;
    img.alt = "Результат";
    resultDiv.appendChild(img);

    // Добавляем кнопку "Попробовать снова"
    const retryButton = document.createElement("button");
    retryButton.textContent = "Попробовать снова";

    // Добавляем обработчик клика для сброса викторины
    retryButton.onclick = () => {
        currentQuestionIndex = 0;
        score = 0;
        resultDiv.innerHTML = ""; // Очищаем результаты
        container.style.display = "block"; // Показываем викторину
        showQuestion(); // Показываем первый вопрос
    };

    // Применяем стили для кнопки
    retryButton.style.marginTop = "20px";
    retryButton.style.padding = "10px 20px";
    retryButton.style.fontSize = "1.2em";
    retryButton.style.color = "white";
    retryButton.style.backgroundColor = "rgba(128, 128, 128, 0.8)";
    retryButton.style.border = "none";
    retryButton.style.borderRadius = "5px";
    retryButton.style.cursor = "pointer";

    retryButton.onmouseover = () => {
        retryButton.style.backgroundColor = "rgba(192, 192, 192, 0.8)";
    };

    retryButton.onmouseout = () => {
        retryButton.style.backgroundColor = "rgba(128, 128, 128, 0.8)";
    };

    resultDiv.appendChild(retryButton); // Добавляем кнопку в div с результатами
}

// Запуск викторины
startQuiz();
