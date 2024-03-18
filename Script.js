const clickPhrases = [
    "Test your knowledge now!",
    "Think you know it all? Prove it!",
    "Ready to challenge yourself?",
    "Discover how much you really know!",
    "Unlock your inner trivia genius!",
    "Put your brain to the test!",
    "Compete and conquer!",
    "Dare to play?",
    "Join the ultimate trivia challenge!",
    "Find out if you're a trivia whiz!",
    "Can you outsmart the competition?",
    "Challenge your friends!",
    "Time to show off your knowledge!",
    "Think fast and click play!",
    "Embark on a trivia adventure!",
    "Play now and become a trivia master!",
    "Do you have what it takes?",
    "Ready, set, play!",
    "Let's see what you're made of!",
    "Unleash your inner quiz champion!"
];

let playedCategories = [];
let catMap = new Map();

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.textContent;
}

const randomIndex = Math.floor(Math.random() * clickPhrases.length);
const randomPhrase = clickPhrases[randomIndex];

$("#index-typewriter-text").text(randomPhrase);

$("header nav a").hover(
    function() {
      $(this).siblings().stop().animate({ opacity: 0.4 }, 300);
    },
    function() {
      $(this).siblings().stop().animate({ opacity: 1 }, 300);
    }
);

$(".Logo").hover(
    function() {
        $(this).parent().siblings().stop().animate({ opacity: 0.4 }, 300);
    },
    function() {
        $(this).parent().siblings().stop().animate({ opacity: 1 }, 300);
    }
);

$("#PLAY").click(function(){
    $(this).animate({"font-size": "1.5em"}, 100);
    $(this).animate({"font-size": "2em"}, 100);
});

$.getJSON("https://opentdb.com/api_category.php", function(result) {
    const categoryMap = new Map();

    result.trivia_categories.forEach(category => {
        categoryMap.set(category.name, category.id);
    });

    console.log(categoryMap);
    catMap = categoryMap

    categoryMap.forEach(function(id, name) {
        $("#game-choice-wrapper").append('<a href="#" id="' + id + '" class="category-choice">' + name + '</a>');
    });
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error fetching data:', errorThrown);
});

$("#game-choice-wrapper").on("click", ".category-choice", function() {
    setUp($(this).attr('id'));
});

function setUp(id){
    let token = "";
    let categories = [];
    $("#game-score-container").show();
    
    playedCategories.push(id);

    const waitToken = $.getJSON("https://opentdb.com/api_token.php?command=request")
        .then(function(result) {
            token = result.token;
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching token:', errorThrown);
        });

    const waitCategories = $.getJSON("https://opentdb.com/api.php?amount=10&category=" + id + "&type=multiple")
        .then(function(result) {
            $("title").text(decodeHtml(result.results[1].category))
            categories = result.results;
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching categories:', errorThrown);
        });    

    $.when(waitToken, waitCategories).then(function() {
        play(token, categories);
    });
}

function showCategories() {
    $("#game-choice-wrapper").empty();
    console.log(playedCategories)

    catMap.forEach(function(id, name) {
        $("#game-choice-wrapper").append('<a href="#" id="' + id + '" class="category-choice">' + name + '</a>');

        if (playedCategories.includes("" + id + "")) {
            $("#" + id + "").css("opacity", "0.35");
            $("#" + id).removeClass("category-choice");
        }
    });
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function answerQuestion(question, rightAns, wrongAns) {
    $("#game-typewriter").css("white-space", "wrap")
    $("#game-typewriter").css("border", "Hidden")
    $("#game-choice-wrapper").empty();
    $("#game-typewriter h1").text(decodeHtml(question));
    $("#game-typewriter h1").css("font-size", "1.5em");
    
    const options = [rightAns, ...wrongAns];
    
    const shuffledOptions = shuffleArray(options);

    shuffledOptions.forEach(function(item) {
        $("#game-choice-wrapper").append('<a href="#" class="game-choice">' + item + '</a>');
    });

    return new Promise((resolve, reject) => {
        $(".game-choice").click(function() {
            const selectedAnswer = $(this).text();
            if (selectedAnswer === rightAns) {
                $("#game-score").text(parseInt($("#game-score").text()) + 1);
                $(this).animate({"box-shadow": "0 0 40px rgb(255, 255, 255)"}, 500);
                $(this).css({"box-shadow": "0 0 40px green"});
                setTimeout(() => {
                    resolve(selectedAnswer);
                }, 1000);
            } else {
                if (parseInt($("#game-score").text()) !== 0){
                    $("#game-score").text(parseInt($("#game-score").text()) - 1);
                }
                $(this).animate({"box-shadow": "0 0 40px rgb(255, 255, 255)"}, 500);
                $(this).css({"box-shadow": "0 0 40px red"});
                setTimeout(() => {
                    resolve(selectedAnswer);
                }, 1000);
            }
        });
    });
}

v26_uLKXE7P5kpt


async function play(token, questions) {
    try {
        for (let i = 0; i < questions.length; i++) {
            const category = questions[i];
            await answerQuestion(category.question, category.correct_answer, category.incorrect_answers);
        }
        showCategories();
    } catch (error) {
        console.error('Error during gameplay:', error);
    }
}