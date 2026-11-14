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
  { id: 3, title: "Video Production", goal: "Film and edit simple, good-looking videos.", lessons: [], soon: ["Filming a talking head", "B-roll", "Editing"] },
  { id: 4, title: "Platform Mastery", goal: "Instagram, TikTok and YouTube Shorts.", lessons: [], soon: ["Instagram", "TikTok", "YouTube Shorts"] },
  { id: 5, title: "Growth & Marketing", goal: "Turn content into clients.", lessons: [], soon: ["Funnel", "Targeting", "Ads", "Analytics"] },
  { id: 6, title: "Brand Building", goal: "Put it all into one system.", lessons: [], soon: ["Style & tone of voice", "Content series", "Offer & lead magnet"] },
  { id: 7, title: "Real Launch", goal: "Go live for real.", lessons: [], soon: ["Launch plan", "First 7 videos", "Publish & analyze"] },
];

export const ALL_LESSONS = BLOCKS.flatMap((b) => b.lessons.map((l) => ({ ...l, block: b.id, blockTitle: b.title })));
export const getLesson = (id) => ALL_LESSONS.find((l) => l.id === id);

export const PERSONAS = ["Future client", "Skeptic", "Beginner", "Expert", "Hater"];
export const PASS_SCORE = 6;
export const XP_PER_LESSON = 80;
export const LIFE_REFILL_DAYS = 7;
