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
        image: "images/5.webp", // Путь к картинке вопроса
        answers: ["С 16 лет (или с 15, имея общее образование)", "Только с 18 лет", "С 21 года", "Не знаю"],
        correct: "С 16 лет (или с 15, имея общее образование)"
    },
    {
        image: "images/6.webp",
        answers: ["Сегодня", "В течение 5 рабочих дней", "В течение 3 рабочих дней", "На следующий день после начала работы"],
        correct: "В течение 3 рабочих дней"
    },
    {
        image: "images/7.webp",
        answers: ["Нужно зайти на портал Госуслуг, заказать услугу «Оформление электронной трудовой»", "Подписать трудовой договор и ознакомиться с приказом о приеме на работу", "Написать заявление о переходе на электронную трудовую книжку в свободной форме", "Обратиться в Администрацию города и попросить оформить электронную трудовую книжку"],
        correct: "Подписать трудовой договор и ознакомиться с приказом о приеме на работу"
    },
    {
        image: "images/8.webp",
        answers: ["60 часов в неделю", "30 часов в неделю", "40 часов в неделю", "80 часов в неделю"],
        correct: "40 часов в неделю"
    },
    {
        image: "images/10.webp",
        answers: ["Нет, не ходить в отпуск можно только по согласию сторон", "Нет, работодатель обязан предоставить отпуск", "Не знаю", "Да, работодатель может заменить отпуск сотрудника денежной компенсацией или перенести его на следующий год"],
        correct: "Нет, работодатель обязан предоставить отпуск"
    },
    {
        image: "images/11.webp",
        answers: ["Только на сокращенный отпуск", "Нет", "Да, как и другие работники организации", "Не знаю"],
        correct: "Да, как и другие работники организации"
    },
    {
        image: "images/12.webp",
        answers: ["Да, государство гарантирует оплачиваемые выходные для диспансеризации", "Да, работодатель платит денежную компенсацию", "Нет, на время диспансеризации нужно брать отпуск за свой счёт", "Нет, будет удержание из заработной платы"],
        correct: "Да, государство гарантирует оплачиваемые выходные для диспансеризации"
    },
    {
        image: "images/13.webp",
        answers: ["Да, при этом сотрудник получает право выбрать себе выходную неделю в любое время", "Нет, но можно взять неоплачиваемый отпуск", "Да, работодатель сохраняет за работником его средний заработок за дни сдачи и предоставленные в связи с этим дни отдыха", "Не знаю"],
        correct: "Да, работодатель сохраняет за работником его средний заработок за дни сдачи и предоставленные в связи с этим дни отдыха"
    },
    {
        image: "images/14.webp",
        answers: ["Не менее чем в двойном размере", "Не менее чем в тройном размере", "Как и в другие дни", "Не знаю"],
        correct: "Не менее чем в двойном размере"
    },
    {
        image: "images/15.webp",
        answers: ["HR-отдел", "Бухгалтерия", "Кабинет директора", "Отдел корпоративной культуры"],
        correct: "Бухгалтерия"
    },
    {
        image: "images/16.webp",
        answers: ["3 дней", "1 месяц", "3 месяца", "Не знаю"],
        correct: "3 месяца"
    },
    {
        image: "images/18.webp",
        answers: ["Зарплаты, компенсации за неиспользованные отпуска, другие выплаты, предусмотренные трудовым договором", "Только зарплату", "Зарплаты и пособие по безработице", "Не знаю"],
        correct: "Зарплаты, компенсации за неиспользованные отпуска, другие выплаты, предусмотренные трудовым договором"
    },
    {
        image: "images/19.webp",
        answers: ["По собственному желанию", "По соглашению сторон", "По инициативе работодателя, например, в связи с ликвидацией организации, сокращением штата работников организации", "Все варианты верны"],
        correct: "Все варианты верны"
    },
    {
        image: "images/20.webp",
        answers: ["Да, в любое время", "Нет, увольняться нельзя в любом случае", "Не знаю", "Да, нужно подать заявление за 2 недели до планируемой даты увольнения"],
        correct: "Да, нужно подать заявление за 2 недели до планируемой даты увольнения"
    },
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
    } else if (score > 4) {
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
