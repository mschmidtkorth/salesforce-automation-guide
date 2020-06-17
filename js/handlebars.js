function drawRadarChart() {
	/* Radar Chart */
	var margin = {
			top: 100,
			right: 100,
			bottom: 100,
			left: 100
		},
		width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
		height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

	var data = [
		[ //Process Builder
			{
				axis: "Functionality",
				value: 0.6
			}, // Moderate record management, many standard actions, good standard metadata capabilities, limited flow control
			{
				axis: "Speed",
				value: 0.65
			}, // Still not fully optimized, especially in bulk scenarios, but has gotten much better
			{
				axis: "Scalability",
				value: 0.7
			}, // Call process, flow, apex; many features; risky for LDV, limited logic
			{
				axis: "Maintenance",
				value: 0.7
			}, // Versioning, UI, relatively strict, multiple per object allowed
			{
				axis: "Security",
				value: 0.7
			}, // Platform handles it, but runs in system context and no user access management
			{
				axis: "Error Handling",
				value: 0.3
			}, // Some situational error handling (fault paths), crazy error messages
			{
				axis: "Limit Management",
				value: 0.65
			}, // Apex-like governor limits, not much flexibility to cope with them
			{
				axis: "Debugging",
				value: 0.5
			}, // Non-customizable error emails, but debug logs, no dedicated interactive debugging
			{
				axis: "Testing",
				value: 0.4
			}, // No dedicated testing framework, some Apex unit-test requirements
			{
				axis: "Deployment",
				value: 0.9
			}, // Simple deployment, editable in any org, cannot be removed from Managed Packages
			{
				axis: "Availability",
				value: 1.0
			}, // All editions, Classic/Lightning
			{
				axis: "Skills Required",
				value: 0.8
			}, // Simple clicking, some branching
			{
				axis: "Low Risk",
				value: 0.8
			}, // If something breaks, easily fixable, risk of creating too many processes with other dependencies, no deletion
			{
				axis: "Future-Proofness",
				value: 0.70
			} // Active development, but more maintenance and less feature-oriented
		]
	];

	var color = d3.scale.ordinal().range(["#CC333F", "#0C7BDC", "#3C784C"]);
	//var color = d3.scale.ordinal().range(["#FFC20A", "#0C7BDC", "#994F00", "#3C784C"]);

	var radarChartOptions = {
		w: width,
		h: height,
		margin: margin,
		maxValue: 1.0,
		levels: 5,
		roundStrokes: false,
		color: color
	};

	// Draw chart
	RadarChart(".radarChart", data, radarChartOptions);
}

$(document).ready(function () {
	// General helper to allow string comparison in template (Handlebars can only evaluate true/false)
	Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
	});

	/* Textboxes */
	Handlebars.registerHelper('getBoxAttributes', function (type) {
		let attributes = {}
		switch (type) {
			case 'warning':
				attributes = {
					label: 'Warning',
					class: 'error',
					classTextbox: 'textbox-left-warning',
					additionalClass: '',
					icon: 'warning',
					style: 'color: #B52E3E;'
				};
				break;
			case 'howto':
				attributes = {
					label: 'How To',
					class: 'highlight',
					classTextbox: 'textbox-left-howto',
					additionalClass: 'ui-state-highlight-howto',
					icon: 'help',
					style: 'color: rgb(201, 163, 25)'
				};
				break;
			case 'tip':
				attributes = {
					label: 'Tip',
					class: 'highlight',
					classTextbox: 'textbox-left-tip',
					additionalClass: 'ui-state-highlight-tip',
					icon: 'highlight',
					style: 'color:rgb(100, 143, 99);'
				};
				break;
			case 'workaround':
				attributes = {
					label: 'Workaround',
					class: 'highlight',
					classTextbox: 'textbox-left-tip',
					additionalClass: 'ui-state-highlight-tip',
					icon: 'highlight',
					style: 'color:rgb(100, 143, 99);'
				};
				break;
			case 'info': // Fallthrough
			default:
				attributes = {
					label: 'Note',
					class: 'highlight',
					classTextbox: 'textbox-left-info',
					additionalClass: '',
					icon: 'info',
					style: ''
				};
		}

		return attributes
	});

	// Register Partial
	var partial = $("#textboxJs").html();

	Handlebars.registerPartial({
		partialTextbox: partial
	});

	/* Menu */
	var source = $("#menuJs").html();
	var template = Handlebars.compile(source);
	var data = [{
			"menuKey": 'General',
			"menuName": 'General'
		},
		{
			'menuKey': 'Best-Practices',
			'menuName': 'Best Practices'
		},
		{
			'menuKey': 'Use-Cases',
			'menuName': 'Use Cases'
		},
		{
			'menuKey': 'Functionality',
			'menuName': 'Functionality'
		},
		{
			'menuKey': 'Maintenance',
			'menuName': 'Maintenance'
		},
		{
			'menuKey': 'Security',
			'menuName': 'Security'
		},
		{
			'menuKey': 'Debugging',
			'menuName': 'Debugging'
		},
		{
			'menuKey': 'Testing',
			'menuName': 'Testing'
		},
		{
			'menuKey': 'Deployment',
			'menuName': 'Deployment'
		},
		{
			'menuKey': 'Scalability',
			'menuName': 'Scalability'
		},
		{
			'menuKey': 'Availability',
			'menuName': 'Availability'
		},
		{
			'menuKey': 'Skills-Audience',
			'menuName': 'Skills &amp; Audience'
		},
		{
			'menuKey': 'Future-Proofness',
			'menuName': 'Future-Proofness'
		},
		{
			'menuKey': 'Limits',
			'menuName': 'Limits'
		}
	];
	$('#menu').html(template({
		MenuItems: data
	})); // Set dict

	/* Tab Content */
	var source = $("#tabsJs").html();
	var template = Handlebars.compile(source);
	let subtabList = {
		'Flow': 'Flow',
		'ProcessBuilder': 'Process Builder',
		'Workflow': 'Workflow',
		'Apex': 'Apex'
	};
	var data = {
		General: {
			content: {
				'Flows': {
					link: 'https://help.salesforce.com/articleView?id=rss_flow_component.htm&type=5',
					image: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/flow-builder/f1d99c79f186cea8adac115627a4729b_badge.png',
					title: 'Flows',
					text: 'automate business processes to collect, update, edit, create, or delete Salesforce records as well as interact with external systems. Flows can either run in the background(<em> autolaunched flows</em>) or provide a user interface(<em> screen flows</em >). Flows offer great flexibility and are managed in the declarative and interactive Flow Builder UI. Flows are powered by Lightning Flow.'
				},
				'Process Builder': {
					link: 'https://help.salesforce.com/articleView?id=rss_flow_component.htm&type=5',
					image: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/business_process_automation/eee3b8f9f85dde3f6681645ded4aa215_badge.png',
					title: 'Process Builder',
					text: 'automates business processes to collect, update, edit or create delete Salesforce records as well as interact with external systems. Processes always run in the background. Processes offer moderate flexibility and are managed in the declarative and interactive Process Builder UI. Process Builder is powered by Lightning Flow.'
				},
				'Workflows': {
					link: 'https://help.salesforce.com/articleView?id=customize_wf.htm&type=5',
					image: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/flow-basics/c2d1e1b78bb73f734b6f668e6f9428de_badge.png',
					title: 'Workflows',
					text: 'automate business processes to update Salesforce records as well as interact with external systems in a limited manner. Workflows always run in the background. Workflows offer limited flexibility and are managed in a declarative wizard-like interface.'
				},
				'Apex': {
					link: 'https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm',
					image: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/apex_database/fab27840d343cc13934e9cf1f4a41dbc_badge.png',
					title: 'Apex',
					text: 'automates any imaginable business processes within Salesforce and can interact with external systems in various ways. Apex runs in the background and can offer user interfaces via Lightning (Web) Components or Visualforce Pages. Apex offers unlimited flexibility due to its programmatic manner and is managed within the Developer Console or any IDE.'
				}
			},
			subtabs: {}
		},
		'Best-Practices': {
			content: '',
			subtabs: subtabList
		},
		'Use-Cases': {
			content: '',
			subtabs: subtabList
		},
		'Functionality': {
			content: '',
			subtabs: {
				'Actions': 'Actions',
				'Triggers': 'Triggers',
				'RecordAccess': 'Record Access',
				'FlowControl': 'Flow Control',
				'Distribution': 'Distribution'
			},
			subsubtabs: subtabList
		},
		'Maintenance': {
			content: '',
			subtabs: subtabList
		},
		'Security': {
			content: '',
			subtabs: subtabList
		},
		'Debugging': {
			content: '',
			subtabs: subtabList
		},
		'Testing': {
			content: '',
			subtabs: subtabList
		},
		'Deployment': {
			content: '',
			subtabs: subtabList
		},
		'Scalability': {
			content: '',
			subtabs: subtabList
		},
		'Availability': {
			content: '',
			subtabs: subtabList
		},
		'Skills-Audience': {
			content: '',
			subtabs: subtabList
		},
		'Future-Proofness': {
			content: '',
			subtabs: subtabList
		},
		'Limits': {
			content: '',
			subtabs: subtabList
		}
	};
	$('#tabContent').html(template({
		tabs: data
	}));

	/* Radar chart */
	drawRadarChart();

});