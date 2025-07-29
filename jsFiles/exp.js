

const exp = (function() {


    var p = {};

    const playOrPredict = "play"; 

    const colorCondition = Math.floor(Math.random() * 2);

    const goalTypeCondition = Math.floor(Math.random() * 2);

    const hitRateCondition = Math.floor(Math.random() * 2);

    const gameNames = [['<span class="red-game">Red Game</span>', '<span class="blue-game">Blue Game</span>'], ['<span class="blue-game">Blue Game</span>', '<span class="red-game">Red Game</span>']][colorCondition]; 

    const colors = [["red", "blue"], ["blue", "red"]][colorCondition]; 

    const hitRates = [["win", "loss"], ["loss", "win"]][hitRateCondition]; 

    const goalType = ["maxWin", "minLose"][goalTypeCondition];

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
                <p>In this survey, you'll play three different games.</p>
                <p>After each game, you'll report how you felt while playing it.</p>
            </div>`,

            `<div class='parent'>
                <p>The first game you'll play is called the <span class="green-game">Green Game</span>.</p>
                <p>The goal of the <span class="green-game">Green Game</span> is to win as many points as possible.</p>
                <p>You'll win points by spinning a prize wheel.</p>
            </div>`,

            `<div class='parent'>
                <p>In the <span class="green-game">Green Game</span>, the wheel looks like this:</p>                
                <img src="./img/green-wheel.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>When a wheel stops spinning, the wedge it lands on will activate.</p>
                <p>The activated wedge will turn black, like this:</p>
                <img src="./img/green-wheel-win.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>Wedges with a W are "winning wedges."</p>
                <p>Wedges with a L are "losing wedges."</p>
                <img src="./img/green-wheel.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>Each time you land on a winning wedge, you'll earn 1 point.</p>
                <p>Each time you land on a losing wedge, you'll earn 0 points.</p>
            </div>`,

            `<div class='parent'>
                <p>After each spin, you'll see how many points you earned.</p>
            </div>`,

            `<div class='parent'>
                <p>After landing on a winning wedge, you'll see this message:</p>
                <div class="win-text-inst" style="color:green; margin-bottom: 100px">+1 Point</div>
            </div>`,

            `<div class='parent'>
                <p>After landing on a losing wedge, you'll see this message:</p>
                <div class="win-text-inst" style="color:green; margin-bottom: 100px">+0 Points</div>
            </div>`,
        ],

        nextRound1: [
            `<div class='parent'>
                <p>The <span class="green-game">Green Game</span> is now complete!</p>
                <p>Next, you'll play the second game.</p>
            </div>`,

            `<div class='parent'>
                <p>The second game is called the ${gameNames[0]}.</p>
                <p>The ${gameNames[0]} is identical to the <span class="green-game">Green Game</span> with two exceptions.
            </div>`,

            `<div class='parent'>
                <p>First, the wheel is different.</p>
                <p>Specifically, in the ${gameNames[0]}, the wheel looks like this:</p>
                <img src="./img/${previewImg_1}.png" style="width:400px; height:400px">
            </div>`,
        ],

        maxWin: [
            `<div class='parent'>
                <p>Second, in the ${gameNames[0]}, earnings are based on winning streaks: the longer your winning streaks, the more points you'll earn.
                Specifically, whenever you break a winning streak by landing on a losing wedge, you'll get 5 points for every consecutive win. For example:</p>
                <p>0 wins before a loss = 0 points</br>
                1 win before a loss = 5 points</br>
                2 wins before a loss = 10 points</br>
                3 wins before a loss = 15 points</br>
                4 wins before a loss = 20 points</br>
                5 wins before a loss = 25 points</br>
                ...</p>
            </div>`,

            `<div class='parent'>
                <p>The length of your current winning streak is displayed throughout the game.
                <br>For example, after 10 consecutive wins, you'd see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-title">Current Streak:</div>
                    <div class="feedback-streak" style="color:${colors[0]}">10</div>
                </div> 
            </div>`,

            `<div class='parent'>
                <p>After each loss, a message appears indicating the number of points you earned.</p>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you lose after 10 consecutive wins, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-body" style="color:${colors[0]}">+50 points</div>
                </div>
            </div>`
        ],

        minLose: [
            `<div class='parent'>
                <p>Second, in the ${gameNames[0]}, earnings are based on losing streaks: the shorter your losing streaks, the more points you'll earn.
                Specifically, whenever you break a losing streak by landing on a winning wedge, you'll get 100 points minus 5 points for every consecutive loss. For example:</p>
                <p>0 losses before a win = 100 points</br>
                1 loss before a win = 95 points</br>
                2 losses before a win = 90 points</br>
                3 losses before a win = 85 points</br>
                4 losses before a win = 80 points</br>
                5 losses before a win = 75 points</br>
                ...</p>
            </div>`,

            `<div class='parent'>
                <p>The length of your current losing streak is displayed throughout the game.
                <br>For example, after 10 consecutive losses, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-title">Current Streak:</div>
                    <div class="feedback-streak" style="color:${colors[0]}">10</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>After each win, a message appears indicating the number of points you earned.</p>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you win after 10 consecutive losses, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-body" style="color:${colors[0]}">+50 Points</div>
                </div>
            </div>`
        ],

        play: [
            `<div class='parent'>
                <p>To spin the prize wheel, just grab and pull it with your cursor.</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/green-gif.gif" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>After finishing the <span class="green-game">Green Game</span>, you'll report how <b>immersed</b> and <b>absorbed</b> you felt in what you were doing.</p>
                <p><b>IMPORTANT:</b> You will <i>not</i> rate how much you liked or enjoyed the <span class="green-game">Green Game</span>. The focus is solely on your sense of immersion and absorption.</p>
            </div>`,   
        ],

        nextRound2: [
            `<div class='parent'>
                <p>The ${gameNames[0]} is now complete!</p>
                <p>Next, you'll play the third game.</p>
            </div>`,

            `<div class='parent'>
                <p>The third game is called the ${gameNames[1]}.</p>
                <p>The ${gameNames[1]} is identical to the ${gameNames[0]} with one exception: The wheel is different.</p>
                <p>Specifically, in the ${gameNames[1]}, the wheel looks like this:</p>
                <img src="./img/${previewImg_2}.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>After finishing the ${gameNames[1]}, you'll report how <b>immersed</b> and <b>absorbed</b> you felt in what you were doing.</p>
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
        pages: [...html.welcome, ...html.play],
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    const transition1 = {
        type: jsPsychInstructions,
        pages: (goalType == "maxWin") ? [...html.nextRound1, ...html.maxWin] : [...html.nextRound1, ...html.minLose],
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    const ans1 = (goalType == "maxWin") ? `25` : `75`;

    const ans2 = (playOrPredict == "play") ? `Report how immersed and absorbed I felt in what I was doing.` : `I will predict how immersed and absorbed an average person would feel playing Feel the Spin with different wheels.`;

    const correctAnswer0 = ["1", ans2];

    const correctAnswer = [ans1, ans2];

    const options_play = [
        `Report how happy I felt playing it.`, 
        `Report how much I enjoyed playing it.`,
        `Report how immersed and absorbed I felt in what I was doing.`,
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

    const attnChk0 = {
        type: jsPsychSurveyMultiChoice,
        preamble: `<div class='parent'>
            <p>Please answer the following questions.</p>
            </div>`,
        questions: [
            {
                prompt: `Landing on a winning wedge is worth how many points?`, 
                name: `attnChk1`, 
                options: ["1", "5", "25", "75"],
            },
            {
                prompt: `What will do you after playing the <span class="green-game">Green Game</span>?`, 
                name: `attnChk2`, 
                options: options_play,
            },
        ],
        scale_width: 500,
        on_finish: (data) => {
              const totalErrors = getTotalErrors(data, correctAnswer0);
              data.totalErrors = totalErrors;
        },
    };

    const attnChk1 = {
        type: jsPsychSurveyMultiChoice,
        preamble: `<div class='parent'>
            <p>Please answer the following questions.</p>
            </div>`,
        questions: [
            {
                prompt: `Landing on a ${winningOrLosing[0]} wedge after a ${winningOrLosing[1]} streak of 5 is worth how many points?`, 
                name: `attnChk1`, 
                options: ["1", "5", "25", "75"],
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

    p.instLoop0 = {
      timeline: [intro, attnChk0, conditionalNode],
      loop_function: () => {
        const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.instLoop1 = {
      timeline: [transition1, attnChk1, conditionalNode],
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

    p.transition2 = {
        type: jsPsychInstructions,
        pages: [...html.nextRound2, ...html.postIntro],
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
        lose: {color: null, font: 'white', label:"L", points: 0},
        win: {color: null, font: 'white', label:"W", points: 1},
    };

    let baseline_wheel = [
        {sectors: [ wedges.win, wedges.lose, wedges.win, wedges.lose, wedges.win, wedges.lose ], wheel_id: 0, reliability: 1, label: "100%", nWin: 3, ev: 5, mi: 1},
    ];

    // define each wheel
    let target_wheels = [
        {sectors: [ wedges.lose, wedges.lose, wedges.lose, wedges.lose, wedges.win ], wheel_id: 1, reliability: 1, label: "100%", nWin: 1, ev: 5, mi: 1},
        {sectors: [ wedges.win, wedges.win, wedges.win, wedges.win, wedges.lose  ], wheel_id: 2, reliability: 1, label: "100%", nWin: 4, ev: 7.67, mi: .65},
    ];

    if (hitRateCondition == 0) { target_wheels = [target_wheels[1], target_wheels[0]] };

    // html functions
    let displayFeedback = (title, streak, body, color) => {
        const html_streak = 
            `<div class="score-board-blank"></div> 
            <div class="feedback-container">
                <div class="feedback-title">${title}</div>
                <div class="feedback-streak" style="color:${color}">${streak}</div>
            </div>`;

        const html_feedback = 
            `<div class="score-board-blank"></div> 
            <div class="feedback-container">
                <div class="feedback-body" style="color:${color}">${body}</div>
            </div>`;

        const html = (streak) ? html_streak : html_feedback;

        return html;
    };
    


    const MakeSpinLoop = function(wheel, round, play, color, gameName) {

        let outcome;
        let trial = 1;
        let losingStreak = 0;
        let winningStreak = 0;
        let losingStreak_final = 0;
        let winningStreak_final = 0;
        let targetOutcomes;
        if (goalType == "maxWin") {
            if (wheel.nWin == 1) {
                targetOutcomes = jsPsych.randomization.repeat([0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4], 1);
                targetOutcomes.unshift(0);
            } else if (wheel.nWin == 4) {
                targetOutcomes = jsPsych.randomization.repeat([0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4], 1);
                targetOutcomes.unshift(4);
            }
        } else if (goalType == "minLose") {
            if (wheel.nWin == 4) {
                targetOutcomes = jsPsych.randomization.repeat([0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4], 1);
                targetOutcomes.unshift(0);
            } else if (wheel.nWin == 1) {
                targetOutcomes = jsPsych.randomization.repeat([0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4], 1);
                targetOutcomes.unshift(4);
            }            
        };

        let targetOutcome = null;

        // trial: spinner
        const spin = {
            type: jsPsychCanvasButtonResponse,
            stimulus: function(c, spinnerData) {
                if (trial == 1) {
                    if (round == 0) {
                        wedges.win.color = "#55F26A";
                        wedges.lose.color = "#1C953C";
                    } else {
                        wedges.win.color = (color == "red") ? reds[0] : blues[0];
                        wedges.lose.color = (color == "red") ? reds[1] : blues[1];
                    }
                };
                if (round > 0) { 
                    shuffledSectors = jsPsych.randomization.repeat(wheel.sectors, 1) 
                } else {
                    shuffledSectors = wheel.sectors;
                };
                createSpinner(c, spinnerData, shuffledSectors, targetOutcome, true);
            },
            canvas_size: [500, 500],
            scoreBoard: function() {
                return '';
            },
            data: {round: round, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
            on_finish: function(data) {
                //targetOutcome = targetOutcomes.pop();
                data.trial = trial;
                outcome = data.outcome;
                if (outcome == "W") {
                    winningStreak++;
                    losingStreak_final = losingStreak;
                    losingStreak = 0;
                    if (goalType == "maxWin" && trial == nTrials) {
                        winningStreak_final = winningStreak;
                    };
                } else if (outcome == "L") {
                    losingStreak++;
                    winningStreak_final = winningStreak;
                    winningStreak = 0;
                    if (goalType == "minLose" && trial == nTrials) {
                        losingStreak_final = losingStreak;
                    };
                };
            },
        };

        const tokens = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                let standardFeedback;

                if (round == 0) {
                     if (outcome == "W") {
                        standardFeedback = displayFeedback(`Final Streak:`, null, `+1 Point`, color);
                    } else {
                        standardFeedback = displayFeedback(`Final Streak:`, null, `+0 Points`, color);
                    };
                } else if (goalType == "maxWin") {
                    if (outcome == "W" && trial < nTrials) {
                        standardFeedback = displayFeedback(`Current Streak:`, winningStreak, "", color);
                    } else {
                        standardFeedback = displayFeedback(`Final Streak:`, null, `+${winningStreak_final * 5} Points`, color);
                    };
                } else if (goalType == "minLose") {
                    if (outcome == "L" && trial < nTrials) {
                        standardFeedback = displayFeedback(`Current Streak:`, losingStreak, "", color);
                    } else if (losingStreak_final <= 20) {
                        standardFeedback = displayFeedback(`Final Streak:`, null, `+${100 - losingStreak_final*5} Points`, color);
                    } else {
                        standardFeedback = displayFeedback(`Final Streak:`, null, `${100 - losingStreak_final*5} Points`, color);
                    };
                };

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
                {prompt: `While spinning this wheel<br>how <b>immersed</b> and <b>absorbed</b> would an average person feel in what they were doing?`,
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
            preamble: `<p>Please answer the following question as accurately and honestly as possible:</p>`,
            questions: [
                {prompt: `While spinning the wheel in the ${gameName},<br>how <b>immersed</b> and <b>absorbed</b> did you feel in what you were doing?`,
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

    p.round0 = new MakeSpinLoop(baseline_wheel[0], 0, playOrPredict, "green", `<span class="green-game">Green Game</span>`)
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
        experiment_id: "fc3ujmtE0O1e",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.instLoop0, exp.postIntro, exp.round0, exp.instLoop1, exp.postIntro, exp.round1, exp.transition2, exp.round2, exp.demographics, exp.save_data];

jsPsych.run(timeline);
