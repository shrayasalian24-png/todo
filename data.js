/* ==========================================
   CivicPulse - Central Data Repository
   ========================================== */

const CIVIC_DATA = {
  // Timeline Stages
  timelineStages: [
    {
      id: "stage-1",
      step: 1,
      icon: "fa-user-check",
      title: "Voter Registration & Eligibility Check",
      category: "Preparation",
      summary: "Verify eligibility, select political affiliation (if applicable), update your legal address, and submit your registration application before state deadlines.",
      timelineWindow: "30 to 90 Days Before Election Day",
      keyDeadline: "Deadlines vary by state (Online: 15–30 days prior; In-person: up to Same-Day Registration).",
      quickTips: ["Check status online", "Government ID needed", "Update address if moved"],
      detailedGuide: {
        objective: "Ensure your legal right to vote is registered with your local election authority.",
        eligibilityRules: [
          "Must be a citizen of the jurisdiction (e.g., US citizen).",
          "Must meet state residency requirements.",
          "Must be at least 18 years old on or before Election Day (some states allow 17-year-olds to register for primaries).",
          "Must not be disqualified due to felony conviction status (varies by state)."
        ],
        procedureSteps: [
          "Choose registration method: Online portal, Mail-in form (NVRA National Mail Voter Registration), or DMV / Government office.",
          "Provide legal proof of identity (Social Security Number subset or State ID / Driver's License number).",
          "Select party preference (Required in some states for closed primary participation; optional for general elections).",
          "Receive your Voter Registration Card or digital verification confirmation."
        ],
        behindTheScenes: "Election officials cross-reference your application with state DMV databases, postal change-of-address records, and vital statistics to prevent double registration and keep rolls accurate.",
        commonMyths: [
          { myth: "If I miss the pre-election deadline, I can never vote.", fact: "Over 20 states plus D.C. offer Same-Day Voter Registration at early voting sites or polling places on Election Day." },
          { myth: "Registering to vote automatically signs me up for jury duty.", fact: "Jury pools are drawn from multiple databases including driver's license registries and tax records, not just voter rolls." }
        ]
      }
    },
    {
      id: "stage-2",
      step: 2,
      icon: "fa-users-slash",
      title: "Primary Elections & Candidate Nominations",
      category: "Nomination",
      summary: "Political parties select their official candidates through primary elections or caucuses, narrowing down the ballot for the general election.",
      timelineWindow: "Spring & Summer (6 to 9 Months Before General Election)",
      keyDeadline: "Primary dates are established by individual state laws.",
      quickTips: ["Open vs Closed Primaries", "Local party platforms", "Nonpartisan municipal seats"],
      detailedGuide: {
        objective: "Decide which candidates represent each party on the final election ballot.",
        eligibilityRules: [
          "Closed Primaries: Only registered party members can vote for that party's candidates.",
          "Open Primaries: Any registered voter can choose which party primary ballot to vote on.",
          "Semi-Closed Primaries: Unaffiliated voters may choose a party ballot on election day."
        ],
        procedureSteps: [
          "Candidates file petitions and gather signatures to qualify for the primary ballot.",
          "Voters research primary candidates' voting histories, policy positions, and debates.",
          "Voters cast primary ballots in person or via absentee mail.",
          "Winning primary candidates earn delegates or plurality votes to secure party nomination."
        ],
        behindTheScenes: "Parties hold state and national conventions to formally certify primary vote counts, adopt party platforms, and endorse primary winners.",
        commonMyths: [
          { myth: "Primary elections don't matter as much as general elections.", fact: "In many single-party dominant districts, primary elections effectively determine who holds office." }
        ]
      }
    },
    {
      id: "stage-3",
      step: 3,
      icon: "fa-comments-dollar",
      title: "Campaigns, Debates & Public Information",
      category: "Information",
      summary: "Candidates debate policy issues, publish platforms, host town halls, and release sample ballots so voters can make informed choices.",
      timelineWindow: "Late Summer to Fall (60 to 90 Days Before Election Day)",
      keyDeadline: "Sample ballots released 30–45 days prior to voting start.",
      quickTips: ["Review Sample Ballots", "Check unbiased nonpartisan guides", "Identify ballot measures"],
      detailedGuide: {
        objective: "Educate citizens on candidate credentials, legislative proposals, and ballot initiatives.",
        eligibilityRules: [
          "All public debate forums are broadcast for citizen evaluation.",
          "Nonpartisan voter guides (e.g., League of Women Voters) compile direct answers from candidates."
        ],
        procedureSteps: [
          "Obtain an official Sample Ballot from your county election portal.",
          "Research down-ballot contests: Judges, School Boards, City Council, State Constitutional Amendments.",
          "Fact-check campaign communications using independent fact-checking databases."
        ],
        behindTheScenes: "Election boards prepare ballot layouts in multiple languages, conduct test prints, and configure electronic ballot marking devices.",
        commonMyths: [
          { myth: "Only major federal offices (President/Congress) appear on the ballot.", fact: "Local measures like local bonds, judges, and school board directors have the most direct impact on daily community life." }
        ]
      }
    },
    {
      id: "stage-4",
      step: 4,
      icon: "fa-envelope-open-text",
      title: "Early Voting & Mail-In / Absentee Voting",
      category: "Voting Phase",
      summary: "Cast your ballot prior to Election Day in person at designated early voting centers or by requesting a secure mail-in ballot.",
      timelineWindow: "45 Days to 1 Day Before Election Day",
      keyDeadline: "Mail ballot request deadlines are usually 7–14 days before Election Day.",
      quickTips: ["Track your mail ballot", "Sign the outer envelope", "Check drop box locations"],
      detailedGuide: {
        objective: "Provide flexible, accessible options for voters unable or preferring not to vote on Election Day.",
        eligibilityRules: [
          "No-Excuse Mail Voting: Available in over 30 states.",
          "Excuse-Required Absentee Voting: Available for illness, travel, work, or disability.",
          "Universal Mail Voting: Ballots mailed automatically to all registered voters in select states."
        ],
        procedureSteps: [
          "Request Mail Ballot online or via paper form from your election clerk.",
          "Receive official ballot, secrecy sleeve, and pre-addressed return envelope.",
          "Mark ballot carefully using black or dark blue ink.",
          "Sign the outer declaration envelope with your legal signature.",
          "Return via official Secure Ballot Drop Box, Postal Service, or in person."
        ],
        behindTheScenes: "Bipartisan teams inspect returned mail envelopes, verify envelope signatures against voter registration records, and store sealed ballots in vault security until processing.",
        commonMyths: [
          { myth: "Mail-in ballots are only counted if the election is close.", fact: "Every valid mail-in ballot received by the legal deadline MUST be processed and counted by law." },
          { myth: "Anyone can drop off hundreds of fake mail ballots.", fact: "Mail ballots require unique barcodes and voter signature verification; duplicate or fake ballots are flagged immediately." }
        ]
      }
    },
    {
      id: "stage-5",
      step: 5,
      icon: "fa-vote-yea",
      title: "Election Day Operations & Precinct Voting",
      category: "Voting Phase",
      summary: "Polling places open nationwide for in-person voting. Voters verify identity, mark paper or digital ballots, and cast votes.",
      timelineWindow: "Election Day (7:00 AM – 8:00 PM local time typical)",
      keyDeadline: "If you are in line when polls close, you MUST be allowed to vote.",
      quickTips: ["Know your exact precinct", "Bring accepted photo ID", "Ask poll worker if help is needed"],
      detailedGuide: {
        objective: "Ensure every eligible voter casts a confidential, tamper-proof ballot in a secure environment.",
        eligibilityRules: [
          "Voters must cast ballots at their assigned precinct or any vote center within their county.",
          "Voters with disabilities have the legal right to accessible ballot marking devices or assistance."
        ],
        procedureSteps: [
          "Check in with poll workers at the precinct table.",
          "Present valid identification if required by your state.",
          "Receive paper ballot or smartcard activator for digital optical scanner.",
          "Mark your selections in a private voting booth.",
          "Insert paper ballot into the optical scanner or tabulator box and receive your 'I Voted' sticker."
        ],
        behindTheScenes: "Optical scanners read paper ballots instantaneously and store totals on encrypted memory sticks while retaining physical paper ballots for audits.",
        commonMyths: [
          { myth: "If I don't have the exact ID, poll workers will kick me out.", fact: "You have the legal right to cast a Provisional Ballot, which is counted once your eligibility is verified." }
        ]
      }
    },
    {
      id: "stage-6",
      step: 6,
      icon: "fa-award",
      title: "Vote Tabulation, Canvassing & Official Certification",
      category: "Results",
      summary: "Polls close, preliminary results are reported, mail ballots are tabulated, official canvass audits occur, and final results are certified.",
      timelineWindow: "Election Night to 30 Days Post-Election",
      keyDeadline: "State certification deadlines set by statute (varies 7 to 30 days).",
      quickTips: ["Unofficial results update on election night", "Audits verify paper ballots", "Certification makes results official"],
      detailedGuide: {
        objective: "Accurately tabulate 100% of legitimate votes, conduct post-election audits, and legally certify winners.",
        eligibilityRules: [
          "Canvass boards are composed of bipartisan representatives.",
          "Post-election risk-limiting audits (RLA) physically inspect randomly selected paper ballots."
        ],
        procedureSteps: [
          "Election night: Precinct scanners transmit initial encrypted totals to central election headquarters.",
          "Days 1-14: Provisional ballots, military/overseas mail ballots, and cured ballots are processed.",
          "Bipartisan Canvass Board checks machine totals against physical ballot counts.",
          "State Chief Election Officer signs Official Certificate of Election."
        ],
        behindTheScenes: "Machines are disconnected from internet networks. Paper ballots remain locked in secure tamper-evident bags for mandated retention periods (e.g., 22 months).",
        commonMyths: [
          { myth: "Election night news projections are the official results.", fact: "Media projections are estimates; official results take days or weeks of legal tabulation and certification." }
        ]
      }
    }
  ],

  // Personas for Readiness Calculator
  personas: [
    {
      id: "first-timer",
      icon: "🌱",
      title: "First-Time Voter",
      subtitle: "Turning 18 or voting in your first election",
      checklist: [
        { id: "ft-1", title: "Check Voter Registration Status", desc: "Verify your legal name, current address, and active status on your state election portal." },
        { id: "ft-2", title: "Gather Required Photo Identification", desc: "Confirm what ID your state requires (Driver's License, Student ID, Passport, or Utility bill)." },
        { id: "ft-3", title: "Locate Assigned Polling Place", desc: "Find your designated precinct address or nearest early voting center." },
        { id: "ft-4", title: "Download Sample Ballot & Research Candidates", desc: "Preview your exact ballot contests online before heading to the booth." }
      ]
    },
    {
      id: "student",
      icon: "🎓",
      title: "College / Out-of-State Student",
      subtitle: "Attending school away from your home address",
      checklist: [
        { id: "st-1", title: "Choose Where to Register", desc: "Decide whether to register at your campus dormitory address OR keep your home address." },
        { id: "st-2", title: "Request Absentee / Mail Ballot Early", desc: "If voting at your home address, request a mail ballot sent to your college dorm at least 3 weeks prior." },
        { id: "st-3", title: "Check Student Photo ID Rules", desc: "Some states require student IDs to have an expiration date and legal signature to be accepted." }
      ]
    },
    {
      id: "mail-voter",
      icon: "📬",
      title: "Mail-in & Early Voter",
      subtitle: "Preferring to vote from home or avoid lines",
      checklist: [
        { id: "mv-1", title: "Submit Mail Ballot Request Form", desc: "Ensure your request is submitted before your state's mail application window closes." },
        { id: "mv-2", title: "Sign Outer Envelope Signature Match", desc: "Sign the return envelope matching the signature on your driver's license or voter registration." },
        { id: "mv-3", title: "Track Your Ballot Online", desc: "Use your state's 'Where's My Ballot?' tracking portal to confirm receipt and acceptance." }
      ]
    },
    {
      id: "accessibility",
      icon: "♿",
      title: "Voter with Accessibility Needs",
      subtitle: "Requiring physical, visual, or language accommodations",
      checklist: [
        { id: "ac-1", title: "Request Accessible Ballot Marking Device", desc: "All polling places are legally required under HAVA to have audio/tactile ballot machines." },
        { id: "ac-2", title: "Review Curbside Voting Options", desc: "Check if your local precinct offers curbside ballot delivery if entering the building is difficult." },
        { id: "ac-3", title: "Designate a Voting Assistant", desc: "You have the right to bring a trusted assistant (except an employer/union representative) into the booth." }
      ]
    }
  ],

  // Quiz Questions
  quizQuestions: [
    {
      id: 1,
      question: "True or False: If you are waiting in line when the polls officially close, you are legally entitled to cast your vote.",
      options: ["True", "False"],
      correctIndex: 0,
      explanation: "TRUE! Under election laws, as long as you are physically in line before the poll closing hour, election officials must allow you to cast your ballot."
    },
    {
      id: 2,
      question: "What happens if a voter makes a mistake (spoils) their paper ballot at a polling station?",
      options: [
        "Their vote is discarded and they cannot vote",
        "They can return the ruined ballot to poll workers and receive a fresh new ballot",
        "They must pay a fine to get a new ballot",
        "They must vote on a digital machine instead"
      ],
      correctIndex: 1,
      explanation: "Poll workers will mark your ruined ballot as 'SPOILED', lock it in a secure cancellation envelope, and issue you a brand new clean paper ballot."
    },
    {
      id: 3,
      question: "Are voting machines connected to the public internet during ballot counting?",
      options: [
        "Yes, they upload votes live to cloud servers",
        "No, ballot tabulators are strictly air-gapped and disconnected from internet networks",
        "Only in national presidential elections",
        "Yes, via public Wi-Fi networks"
      ],
      correctIndex: 1,
      explanation: "Ballot optical scanners and tabulators are air-gapped—meaning they have NO network cards or internet connectivity, ensuring immunity from online hacking."
    },
    {
      id: 4,
      question: "What is a 'Provisional Ballot' used for?",
      options: [
        "A practice ballot for minors",
        "A ballot cast when voter eligibility is in question at the poll, counted after verification",
        "A ballot for overseas diplomats only",
        "A ballot used for tie-breaker votes"
      ],
      correctIndex: 1,
      explanation: "A provisional ballot guarantees that no eligible voter is turned away if their name is missing from the roll or ID is questioned. It is held securely and counted once eligibility is verified."
    },
    {
      id: 5,
      question: "What is Ranked-Choice Voting (RCV)?",
      options: [
        "A system where voters rank candidates in order of preference (1st, 2nd, 3rd)",
        "A system where you can vote for the same candidate three times",
        "A system where politicians rank their voters",
        "A system exclusive to mail-in ballots"
      ],
      correctIndex: 0,
      explanation: "Ranked-Choice Voting allows voters to rank candidates. If no candidate wins an outright majority of 1st choice votes, instant runoff rounds redistribute lower rankings until a winner emerges."
    }
  ],

  // Quiz Badges
  badges: [
    { id: "b1", title: "Civic Novice", icon: "🥉", requirement: "Complete your first quiz question" },
    { id: "b2", title: "Ballot Scholar", icon: "🥈", requirement: "Score 60% or higher on the Civic Quiz" },
    { id: "b3", title: "Democracy Champion", icon: "🥇", requirement: "Score 100% on the Civic Quiz" },
    { id: "b4", title: "Voter Ready", icon: "📜", requirement: "Generate a custom voter checklist" }
  ],

  // Election Security Steps
  securitySteps: [
    {
      step: 1,
      icon: "fa-shield-alt",
      title: "Physical Paper Trail & Secure Storage",
      desc: "Over 95% of votes are cast on paper ballots or electronic devices producing voter-verifiable paper audit trails (VVPAT)."
    },
    {
      step: 2,
      icon: "fa-lock",
      title: "Tamper-Evident Seals & Chain of Custody",
      desc: "Ballot boxes and memory devices use numbered, tamper-evident security seals recorded on chain-of-custody logs signed by bipartisan pairs."
    },
    {
      step: 3,
      icon: "fa-wifi-slash",
      title: "Air-Gapped Tabulation Equipment",
      desc: "Certified vote tabulating hardware contains zero wireless adapters or internet access, preventing remote cyber interference."
    },
    {
      step: 4,
      icon: "fa-search-dollar",
      title: "Post-Election Audits & Canvassing",
      desc: "Bipartisan teams manually inspect randomly selected batches of paper ballots against machine counts prior to official certification."
    }
  ]
};
