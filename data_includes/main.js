PennController.ResetPrefix(null); 

var shuffleSequence = seq("consent", "demo", "IDentry", "intro",
                        "startpractice",
                      
                        seq("practice"),

                        "setcounter",
                        "starter",

                        seq(rshuffle(startsWith("exp"), startsWith("husb"), startsWith("fill"))),
 						"sendresults",
                        "completion"
                );

newTrial("IDentry",
    newText("instr", "Please enter your Prolific ID:").print()
    ,
    newHtml("partpage", "<input type='text' id='partID' name='participant ID' min='1' max='120'>").print()
    ,
    newButton("Next").print().wait( 
        getVar("partID").set( v=>$("#partID").val() ).testNot.is('')
    )
)


Header(
    newVar("partID").global()    
)
.log( "partid" , getVar("partID") ) 



var showProgressBar =false;

var practiceItemTypes = ["practice"];

var manualSendResults = true;

var defaults = [
];


Template("Experiment.csv", row => {
    items.push(
        [[row.Cond,row.Item] , "PennController", newTrial(
            newController("DashedSentence", {s: row.sentence})
              .print()
              .log()
              .wait()
        )
        .log("counter", __counter_value_from_server__)
        .log("label", row.Cond)
        .log("latinitem", row.Item)
        ]
    );
    return newTrial('_dummy_',null);
})


var items = [

	["setcounter", "__SetCounter__", { }],

	["sendresults", "__SendResults__", { }],

    ["consent", "Form", { html: { include: "consent.html" } } ],

["demo", "Form", {
	html: { include: "demo.html" },
	validators: {
		age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
	}
} ],

["intro", "Form", { html: { include: "intro1.html" } } ],


["startpractice", Message, {consentRequired: false,
	html: ["div",
		   ["p", "First you can do three practice sentences."]
		  ]}],

["practice", "DashedSentence", {s:"What did the carpenter rust from the chinese restaurant?"}],
["practice", "DashedSentence", {s:"What did the pencil despise for the newspaper?"}],
["practice","DashedSentence", {s:"When did the butler ripple from the forgetful children?"}],


 ["starter", Message, {consentRequired: false,
	html: ["div",
		   ["p", "Time to start the main portion of the experiment!"]
		  ]}],
		  

["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ]


];


