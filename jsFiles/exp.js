

const exp = (function() {


    var p = {};

    const playOrPredict = "play"; 

    const goalType = ["maxWin", "minLose"][Math.floor(Math.random() * 2)]; 

    const nTrials = 15;

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
                <p>In this survey, you will play a game called "Feel the Spin."</p>
                <p>At various points in the game, you'll report how you feel while playing it.</p>
            </div>`,

            `<div class='parent'>
                <p>The goal of Feel the Spin is to earn as many points as possible.</p>
                <p>You'll earn points by spinning various prize wheels.</p>
            </div>`,

            `<div class='parent'>
                <p>Each wheel is divided into wedges, like this:</p>
                <img src="./img/pre-pic.png" style="width:400px; height:400px">
            </div>`,

            `<div class='parent'>
                <p>Wedges with a W are "winning wedges."</p>
                <p>Wedges with a L are "losing wedges."</p>
                <img src="./img/pre-pic.png" style="width:400px; height:400px">
            </div>`,
        ],

        maxWin: [
            `<div class='parent'>
                <p>In Feel the Spin, earnings are based on winning streaks: the longer your winning streaks, the more points you'll earn.
                Specifically, whenever you break a winning streak by landing on a losing wedge, you'll earn 10 points for every consecutive win. For example:</p>
                <p>0 wins before a loss = 0 points</br>
                1 win before a loss = 10 points</br>
                2 wins before a loss = 20 points</br>
                3 wins before a loss = 30 points</br>
                4 wins before a loss = 40 points</br>
                5 wins before a loss = 50 points</br>
                ...</p>
            </div>`,

            `<div class='parent'>
                <p>The length of your current winning streak is displayed throughout the game.
                <br>For example, after three consecutive wins, you'd see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-title">Current Streak:</div>
                    <div class="feedback-streak">3</div>
                    <div class="feedback-body"></div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>After each loss, a message appears indicating the number of points earned.</p>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you lost after 3 consecutive wins, you'd see the following:</p>
                <div style="margin-top: 50px; height:400px">
                    <div class="feedback-title">Final Streak:</div>
                    <div class="feedback-streak">3</div>
                    <div class="feedback-body">+30 Points</div>
                </div>
            </div>`
        ],

        minLose: [
            `<div class='parent'>
                <p>In Feel the Spin, earnings are based on losing streaks: the shorter your losing streaks, the more points you'll earn.
                Specifically, whenever you break a losing streak by landing on a winning wedge, you'll earn 11 points minus 1 point for every consecutive loss. For example:</p>
                <p>0 losses before a win = 11 points</br>
                1 loss before a win = 10 points</br>
                2 losses before a win = 9 points</br>
                3 losses before a win = 8 points</br>
                4 losses before a win = 7 points</br>
                5 losses before a win = 6 points</br>
                ...</p>
            </div>`,

            `<div class='parent'>
                <p>The length of your current losing streak is displayed throughout the game.
                <br>For example, after three consecutive losses, you'll see the following:</p>
                <div style="margin-top: 50px; height:200px">
                    <div class="feedback-title">Current Streak:</div>
                    <div class="feedback-streak">3</div>
                    <div class="feedback-body"></div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>After each win, a message appears indicating the number of points earned.</p>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you won after 3 consecutive losses, you'd see the following:</p>
                <div style="margin-top: 50px; height:400px">
                    <div class="feedback-title">Final Streak:</div>
                    <div class="feedback-streak">3</div>
                    <div class="feedback-body">+8 Points</div>
                </div>
            </div>`
        ],

        play: [
            `<div class='parent'>
                <p>To spin a prize wheel, just grab and pull it with your cursor.</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/spin-gif.gif" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>You'll spin a variety of different wheels. Each wheel has different colors and numbers of winning and losing wedges. 
                For each wheel, you'll report how <b>immersed</b> and <b>absorbed</b> you felt playing Feel the Spin with it.</p>
                <p><b>IMPORTANT:</b> You will <i>not</i> rate how much you liked or enjoyed spinning each wheel. The focus is solely on your sense of immersion and absorption.</p>
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

    const ans1 = (goalType == "maxWin") ? `20` : `9`;

    const ans2 = (playOrPredict == "play") ? `I will report how immersed and absorbed I felt spinning each wheel.` : `I will predict how immersed and absorbed an average person would feel playing Feel the Spin with different wheels.`;

    const correctAnswer = [ans1, ans2];

    const options_play = [
        `I will report how happy I felt spinning each wheel.`, 
        `I will report how much I enjoyed spinning each wheel.`,
        `I will report how immersed and absorbed I felt spinning each wheel.`,
        `I will report how much I liked spinning each wheel.`
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
            <p>Please answer the following question.</p>
            </div>`,
        questions: [
            {
                prompt: `Landing on a ${winningOrLosing[0]} wedge after a ${winningOrLosing[1]} streak of 2 is worth how many points?`, 
                name: `attnChk1`, 
                options: ["9", "10", "11", "20"],
            },
            {
                prompt: `Which of the following statements is true?`, 
                name: `attnChk2`, 
                options: options,
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

    // wedge colors
    let vibrantColors = [
      "#D32F2F", // Vivid Red
      "#FBC02D", // Bright Yellow
      "#43A047", // Medium Bright Green
      "#1976D2", // Vivid Blue
      "#7B1FA2", // Vivid Purple
      "#F57C00", // Bright Orange
      "#00838F", // Deep Cyan
      "#E91E63"  // Bright Magenta
    ];

    vibrantColors = jsPsych.randomization.repeat(vibrantColors, 1);

    // define each wedge
    const wedges = {
        lose: {color: null, font: 'white', label:"L", points: 0},
        win: {color: null, font: 'white', label:"W", points: 1},
    };

    // define wheels
    let baseline_wheels = [
        {sectors: [ wedges.win, wedges.win, wedges.lose, wedges.win, wedges.win, wedges.lose ], wheel_id: 0, reliability: 1, label: "100%", nWin: 4, ev: 2.33, mi: .65},
    ];

    // define each wheel
    let target_wheels = [
        // {sectors: [ wedges.lose, wedges.lose, wedges.win, wedges.lose, wedges.lose, wedges.win ], wheel_id: 1, reliability: 1, label: "100%", nWin: 2, ev: 2.33, mi: .65},
        {sectors: [ wedges.lose, wedges.win, wedges.lose, wedges.win, wedges.lose, wedges.win ], wheel_id: 2, reliability: 1, label: "100%", nWin: 3, ev: 5, mi: 1},
        {sectors: [ wedges.win, wedges.win, wedges.win, wedges.win, wedges.win, wedges.lose  ], wheel_id: 3, reliability: 1, label: "100%", nWin: 5, ev: 7.67, mi: .65},
    ];

    target_wheels = jsPsych.randomization.repeat(target_wheels, 1);



    // html functions
    let displayFeedback = (title, streak, body) => {
        let html = 
        `<div class="score-board-blank"></div> 
        <div class="feedback-container">
            <div class="feedback-title">${title}</div>
            <div class="feedback-streak">${streak}</div>
            <div class="feedback-body">${body}</div>
        </div>`
        return html;
    };
    


    const MakeSpinLoop = function(wheel, round, play) {

        let outcome;
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
                    wedges.win.color = vibrantColors.pop();
                    wedges.lose.color = vibrantColors.pop();
                };
                createSpinner(c, spinnerData, wheel.sectors, false, true);
            },
            canvas_size: [500, 500],
            scoreBoard: function() {
                return '';
            },
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
            on_finish: function(data) {
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

                if (goalType == "maxWin") {
                    if (outcome == "W" && trial < nTrials) {
                        standardFeedback = displayFeedback(`Current Streak:`, winningStreak, "");
                    } else {
                        standardFeedback = displayFeedback(`Final Streak:`, winningStreak_final, `+${winningStreak_final*10} Points`);
                    };
                } else if (goalType == "minLose") {
                    if (outcome == "L" && trial < nTrials) {
                        standardFeedback = displayFeedback(`Current Streak:`, losingStreak, "");
                    } else if (losingStreak_final <= 11) {
                        standardFeedback = displayFeedback(`Final Streak:`, losingStreak_final, `+${11 - losingStreak_final} Points`);
                    } else {
                        standardFeedback = displayFeedback(`Final Streak:`, losingStreak_final, `${11 - losingStreak_final} Points`);
                    };
                }


                return standardFeedback;

            },
            choices: "NO_KEYS",
            trial_duration: 2000,
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
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
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
             on_finish: function(data) {
                data.trial = trial - 1;
                saveSurveyData(data);
            }
        };

        const flowMeasure_play = {
            type: jsPsychSurveyLikert,
            questions: [
                {prompt: `How <b>immersed</b> and <b>absorbed</b><br>did you feel playing the last round of Feel the Spin?`,
                name: `flow`,
                labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
            ],
            randomize_question_order: false,
            scale_width: 600,
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi, nWin: wheel.nWin},
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


    p.round1 = new MakeSpinLoop(baseline_wheels[0], 0, playOrPredict)
    p.round2 = new MakeSpinLoop(target_wheels[0], 1, playOrPredict)
    p.round3 = new MakeSpinLoop(target_wheels[1], 2, playOrPredict)
    //p.round4 = new MakeSpinLoop(target_wheels[2], 3, playOrPredict)

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
        experiment_id: "zLfmXBjrKunT",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.instLoop, exp.postIntro, exp.round1, exp.round2, exp.round3, exp.demographics, exp.save_data];

jsPsych.run(timeline);
