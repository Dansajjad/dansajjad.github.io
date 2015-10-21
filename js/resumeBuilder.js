
var data = "%data%";

// bio object
	var bio = {
		"name": "Daffy Duck",
		"role": "Aspiring Full-stack Developer",
		"contacts": {
			"mobile": "914-800-1000",
			"email": "daffy@gmail.com", 
			"twitter": "@daffy",
			"github": "daffy123",
			"blog": "myblog.me",
			"location": "NYC"
		},
		"bioPic": "images/daffy.jpg",
		"welcomeMessage": "Welcome to my humble resume",
		"skills": ["HTML5", "CSS3", "JavaScript", "jQuery", "SQL", "Ruby", "ROR"]
	};

	bio.display = function() {
			var formattedName = HTMLheaderName.replace(data, bio.name);
			var formattedRole = HTMLheaderRole.replace(data, bio.role);
			
			var formattedMobile = HTMLmobile.replace(data, bio.contacts.mobile);
			var formattedEmail = HTMLemail.replace(data, bio.contacts.email);
			var formattedTwitter = HTMLtwitter.replace(data, bio.contacts.twitter);
			var formattedGithub = HTMLgithub.replace(data, bio.contacts.github);
			var formattedBlog = HTMLblog.replace(data, bio.contacts.blog);
			var formattedLocation = HTMLlocation.replace(data, bio.contacts.location);


			var formattedBioPic = HTMLbioPic.replace(data,bio.bioPic);
			var formattedWelcomeMessage = HTMLwelcomeMsg.replace(data, bio.welcomeMessage);



			$("#header").prepend(formattedName + formattedRole) 
			$("#topContacts").append(formattedMobile + formattedEmail + formattedTwitter + formattedGithub + formattedBlog + formattedLocation);
			$("#header").append(formattedBioPic + formattedWelcomeMessage);
		

			for (prop in bio.contacts) {
				var formattedContact = HTMLcontactGeneric.replace("%contact%", prop).replace(data, bio.contacts[prop]);
				$("#footerContacts").append(formattedContact);
			}
			



			if (bio.skills.length > 0) {
				$("#header").append(HTMLskillsStart); 
			}

			for (var i = 0; i < bio.skills.length; i++) {
				if (bio.skills.length > 0) {
				var formattedSkill = HTMLskills.replace(data, bio.skills[i]);
				$("#skills").append(formattedSkill);
				}
			}
	}

	bio.display();

// work object
	var work = {
	  "jobs": [
	    {
	      "employer": "PGI Inc.",
	      "title": "Associate VP",
	      "location": "NYC, NY",
	      "dates": "2011 - Current",
	      "description": "Worked on 10+ deals, including sell-side and buy-side M&A, leveraged buyouts, and debt and equity financings; managed a team of two analysts. Collaborated directly with management teams at companies to craft client presentations, determine optimal way to present business highlights to investors, and build operational and valuation models to support negotiations."
	    },
	    {
	      "employer": "Crowe",
	      "title": "Associate",
	      "location": "Chicago, IL",
	      "dates": "2008 - 2010",
	      "description": "Prepared business valuation reports for financial reporting and M&A purposes. Assisted with due diligence process on sell-side and buy-side M&A transactions, supported communication between clients and prospective buyers, and managed information flow."
	    },
	    {
	      "employer": "HMI Inc.",
	      "title": "Analyst",
	      "location": "San Francisco, CA",
	      "dates": "2006 - 2007",
	      "description": "Provided litigation and forensic support to clients. Scrubbed and mined data to perform meaningful data analytics to be presented in court supporting the client's position."
	    }
	  ]
	}; // JASON doesn't like semicolon at the end

	work.display = function() {
		for (prop in work.jobs) {
			var formattedEmployer = HTMLworkEmployer.replace(data, work.jobs[prop].employer);
			var formattedTitle = HTMLworkTitle.replace(data, work.jobs[prop].title);
			var formattedDates = HTMLworkDates.replace(data, work.jobs[prop].dates);
			var formattedLocation = HTMLworkLocation.replace(data, work.jobs[prop].location);
			var formattedDescription = HTMLworkDescription.replace(data, work.jobs[prop].description)
			
			$("#workExperience").append(HTMLworkStart);
			$(".work-entry:last").append(formattedEmployer + formattedTitle + formattedDates + formattedLocation + formattedDescription);
			

			//:last means that we specifically want to append this formatted title 
			//to the last element with the class "work-entry" on the page, which should
			//be the one we just created. 
		}
	};

	work.display();

// project object
	var projects = {
		"projects": [
			{
				"title": "Multimillion dollar sale of a pharma business",
				"dates": "2011 - 2012",
				"description": "Ran a successful sell-side process for a pharmaceutical company. Negotiated favorable deal terms for our client leading to a higher purchase price", 
				"images": ["images/lonSub1.jpg", "images/lonSub2.jpg"]
			},
			{
				"title": "Multimillion dollar acquisition of radiation therapy centers",
				"dates": "2012 - 2014",
				"description": "Evaluated various opportunites in the radiation therapy sector across the North Americas. Acquired three undervalued therapy centers for the client that offered significant synergies starting year one.", 
				"images": ["images/nycSub.jpg", "images/nyc.jpg"]
			}
		]
	};

	projects.display = function() {
		for (prop in projects.projects) {
			var formattedTitle = HTMLprojectTitle.replace(data, projects.projects[prop].title);
			var formattedDates = HTMLprojectDates.replace(data, projects.projects[prop].dates);
			var formattedDescription = HTMLprojectDescription.replace(data, projects.projects[prop].description);
			
			$("#projects").append(HTMLprojectStart);
			$(".project-entry:last").append(formattedTitle + formattedDates + formattedDescription);
			
			if (projects.projects[prop].images.length > 0) {
				for (image in projects.projects[prop].images) {
					var formattedImage = HTMLprojectImage.replace(data, projects.projects[prop].images[image]);
					$(".project-entry:last").append(formattedImage);
				}
			}		
		}
	};

	projects.display();

// education object
	var education = {
		"schools": [
			{
				"name": "TSU",
				"location": "Troy, AL",
				"degree": "Bachelors of Science",
				"major": ["Accounting", "Finance"],
				"dates": "2002 - 2006",
				"url": "http://duke.edu"
			}
		],
		"onlineCourses": [
			{
				"title": "JavaScript Fundamentals, Object-oriented JavaScript, HTML & CSS Fundamentals",
				"school": "Udacity",
				"dates": 2015,
				"url": "http://udacity.com"
			},
					{
				"title": "Advanced JavaScript, jQuery, Angular, Node.js, HTML5, CSS3, Git",
				"school": "CodeSchool",
				"dates": 2015,
				"url": "http://codeschool.com"
			},
			{
			"title": "HTML, CSS, JavaScript, jQuery",
			"school": "Codecademy",
			"dates": 2015,
			"url": "http://codecademy.com"
			}	
		]
	};

	education.display = function() {
		for (prop in education.schools) {
			var formattedName = HTMLschoolName.replace(data, education.schools[prop].name);
			var formattedDegree = HTMLschoolDegree.replace(data, education.schools[prop].degree);
			var formattedDates = HTMLschoolDates.replace(data, education.schools[prop].dates);
			var formattedLocation = HTMLschoolLocation.replace(data, education.schools[prop].location);
			var formattedMajor = HTMLschoolMajor.replace(data, education.schools[prop].major);
			
			$("#education").append(HTMLschoolStart);
			$(".education-entry:last").append(formattedName + formattedDegree + formattedDates + formattedLocation + formattedMajor);
		}
		
		$("#education").append(HTMLonlineClasses);	
		for (prop in education.onlineCourses) {
			var formattedTitle = HTMLonlineTitle.replace(data, education.onlineCourses[prop].title);
			var formattedSchool = HTMLonlineSchool.replace(data, education.onlineCourses[prop].school);
			var formattedDates = HTMLonlineDates.replace(data, education.onlineCourses[prop].dates);
			var formattedURL = HTMLonlineURL.replace(data, education.onlineCourses[prop].url);
			
			$("#education").append(HTMLschoolStart);
			$(".education-entry:last").append(formattedTitle + formattedSchool + formattedDates + formattedURL); 
		}
	};

	education.display();


// //internationalize name button
$("#main").append(internationalizeButton);
// //google location map
// $("#mapDiv").append(googleMap);
