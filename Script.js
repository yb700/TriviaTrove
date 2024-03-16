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

const randomIndex = Math.floor(Math.random() * clickPhrases.length);
const randomPhrase = clickPhrases[randomIndex];

$("#index-typewriter-text").text(randomPhrase);

$("header nav a").hover(
    function() {
      $(this).siblings().stop().animate({ opacity: 0.5 }, 300);
    },
    function() {
      $(this).siblings().stop().animate({ opacity: 1 }, 300);
    }
);

$(".Logo").hover(
    function() {
        $(this).parent().siblings().stop().animate({ opacity: 0.5 }, 300);
    },
    function() {
        $(this).parent().siblings().stop().animate({ opacity: 1 }, 300);
    }
);

$("#PLAY").click(function(){
    $(this).animate({"font-size": "10px"}, 1000);
});