// Course content. Blocks map to avatar levels: block N opens at level N.
export const LEVELS = [
  { n: 1, name: "Noob", file: "1-noob" },
  { n: 2, name: "Beginner", file: "2-beginner" },
  { n: 3, name: "Creator", file: "3-creator" },
  { n: 4, name: "Advanced Creator", file: "4-advanced" },
  { n: 5, name: "Brand Builder", file: "5-brand" },
  { n: 6, name: "Growth Marketer", file: "6-growth" },
  { n: 7, name: "Pro", file: "7-pro" },
];

export const CHARACTERS = [
  { id: "man", label: "Curly & beard" },
  { id: "bob", label: "Bob & bangs" },
  { id: "long", label: "Long hair" },
];

export const yt = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);

export const BLOCKS = [
  {
    id: 1, title: "Foundation", goal: "Know who you are, who you talk to and how you stand out.",
    lessons: [
      {
        id: "1-1", title: "What a personal brand is", simulate: true,
        theory: [
          "A personal brand is what people think of when they hear your name: trust + visibility + expertise.",
          "A blog posts about anything. A brand posts so the right people remember you for one thing.",
          "Expertise without visibility does not bring clients: people can only hire someone they can find.",
          "Content is how strangers start to trust you before they ever talk to you.",
        ],
        video: "what is a personal brand for experts",
        keyPoints: ["Personal brand = trust + visibility + expertise", "Without a brand you are hard to find", "Content is a trust tool"],
        quiz: { q: "What is a personal brand made of?", options: ["Followers + likes + ads", "Trust + visibility + expertise", "A logo and nice photos"], answer: 1 },
        task: "Describe yourself in one sentence: who you are, who you help and what result you give. Write 3 versions.",
        example: "I help freelancers build a personal brand and get clients through Reels.",
        fields: [{ key: "v1", label: "Version 1" }, { key: "v2", label: "Version 2" }, { key: "v3", label: "Version 3" }],
        stat: "clarity", result: "Your first positioning draft",
      },
      {
        id: "1-2", title: "How to pick a niche", simulate: true,
        theory: [
          "A niche is the one topic you want to be known for.",
          "\"For everyone\" means for no one: broad content gets lost in the feed.",
          "Find the overlap: a skill you have + a topic you enjoy + something people pay for.",
          "Narrow it down until you can name the exact person it is for.",
        ],
        video: "how to choose a niche for your personal brand",
        keyPoints: ["Niche = skill + interest + demand", "A narrow niche makes positioning stronger", "Don't be afraid to narrow down"],
        quiz: { q: "Which niche is stronger?", options: ["Healthy lifestyle", "Meal plans for busy moms of school kids", "Food and wellness for everyone"], answer: 1 },
        task: "List topics you know well, pick one niche and explain why you could talk about it for 100 days.",
        fields: [{ key: "topics", label: "Topics you know well (one per line)", long: true }, { key: "niche", label: "Your niche" }, { key: "why", label: "Why you can talk about it for 100 days", long: true }],
        stat: "clarity", result: "Your niche",
      },
      {
        id: "1-3", title: "Who your audience is", simulate: true,
        theory: [
          "Your audience is one specific person, not \"everyone\".",
          "Pains, wants and fears matter more than age and city.",
          "When you write for one person, many similar people feel it is about them.",
        ],
        video: "how to define your target audience for content",
        keyPoints: ["Audience = one specific person", "Pains matter more than demographics", "The sharper the audience, the stronger the content"],
        quiz: { q: "What should you know first about your viewer?", options: ["Their exact age", "Their pain and what they want", "Their favorite color"], answer: 1 },
        task: "Describe your ideal viewer: who they are, what they want, what they fear and why they should listen to you.",
        fields: [{ key: "who", label: "Who they are" }, { key: "want", label: "What they want" }, { key: "fear", label: "What they fear" }, { key: "why", label: "Why they should listen to you" }],
        stat: "audience", result: "Your audience profile",
      },
      {
        id: "1-4", title: "Positioning", simulate: true,
        theory: [
          "Positioning = who you are + who you help + what result they get.",
          "Being different beats being popular: find your angle.",
          "If your positioning needs a paragraph, it is too complicated.",
        ],
        video: "how to stand out as an expert positioning statement",
        keyPoints: ["Positioning = who + for whom + result", "Unique beats popular", "Keep it simple"],
        quiz: { q: "Which is a positioning statement?", options: ["I love helping people!", "I help busy moms plan healthy family meals in 20 minutes a day", "Nutrition, wellness, lifestyle"], answer: 1 },
        task: "Write your positioning statement: who you help, what problem you solve, what result you give.",
        fields: [{ key: "statement", label: "I help [who] with [problem] so they get [result]", long: true }],
        stat: "clarity", result: "Your positioning statement",
      },
    ],
  },
  {
    id: 2, title: "Content Creation", goal: "Come up with ideas and turn them into strong short videos.",
    lessons: [
      {
        id: "2-1", title: "Content ideas", simulate: true,
        theory: [
          "Content pillars are the 3–4 big themes you always come back to.",
          "Every idea should solve a pain of your audience.",
          "Series (part 1, part 2…) keep people coming back.",
        ],
        video: "content pillars how to come up with reels ideas",
        keyPoints: ["Pillars = your main themes", "Ideas must solve an audience pain", "Series hold attention"],
        quiz: { q: "What makes a good content idea?", options: ["It is trending", "It solves a pain of your audience", "It is long"], answer: 1 },
        task: "Create 10 Reels ideas for your niche and group them into 3 content pillars.",
        fields: [{ key: "pillars", label: "Your 3 content pillars" }, { key: "ideas", label: "10 Reels ideas (one per line)", long: true }],
        stat: "audience", result: "Your idea bank",
      },
      {
        id: "2-2", title: "Hooks", simulate: true, battle: true,
        theory: [
          "A hook is the first 1–2 seconds of a video.",
          "It decides if the viewer stays or scrolls.",
          "Strong hook types: a question, a myth, a number, a contrast, a conflict.",
          "Never guess: write several hooks and test them.",
        ],
        video: "5 types of hooks for reels",
        keyPoints: ["The hook decides if a viewer stays", "Use a question, conflict, number or contrast", "Test 3+ versions"],
        quiz: { q: "How long does a hook have to work?", options: ["1–2 seconds", "10 seconds", "The whole video"], answer: 0 },
        task: "Write 5 hooks on one topic, each of a different type. The AI audience will pick the winner.",
        fields: [{ key: "topic", label: "Topic" }, { key: "h1", label: "Question hook" }, { key: "h2", label: "Myth hook" }, { key: "h3", label: "Number hook" }, { key: "h4", label: "Contrast hook" }, { key: "h5", label: "Conflict hook" }],
        stat: "hook", result: "Your hook library",
      },
      {
        id: "2-3", title: "Script", simulate: true,
        theory: [
          "A short video has a simple structure: Hook → Context → Insight → Proof → CTA.",
          "One video = one idea.",
          "Shorter is better: cut every sentence that does not move the viewer forward.",
        ],
        video: "how to write a script for reels",
        keyPoints: ["Structure: Hook → Insight → CTA", "Shorter is better", "One video = one idea"],
        quiz: { q: "What ends a short video?", options: ["A long intro", "A call to action", "Your full bio"], answer: 1 },
        task: "Write a 20–30 second script using Hook → Context → Insight → Proof → CTA.",
        fields: [{ key: "hook", label: "Hook" }, { key: "context", label: "Context" }, { key: "insight", label: "Insight", long: true }, { key: "proof", label: "Proof" }, { key: "cta", label: "Call to action" }],
        stat: "story", result: "Your first script",
      },
      {
        id: "2-4", title: "Formats", simulate: true,
        theory: [
          "Formats: talking head, storytelling, POV, listicle, breakdown, opinion, B-roll + voiceover, screen + explanation.",
          "The format should fit your niche and your comfort with the camera.",
          "Test different formats instead of sticking to one.",
        ],
        video: "short form video formats talking head pov listicle",
        keyPoints: ["The format must fit your niche", "Test different formats", "Don't get stuck on one"],
        quiz: { q: "You don't want to show your face yet. Which format fits?", options: ["Talking head", "B-roll + voiceover", "Live stream"], answer: 1 },
        task: "Write one short script in each of 3 formats: talking head, POV and listicle.",
        fields: [{ key: "talking", label: "Talking head script", long: true }, { key: "pov", label: "POV script", long: true }, { key: "list", label: "Listicle script", long: true }],
        stat: "story", result: "Your content DNA",
      },
    ],
  },
  {
    id: 3, title: "Video Production", goal: "Film and edit simple, good-looking videos with just a phone.",
    lessons: [
      {"id": "3-1", "title": "Filming a talking head", "theory": ["Light matters more than the camera: face a window or a lamp.", "Hold the phone at eye level and look into the lens, not the screen.", "A calm, clean background keeps attention on you.", "Speak a little slower and with more energy than in real life."], "video": "how to film a talking head video on your phone", "keyPoints": ["Light beats camera", "Look into the lens", "Speak slow and clear"], "quiz": {"q": "What improves a phone video the most?", "options": ["A new phone", "Good light on your face", "A long intro"], "answer": 1}, "task": "Plan a 15-second talking head video: where you film, your script and how you will sound.", "fields": [{"key": "setup", "label": "Setup: light, angle and background"}, {"key": "script", "label": "Your 15-second script", "long": true}, {"key": "delivery", "label": "Delivery: pace, energy, where you look"}], "stat": "story", "result": "Your first filming plan", "simulate": true},
      {"id": "3-2", "title": "B-roll", "theory": ["B-roll is footage of you doing things: working, cooking, writing, walking.", "It makes a video alive without you talking to the camera.", "Pair it with a voiceover that tells the story."], "video": "what is b-roll how to film b-roll for reels", "keyPoints": ["B-roll makes video alive", "Show the process", "Voiceover + visuals"], "quiz": {"q": "What is B-roll?", "options": ["Footage of you doing things, shown over a voiceover", "A second camera angle of your face", "Background music"], "answer": 0}, "task": "Plan a 20-second B-roll video: list 5 shots and write the voiceover.", "fields": [{"key": "shots", "label": "5 shots (one per line)", "long": true}, {"key": "voiceover", "label": "Voiceover text", "long": true}], "stat": "story", "result": "Your B-roll plan", "simulate": true},
      {"id": "3-3", "title": "Editing", "theory": ["Pace beats polish: cut every pause and filler word.", "Jump cuts keep energy high.", "Subtitles are a must: many people watch with sound off.", "Music sets the mood, keep it quieter than your voice."], "video": "how to edit instagram reels subtitles jump cuts", "keyPoints": ["Pace beats beauty", "Subtitles are a must", "Music sets the mood"], "quiz": {"q": "Why add subtitles?", "options": ["They look nice", "Many people watch without sound", "The algorithm requires them"], "answer": 1}, "task": "Write an edit plan for your Reel: where you cut, your first subtitles, music and pace.", "fields": [{"key": "cuts", "label": "Where you cut (pauses, filler words)"}, {"key": "subs", "label": "First 2 subtitle lines"}, {"key": "music", "label": "Music mood"}, {"key": "pace", "label": "Pace: how long each shot lasts"}], "stat": "story", "result": "Your edit plan", "simulate": true},
    ],
  },
  {
    id: 4, title: "Platform Mastery", goal: "Instagram, TikTok and YouTube Shorts.",
    lessons: [
      {"id": "4-1", "title": "Instagram", "theory": ["Reels bring new people, Stories build trust with followers, carousels get saved.", "Your profile is your shop window: name, bio, link, highlights.", "Every post needs one clear call to action."], "video": "instagram reels stories profile optimization tips", "keyPoints": ["Reels = reach", "Stories = trust", "Profile = shop window"], "quiz": {"q": "What builds trust with existing followers on Instagram?", "options": ["Stories", "Hashtags", "Ads only"], "answer": 0}, "task": "Write your Instagram bio, a Reel caption with a call to action and 3 Story ideas.", "fields": [{"key": "bio", "label": "Bio (max 150 characters)"}, {"key": "caption", "label": "Reel caption with a call to action", "long": true}, {"key": "stories", "label": "3 Story ideas (one per line)", "long": true}], "stat": "audience", "result": "Your Instagram setup", "simulate": true},
      {"id": "4-2", "title": "TikTok", "theory": ["TikTok rewards speed: trends and sounds move fast.", "The hook decides everything in the first second.", "Comments drive reach: answer them, even with a video reply."], "video": "tiktok trends sounds hooks for small creators", "keyPoints": ["TikTok = speed + trends", "The hook decides", "Comments = reach"], "quiz": {"q": "What helps reach on TikTok?", "options": ["Ignoring comments", "Replying to comments", "Posting once a month"], "answer": 1}, "task": "Adapt your best idea for TikTok: pick a trend or sound and write 3 hooks for it.", "fields": [{"key": "idea", "label": "Your idea"}, {"key": "trend", "label": "Trend or sound you'd use and why"}, {"key": "hooks", "label": "3 hooks (one per line)", "long": true}], "stat": "hook", "result": "Your TikTok version", "simulate": true},
      {"id": "4-3", "title": "YouTube Shorts", "theory": ["Shorts can grow a channel fast.", "Titles and thumbnails still matter for search.", "Playlists turn one view into many."], "video": "youtube shorts titles thumbnails channel strategy", "keyPoints": ["Shorts = fast growth", "Title and thumbnail matter", "Playlists keep viewers"], "quiz": {"q": "What keeps viewers watching more of your Shorts?", "options": ["Playlists and series", "Very long titles", "No thumbnails"], "answer": 0}, "task": "Write a Short title, the text on its thumbnail and a 3-video playlist.", "fields": [{"key": "title", "label": "Short title"}, {"key": "thumb", "label": "Thumbnail text (max 5 words)"}, {"key": "playlist", "label": "Playlist name + 3 video titles", "long": true}], "stat": "hook", "result": "Your YouTube setup", "simulate": true},
    ],
  },
  {
    id: 5, title: "Growth & Marketing", goal: "Turn views into clients.",
    lessons: [
      {"id": "5-1", "title": "Funnel", "theory": ["A funnel is the client's path: Awareness → Interest → Desire → Action.", "Each piece of content has a job in that path.", "Don't sell in the first video: earn trust first."], "video": "what is a marketing funnel for creators", "keyPoints": ["Funnel = client's path", "Content should lead to action", "Don't sell right away"], "quiz": {"q": "What comes right after Awareness?", "options": ["Action", "Interest", "Desire"], "answer": 1}, "task": "Build a simple funnel for your niche: one piece of content or step for each stage.", "fields": [{"key": "awareness", "label": "Awareness: how they find you"}, {"key": "interest", "label": "Interest: what makes them follow"}, {"key": "desire", "label": "Desire: what makes them want your help"}, {"key": "action", "label": "Action: what they do (book, buy, DM)"}], "stat": "audience", "result": "Your funnel", "simulate": true},
      {"id": "5-2", "title": "Targeting", "theory": ["Targeting means showing content to the right people.", "Segments beat \"everyone\": split by pain, not only age.", "Lookalike audiences find people similar to your best clients."], "video": "facebook instagram ads audience targeting basics", "keyPoints": ["Targeting = the right people", "Segments beat everyone", "Test your guesses"], "quiz": {"q": "What is a lookalike audience?", "options": ["People similar to your best clients", "Your friends", "A random audience"], "answer": 0}, "task": "Create 3 audience segments for ads: who they are, their pain and their interests.", "fields": [{"key": "s1", "label": "Segment 1"}, {"key": "s2", "label": "Segment 2"}, {"key": "s3", "label": "Segment 3"}], "stat": "audience", "result": "Your audience segments", "simulate": true},
      {"id": "5-3", "title": "Ads", "theory": ["Ads speed up what already works organically.", "The creative matters more than the budget.", "Test 2–3 versions with a small budget before scaling."], "video": "how to make a good instagram ad creative", "keyPoints": ["Ads = accelerator", "Creative beats budget", "Test small first"], "quiz": {"q": "Which post should you boost first?", "options": ["Your newest post", "A post that already performed well", "Your logo"], "answer": 1}, "task": "Write one ad: headline, main text, call to action and who it's for.", "fields": [{"key": "headline", "label": "Headline"}, {"key": "text", "label": "Main text", "long": true}, {"key": "cta", "label": "Call to action"}, {"key": "who", "label": "Who sees it"}], "stat": "hook", "result": "Your first ad", "simulate": true},
      {"id": "5-4", "title": "Analytics", "theory": ["Numbers are feedback, not a grade.", "Retention and saves say more than likes.", "Change one thing at a time and compare."], "video": "instagram reels analytics what metrics matter", "keyPoints": ["Metrics = feedback", "Retention beats likes", "Analyze, don't guess"], "quiz": {"q": "Which number shows people found the post useful?", "options": ["Saves", "Followers of other accounts", "Time of posting"], "answer": 0}, "task": "Take the numbers of a real post (yours, or any Short from Track a Short) and draw conclusions.", "fields": [{"key": "numbers", "label": "Views, likes, comments, saves", "long": true}, {"key": "conclusion", "label": "What worked and what didn't", "long": true}, {"key": "next", "label": "What you will test next"}], "stat": "audience", "result": "Your analytics habit", "simulate": true},
    ],
  },
  {
    id: 6, title: "Brand Building", goal: "Put it all into one system.",
    lessons: [
      {"id": "6-1", "title": "Brand kit", "theory": ["A brand kit makes you recognizable: same voice, colors and themes.", "Tone of voice is your character in words.", "Content pillars are what people remember you for."], "video": "how to create a personal brand kit tone of voice", "keyPoints": ["Style = recognition", "Tone of voice = character", "Visuals = your face"], "quiz": {"q": "What is tone of voice?", "options": ["Your microphone", "How your brand sounds in words", "Your logo color"], "answer": 1}, "task": "Build your brand kit: positioning, tone of voice, visual style and content pillars.", "fields": [{"key": "positioning", "label": "Positioning in one line"}, {"key": "tone", "label": "Tone of voice in 3 words"}, {"key": "visual", "label": "Colors and fonts"}, {"key": "pillars", "label": "3 content pillars"}], "stat": "clarity", "result": "Your brand kit", "simulate": true},
      {"id": "6-2", "title": "Content series", "theory": ["A series is a repeatable format with a name.", "Repetition builds recognition.", "Series make people come back for the next part."], "video": "content series ideas for instagram creators", "keyPoints": ["Series = retention", "Repetition = recognition", "Series help you grow"], "quiz": {"q": "Why do series work?", "options": ["People come back for the next part", "They are longer", "They need no hook"], "answer": 0}, "task": "Create 3 content series for your niche: a name and the format of each.", "fields": [{"key": "s1", "label": "Series 1: name + format"}, {"key": "s2", "label": "Series 2: name + format"}, {"key": "s3", "label": "Series 3: name + format"}], "stat": "story", "result": "Your content series", "simulate": true},
      {"id": "6-3", "title": "Offer & lead magnet", "theory": ["Your offer is what people can buy from you.", "A lead magnet is free value in exchange for contact: a checklist, a guide, a template.", "Leads are your future clients."], "video": "what is a lead magnet for small business", "keyPoints": ["Offer = what you sell", "Lead magnet = free value", "Leads = future clients"], "quiz": {"q": "Which is a lead magnet?", "options": ["A free 1-week meal plan PDF", "A paid course", "Your bio"], "answer": 0}, "task": "Create your offer and a lead magnet that leads to it.", "fields": [{"key": "offer", "label": "Your offer: what you sell and the price"}, {"key": "magnet", "label": "Lead magnet title"}, {"key": "inside", "label": "What's inside it", "long": true}, {"key": "cta", "label": "How you ask for it in a video"}], "stat": "trust", "result": "Your offer and lead magnet", "simulate": true},
    ],
  },
  {
    id: 7, title: "Real Launch", goal: "Go live for real.",
    lessons: [
      {"id": "7-1", "title": "Launch plan", "theory": ["Preparation is half of success.", "A calendar turns motivation into a system.", "Plan 4 weeks with one theme per week."], "video": "how to plan 30 days of content for instagram", "keyPoints": ["Preparation = 50% of success", "Calendar = system", "Never launch without a plan"], "quiz": {"q": "What makes posting consistent?", "options": ["Motivation", "A content calendar", "Luck"], "answer": 1}, "task": "Make a 30-day launch plan: one theme and number of posts per week.", "fields": [{"key": "w1", "label": "Week 1"}, {"key": "w2", "label": "Week 2"}, {"key": "w3", "label": "Week 3"}, {"key": "w4", "label": "Week 4"}], "stat": "clarity", "result": "Your 30-day launch plan", "simulate": true},
      {"id": "7-2", "title": "First 7 videos", "theory": ["Your first 7 videos are a test, not a verdict.", "Don't wait for instant results.", "Look at what worked and do more of it."], "video": "first videos as a new creator tips", "keyPoints": ["First 7 videos = a test", "Don't expect instant results", "Analyze and adjust"], "quiz": {"q": "What are your first videos for?", "options": ["Going viral", "Testing what works", "Selling right away"], "answer": 1}, "task": "Write the titles of your first 7 videos and the full script of the first one.", "fields": [{"key": "titles", "label": "7 video titles (one per line)", "long": true}, {"key": "script", "label": "Full script of video 1", "long": true}], "stat": "story", "result": "Your first 7 videos", "simulate": true},
      {"id": "7-3", "title": "Publish & analyze", "theory": ["Publishing is the start, not the finish.", "Your numbers tell you what to repeat.", "Adjust and scale what works."], "video": "how to analyze your first instagram reel", "keyPoints": ["Publishing = the start", "Metrics = feedback", "Adjust and scale"], "quiz": {"q": "After publishing, what's next?", "options": ["Wait and hope", "Check numbers and adjust", "Delete if it flops"], "answer": 1}, "task": "Publish your first real post. Paste its link and write what you will change next time.", "fields": [{"key": "link", "label": "Link to your post"}, {"key": "result", "label": "What happened (views, comments, DMs)", "long": true}, {"key": "next", "label": "What you will change next time"}], "stat": "trust", "result": "Your first real post", "simulate": true},
    ],
  },
];

export const ALL_LESSONS = BLOCKS.flatMap((b) => b.lessons.map((l) => ({ ...l, block: b.id, blockTitle: b.title })));
export const getLesson = (id) => ALL_LESSONS.find((l) => l.id === id);

export const PERSONAS = ["Future client", "Skeptic", "Beginner", "Expert", "Hater"];
export const PASS_SCORE = 6;
export const XP_PER_LESSON = 80;
export const LIFE_REFILL_DAYS = 7;
