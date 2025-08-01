

const exp = (function() {


    var p = {};

    const playOrPredict = "play"; 

    const colorCondition = Math.floor(Math.random() * 2);

    const goalTypeCondition = Math.floor(Math.random() * 2);

    const hitRateCondition = Math.floor(Math.random() * 2);

    const gameNames = [['<span class="red-game">Red Game</span>', '<span class="blue-game">Blue Game</span>'], ['<span class="blue-game">Blue Game</span>', '<span class="red-game">Red Game</span>']][colorCondition]; 

    const colors = [["red", "blue"], ["blue", "red"]][colorCondition]; 

    const hitRates = [["win", "loss"], ["loss", "win"]][hitRateCondition]; 

    const goalType = ["minLose", "minLose"][goalTypeCondition];

    const previewImg_1 = [`${colors[0]}-${hitRates[0]}`];

    const previewImg_2 = [`${colors[1]}-${hitRates[1]}`];

    const nTrials = 20;

    jsPsych.data.addProperties({
        playOrPredict: playOrPredict,
        goalType: goalType,
    });


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        welcome: [
            `<div class='parent'>
                <p><strong>Welcome!</strong></p>
                <p>In this survey, you'll play two different games.</p>
                <p>After each game, you'll report how you felt while playing it.</p>
            </div>`,

            `<div class='parent'>
                <p>The first game you'll play is called the ${gameNames[0]}.</p>
                <p>The goal of the ${gameNames[0]} is to win as many points as possible.</p>
                <p>You'll win points by spinning a prize wheel.</p>
            </div>`,

            `<div class='parent'>
                <p>In the ${gameNames[0]}, the wheel looks like this:</p>                
                <img src="./img/${previewImg_1}-5.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>Wedges with a J are "jackpot wedges."</p>
                <p>Wedges with a 5 are "5-point wedges."</p>
                <img src="./img/${previewImg_1}-5.png" style="width:400px; height:400px">
            </div>`,
        ],

        maxWin: [
            `<div class='parent'>
                <p>In the ${gameNames[0]}, earnings are based on winning streaks: the longer your winning streaks, the more points you'll earn. Specifically, each time you break a winning streak, you'll learn a "jackpot." Each jackpot is worth a minimum of 0 points and increases by 1 point for each consecutive win.</p>
                <p>To summarize:</p>
                <p>0 wins before a loss = 0 points</br>
                1 win before a loss = 1 point</br>
                2 wins before a loss = 2 points</br>
                3 wins before a loss = 3 points</br>
                4 wins before a loss = 4 points</br>
                5 wins before a loss = 5 points</br>
                ...</p>
            </div>`,

            `<div class='parent'>
                <p>The length of your current winning streak is displayed throughout the game.
                <br>For example, after 3 consecutive wins, you'd see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="score-board">
                        <div class="score-board-title">Current Jackpot</div>
                        <div class="score-board-score" id="score">3</div>
                    </div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>After each loss, a message appears indicating the number of points you won.</p>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you lose after 3 consecutive wins, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-body" style="color:${colors[0]}">+3 points</div>
                </div>
            </div>`
        ],

        minLose: [
            `<div class='parent' style="text-align:left; width:875px">
                <p>In the ${gameNames[0]}, your goal is to earn as many points as possible.</p>

                <p>Here's how it works:</p>

                <ul>
                  <li>There is a jackpot that starts at <strong>50 points</strong>.</li>
                  <li>Each time you land on a <strong>5-point wedge</strong>, you win <strong>5 points</strong> and the jackpot shrinks by <strong>1 point</strong>.</li>
                  <li>If you land on a <strong>jackpot wedge</strong>, you win the <strong>full remaining jackpot</strong></li>
                  <li>After the jackpot is won (or reaches 0), it resets to 50, and the cycle starts again.</li>
                </ul>

                <p><strong>So: the faster you hit the jackpot, the more points you earn!</strong></p>
            </div>`,

            `<div class='parent'>
                <p>The current jackpot is displayed throughout the game.
                <br>For example, after 10 spins without winning a jackpot, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="score-board">
                        <div class="score-board-title">Current Jackpot</div>
                        <div class="score-board-score" id="score">40</div>
                    </div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>After each spin, a message appears indicating the number of points you won.</p>
            </div>`,

            `<div class='parent'>
                <p>For example, if you land on a <strong>jackpot wedge</strong> when the jackpot is worth 40 points, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-body" style="color:${colors[0]}">+40 Points</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>If you land on a <strong>5-point wedge</strong>, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-body" style="color:${colors[0]}">+5 Points</div>
                </div>
            </div>`,

        ],

        play: [
            `<div class='parent'>
                <p>To spin the prize wheel, just grab and pull it with your cursor.</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/${previewImg_1}-gif-5.gif" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>After finishing the ${gameNames[0]}, you'll report how <b>immersed</b> and <b>absorbed</b> you felt playing it.</p>
                <p><b>IMPORTANT:</b> You will <i>not</i> rate how much you liked or enjoyed the ${gameNames[0]}. The focus is solely on your sense of immersion and absorption.</p>
            </div>`,   
        ],

        nextRound: [
            `<div class='parent'>
                <p>The ${gameNames[0]} is now complete!</p>
                <p>Next, you'll play the second game.</p>
            </div>`,

            `<div class='parent'>
                <p>The second game is called the ${gameNames[1]}.</p>
                <p>The ${gameNames[1]} is identical to the ${gameNames[0]} with one excepction: The wheel is different.</p>
                <p>Specifically, in the ${gameNames[1]} the wheel looks like this:</p>
                <img src="./img/${previewImg_2}-5.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>After finishing the ${gameNames[1]}, you'll report how <b>immersed</b> and <b>absorbed</b> you felt playing it.</p>
                <p><b>IMPORTANT:</b> You will <i>not</i> rate how much you liked or enjoyed the ${gameNames[1]}. The focus is solely on your sense of immersion and absorption.</p>
            </div>`,   
        ],

        postIntro: [   
            `<div class='parent'>
                <p>You're ready to begin!</p>
                <p>To start, continue to the next screen.</p>
            </div>`,      
        ],

        postTask: [
            `<div class='parent'>
                <p>The task is now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],
    };


    const intro = {
        type: jsPsychInstructions,
        pages: (goalType == "maxWin") ? [...html.welcome, ...html.maxWin, ...html.play] : [...html.welcome, ...html.minLose, ...html.play],
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    const ans1 = (goalType == "maxWin") ? `41` : `41`;

    const ans2 = (playOrPredict == "play") ? `Report how immersed and absorbed I felt playing it.` : `I will predict how immersed and absorbed an average person would feel playing Feel the Spin with different wheels.`;

    const correctAnswer = [ans1, ans2];

    const options_play = [
        `Report how happy I felt playing it.`, 
        `Report how much I enjoyed playing it.`,
        `Report how immersed and absorbed I felt playing it.`,
        `Report how much I liked playing it.`
    ];

    const options_predict = [
        `I will predict how happy an average person would feel playing Feel the Spin with different wheels.`, 
        `I will predict how much an average person would enjoy playing Feel the Spin with different wheels.`,
        `I will predict how immersed and absorbed an average person would feel playing Feel the Spin with different wheels.`,
        `I will predict how much an average person would like playing Feel the Spin with different wheels.`
    ];

    const options = (playOrPredict == "play") ? options_play : options_predict;

    const winningOrLosing = (goalType == "maxWin") ? ["losing", "winning"] : ["winning", "losing"];

    const errorMessage = {
        type: jsPsychInstructions,
        pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand the game, please continue to re-read the instructions.</p></div>`],
        show_clickable_nav: true,
        allow_keys: false,
    };

    const attnChk = {
        type: jsPsychSurveyMultiChoice,
        preamble: `<div class='parent'>
            <p>Please answer the following questions.</p>
            </div>`,
        questions: [
            {
                prompt: `How much is a jackpot worth after landing on 9 consecutive 5-point wedges?`, 
                name: `attnChk1`, 
                options: ["9", "19", "41", "50"],
            },
            {
                prompt: `What will do you after playing the ${gameNames[0]}?`, 
                name: `attnChk2`, 
                options: options_play,
            },
        ],
        scale_width: 500,
        on_finish: (data) => {
              const totalErrors = getTotalErrors(data, correctAnswer);
              data.totalErrors = totalErrors;
        },
    };

    const conditionalNode = {
      timeline: [errorMessage],
      conditional_function: () => {
        const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.instLoop = {
      timeline: [intro, attnChk, conditionalNode],
      loop_function: () => {
        const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.postIntro = {
        type: jsPsychInstructions,
        pages: html.postIntro,
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    p.transition = {
        type: jsPsychInstructions,
        pages: [...html.nextRound, ...html.postIntro],
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./html/consent.html",
        cont_btn: "advance",
    };

    
   /*
    *
    *   TASK
    *
    */

    const reds = ["#F25555", "#951C1C"]

    const blues = ["#558CF2", "#1C3C95"]

    // wedge colors
    let vibrantColors = [
     // "#D32F2F", // Vivid Red
      "#FBC02D", // Bright Yellow
     // "#43A047", // Medium Bright Green
     // "#1976D2", // Vivid Blue
      "#7B1FA2", // Vivid Purple
     // "#F57C00", // Bright Orange
      "#00838F", // Deep Cyan
      "#E91E63"  // Bright Magenta
    ];

    vibrantColors = jsPsych.randomization.repeat(vibrantColors, 1);

    // define each wedge
    const wedges = {
        lose: {color: null, font: 'white', label:"5", points: 0},
        win: {color: null, font: 'white', label:"J", points: 1},
    };

    // define each wheel
    let target_wheels = [
        {sectors: [ wedges.lose, wedges.lose, wedges.lose, wedges.lose, wedges.win ], wheel_id: 1, reliability: 1, label: "100%", nWin: 1, ev: 5, mi: 1},
        {sectors: [ wedges.win, wedges.win, wedges.win, wedges.win, wedges.lose  ], wheel_id: 2, reliability: 1, label: "100%", nWin: 4, ev: 7.67, mi: .65},
    ];

    if (hitRateCondition == 0) { target_wheels = [target_wheels[1], target_wheels[0]] };

    // html functions
    const displayFeedback = (body, color) => {
        return `<div class="score-board-blank"></div> 
        <div class="feedback-container">
        <div class="feedback-body" style="color:${color}">${body}</div>
        </div>`;
    };

    const displayJackpot = (jackpot, color) => {
        return `<div class="score-board">
                    <div class="score-board-title">Current Jackpot</div>
                    <div class="score-board-score" id="score" style="color:${color}; font-size:50px"><b>${jackpot}</b></div>
                </div>
                <div id="jspsych-canvas-button-response-stimulus">
                    <div style="height:500px; width:500px"></div>
                </div>`
    };


    const MakeSpinLoop = function(wheel, round, play, color, gameName) {

        let outcome;
        let jackpot = (goalType == "maxWin") ? 0 : 50;
        let trial = 1;
        let losingStreak = 0;
        let winningStreak = 0;
        let losingStreak_final = 0;
        let winningStreak_final = 0;

        // trial: spinner
        const spin = {
            type: jsPsychCanvasButtonResponse,
            stimulus: function(c, spinnerData) {
                if (trial == 1) {
                    wedges.win.color = (color == "red") ? reds[0] : blues[0]
                    wedges.lose.color = (color == "red") ? reds[1] : blues[1]
                };
                shuffledSectors = jsPsych.randomization.repeat(wheel.sectors, 1);
                createSpinner(c, spinnerData, shuffledSectors, null, true);
            },
            canvas_size: [500, 500],
            scoreBoard: function() {
                return  `<div class="score-board">
                <div class="score-board-title">Current Jackpot</div>
                <div class="score-board-score" id="score" > ${jackpot} </div>
                </div>`
            },
            data: {round: round, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
            on_finish: function(data) {
                data.trial = trial;
                outcome = data.outcome;
                if (outcome == "J") {
                    winningStreak++;
                    losingStreak_final = losingStreak;
                    losingStreak = 0;
                    jackpot = (goalType == "maxWin") ? winningStreak : 50 - losingStreak;
                    if (goalType == "maxWin" && trial == nTrials) {
                        winningStreak_final = winningStreak;
                    };
                } else if (outcome == "5") {
                    losingStreak++;
                    winningStreak_final = winningStreak;
                    winningStreak = 0;
                    jackpot = (goalType == "maxWin") ? winningStreak : 50 - losingStreak;
                    if (goalType == "minLose" && trial == nTrials || goalType == "minLose" && losingStreak == 5) {
                        losingStreak_final = losingStreak;
                    };
                };
            },
        };

        const tokens = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                let standardFeedback;

                if (goalType == "maxWin") {
                    if (outcome == "W" && trial < nTrials) {
                        standardFeedback = displayJackpot(jackpot, color);
                    } else {
                        standardFeedback = displayFeedback(`+${winningStreak_final} Points`, color);
                    };
                } else if (goalType == "minLose") {
                    if (outcome == "5" && trial < nTrials) {
                        standardFeedback = displayFeedback(`+5 Points`, color);
                        jackpot = 50 - losingStreak;
                    } else if (outcome == "J" && trial < nTrials) {
                        standardFeedback = displayFeedback(`+${50 - losingStreak_final} Points`, color);
                    } else {
                        standardFeedback = displayFeedback(`+${50 - losingStreak_final} Points`, color);
                    };
                }

                return standardFeedback;

            },
            choices: "NO_KEYS",
            trial_duration: 2000,
            data: {round: round, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
            on_finish: function(data) {
                data.trial = trial;
                trial++;
            },
        };

        const spin_loop = {
            timeline: [spin, tokens],
            repetitions: nTrials,
        };

        const flowMeasure_predict = {
            type: jsPsychCanvasLikert,
            stimulus: function(c, spinnerData) {
                if (trial == 1) {
                    wedges.win.color = vibrantColors.pop()
                    wedges.lose.color = vibrantColors.pop()
                }
                createSpinner(c, spinnerData, wheel.sectors, false, false);
            },
            questions: [
                {prompt: `How <b>immersed</b> and <b>absorbed</b><br>would an average person feel playing Feel the Spin with this wheel?`,
                name: `flow`,
                labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
            ],
            randomize_question_order: false,
            scale_width: 600,
            data: {round: round, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
             on_finish: function(data) {
                data.trial = trial - 1;
                saveSurveyData(data);
            }
        };

        const flowMeasure_play = {
            type: jsPsychSurveyLikert,
            questions: [
                {prompt: `While spinning the wheel in the ${gameName}<br>how <b>immersed</b> and <b>absorbed</b> did you feel in what you were doing?`,
                name: `flow`,
                labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
            ],
            randomize_question_order: false,
            scale_width: 600,
            data: {round: round, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
             on_finish: function(data) {
                data.trial = trial - 1;
                saveSurveyData(data);
            }
        };


        if (play == "play") {
            this.timeline = [spin_loop, flowMeasure_play];
        } else {
            this.timeline = [flowMeasure_predict];
        };
    }


    p.round1 = new MakeSpinLoop(target_wheels[0], 1, playOrPredict, colors[0], gameNames[0])
    p.round2 = new MakeSpinLoop(target_wheels[1], 2, playOrPredict, colors[1], gameNames[1])

   /*
    *
    *   Demographics
    *
    */

    p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord]
        };

        return demos;

    }());


   /*
    *
    *   SAVE DATA
    *
    */

    p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "VrHCslz2iLSa",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.instLoop, exp.postIntro, exp.round1, exp.transition, exp.round2, exp.demographics, exp.save_data];

jsPsych.run(timeline);
