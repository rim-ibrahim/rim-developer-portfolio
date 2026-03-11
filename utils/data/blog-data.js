export const blogData = [
  {
    id: 1,
    title: "Building AI Chatbots for Nawaa Platform",
    description: "My experience integrating OpenAI's API into a production SaaS platform. What worked, what didn't, and the lessons I learned about managing costs and user experience.",
    cover_image: "/blog/ai-chatbot.jpg",
    published_at: "2024-12-15",
    tags: ["OpenAI", "Node.js", "Fastify", "AI", "Chatbot"],
    slug: "building-ai-chatbot-openai-nodejs",
    reading_time_minutes: 8,
    content: `
Working on Nawaa's AI chatbot feature, I genuinely thought it would be a simple job. Call OpenAI's API, display the response, move on. Turns out, building something people actually use is a completely different story.
The hardest part had nothing to do with the API integration itself. It was figuring out how to make the chatbot feel responsive while keeping costs under control. Every single API call costs money, and users expect things to happen instantly. Those two realities do not get along well.
For the stack, I went with Fastify instead of Express. We were dealing with a lot of concurrent requests, and Fastify's performance genuinely made a difference. Socket.IO handled the real time updates, so users could watch responses come in as they were being generated. That alone made the whole experience feel snappier, even when it technically wasn't.
MongoDB took care of storing conversation history, which turned out to be more important than I initially expected. Without that context from previous messages, the chatbot's responses felt disconnected and shallow.
The tricky parts came in a few different shapes. Token management was one of the bigger headaches. OpenAI charges by token, and conversations can spiral into expensive territory pretty fast. I ended up building a truncation system that holds onto recent context but quietly drops older messages. Not a perfect solution, but it gets the job done.
Streaming responses was another thing I'm really glad we prioritized. Nobody wants to sit there staring at a loading spinner for ten seconds. When the response builds up word by word, it just feels faster, even if the total time is the same.
Rate limits also humbled me more than I'd like to admit. We eventually put proper retry logic in place with exponential backoff, so when OpenAI's API gets slow or hits a limit, the system recovers gracefully instead of just falling apart.
Looking back, I would have invested more time in prompt engineering from the very beginning. We went through a lot of trial and error before landing on prompts that gave consistently good results. I also would have set up response caching earlier, it would have saved real money in those first weeks.
The authentication side was the easiest part, just JWT tokens, nothing complicated. But it works and it keeps everything secure.
The biggest takeaway from all of this is that production AI features need far more infrastructure than you'd expect going in. It is never just about calling an API.
    `
  },
  {
    id: 2,
    title: "Building Studiyo CRM: Managing Educational Programs",
    description: "How I built a CRM system from scratch for an education company. The challenges of handling bookings, student data, and making it work for both admins and teachers.",
    cover_image: "/blog/crm-system.jpg",
    published_at: "2024-11-20",
    tags: ["React", "MongoDB", "Node.js", "CRM", "Full-Stack"],
    slug: "building-fullstack-crm-react-mongodb",
    reading_time_minutes: 10,
    content: `
Studiyo needed a way to manage their educational programs, track students, handle bookings, and give teachers access to their class data. They had been running everything through spreadsheets, and it was starting to fall apart. So I built them a CRM.
The main requirement sounded simple enough at first. Make it easy to book students into programs and let teachers see their schedules. But like most projects, it kept growing. They needed analytics, a points system for students, different permission levels, and a handful of other things that came up along the way.
For the frontend I went with React and Vite, mostly because the fast refresh during development made the whole process smoother. Tailwind handled the styling, which was a lifesaver since I'm not a designer. Having utility classes meant I could move quickly without getting stuck on CSS decisions.
On the backend, Express and MongoDB were the natural picks. I know them well, and MongoDB's flexibility turned out to be genuinely useful since the requirements kept shifting throughout the project.
The booking system was where things got frustrating. It sounds like a simple feature until you actually sit down to build it. There was a lot hiding underneath, checking spot availability, making sure students couldn't double book, handling cancellations and waitlists, and sending notifications to teachers and parents. I ended up writing a significant amount of validation logic just to cover all the edge cases. The calendar integration added another layer of difficulty since teachers were checking their schedules on their phones, so everything had to work properly on mobile too.
For access control, admins needed to see everything, teachers only needed their own classes, and students and parents got limited access. JWT tokens with role checks on every API endpoint took care of the logic side. The harder part was the UI, figuring out how to show and hide features based on roles without turning the codebase into a mess. I eventually landed on a simple permission hook that components could tap into, and that cleaned things up nicely.
The analytics dashboard came together around Chart.js for the graphs. The data aggregation side in MongoDB was actually one of the more interesting challenges. I had to properly learn aggregation pipelines to get the enrollment trends, program popularity, and revenue projections they wanted. They're a powerful tool once you spend enough time with them.
Looking back, MongoDB's flexibility was a real advantage in the early stages when nothing was fully defined yet. But I should have put more thought into the schema design before diving in. A few data migrations came up later that could have been avoided with a bit more planning upfront.
The other thing I'd do differently is pagination from day one. I didn't prioritize it early enough, and when the student list grew into the thousands, performance took a hit. Adding it later meant going back and updating a bunch of components that were never built with it in mind.
The points system was surprisingly the easiest part of the whole project. Increment and decrement numbers, show a leaderboard, done. But the students loved it, which ended up being one of the features people talked about most.
Would I do it again? Absolutely, but I'd be more deliberate about the database schema from the start and I'd bring in proper testing much earlier. The project works well and Studiyo is happy with it, and honestly that's what matters most.
    `
  },
  {
    id: 3,
    title: "Why I Switched from Express to Fastify",
    description: "Express was getting slow under load, so I rebuilt our backend with Fastify. Here's what changed and whether it was worth the effort.",
    cover_image: "/blog/nodejs-backend.jpg",
    published_at: "2024-10-10",
    tags: ["Node.js", "Fastify", "Backend", "API", "Architecture"],
    slug: "scalable-nodejs-backend-fastify",
    reading_time_minutes: 12,
    content: `
Our Express backend was fine, until it wasn't. Response times started creeping up, and we were handling more concurrent users than we had originally planned for. I had heard Fastify was faster, so instead of refactoring the old project I decided to try it on a new one from scratch.
First impressions were good. Fastify feels familiar if you've used Express, which kept the learning curve manageable. The biggest structural difference is that everything runs through a plugin system. That felt like extra overhead at first, but it actually does a good job of keeping things organized once you settle into it.
The built in schema validation was a pleasant surprise. With Express I was always reaching for a separate validation library. Fastify handles it natively using JSON Schema, and as a bonus it generates documentation automatically from the same definitions. Less code to write, less to maintain.
On the performance side, the benchmarks are real. In actual production use, our API response times dropped somewhere between 30 and 40 percent for the same operations. Not a dramatic transformation, but when you're processing thousands of requests it adds up to something worth caring about.
For folder structure I keep things straightforward. Routes handle the API endpoints, services hold the business logic away from the route handlers, models deal with the database layer, plugins store reusable Fastify specific code, and utils catches everything else. Nothing groundbreaking, but the key principle is keeping route handlers as thin as possible and pushing real logic into services.
Authentication is JWT tokens, nothing unusual there. Fastify has a solid JWT plugin that makes the basic setup quick. I also added OAuth for social logins, which took more effort than I expected. The libraries help, but there is still a fair amount of redirect handling and token management involved. Rate limiting on the other hand was almost effortless, it comes as a plugin and you just configure your limits and move on.
For the database layer, MongoDB with connection pooling. The most important thing there is making sure you reuse connections rather than opening new ones per request, because that will quietly destroy your performance. Indexes matter too. If you are querying a field frequently, index it. It sounds obvious but I have seen genuinely slow queries that needed nothing more than a single index to fix.
For complex queries, MongoDB's aggregation pipelines are powerful but the syntax takes some getting used to. Worth investing the time to learn them properly though, the performance payoff is real.
Socket.IO handles the real time side of things. Users can watch progress when creating AI services, which makes the app feel alive rather than leaving them staring at nothing. The integration between Socket.IO and Fastify is smooth, they cooperate well without much friction.
Deployment is a fairly standard setup. PM2 keeps the process running and manages restarts, Nginx sits in front as a reverse proxy and takes care of SSL. It runs reliably on a basic VPS without any drama. One thing I always stick to is environment variables for all config. No hardcoded API keys, no hardcoded database URLs. It seems like an obvious rule but I have seen it ignored more times than I should have.
Was the switch worth it? For new projects, yes without much hesitation. Fastify is faster and the plugin system produces cleaner code. For existing Express apps the answer depends on the situation. If performance is genuinely causing problems, it might be worth the migration effort. If Express is working fine, probably not.
The real long term benefit is not just the speed gain anyway. It is the structure. The plugin system and built in validation push you toward a cleaner codebase, and that ends up mattering a lot more than saving a few milliseconds on each response.
    `
  },
  {
    id: 4,
    title: "OpenAI API: Things I Wish I Knew Before Starting",
    description: "Lessons learned from integrating OpenAI into multiple production apps. Mostly about managing costs and handling failures gracefully.",
    cover_image: "/blog/openai-integration.jpg",
    published_at: "2024-09-25",
    tags: ["OpenAI", "AI", "API", "Integration", "Production"],
    slug: "integrating-openai-apis-production",
    reading_time_minutes: 9,
    content: `
I have integrated OpenAI's API into a few projects now, chatbots, website generators, content assistants. Each time I learned something new, usually the hard way. Here is what I wish someone had told me before I started.
Cost is the big one. OpenAI charges per token, which roughly maps to per word, and it adds up faster than you expect. A single conversation might only cost a few cents, but that stops feeling small quickly when you have hundreds of users having multiple conversations every day.
A few things that helped with this. Counting tokens before making API calls so users cannot accidentally send massive prompts. Using GPT-3.5-turbo for simpler tasks since GPT-4 is significantly smarter but also significantly more expensive. Caching responses where it makes sense, because if someone asks the same common question repeatedly there is no reason to hit the API every single time. And setting per user limits, because without them one person can quietly burn through your entire API budget.
Error handling is not optional. The API fails, and it fails more often than you would like. Rate limits, timeouts, random 500 errors. If you are not handling these properly your app just breaks in front of your users.
Every API call I write now is wrapped in a try catch block. When I hit rate limits I retry with exponential backoff. When the API is down I show a clean error message instead of letting the whole thing crash. I also always set timeouts, because leaving a request hanging indefinitely while waiting for a response is a bad experience for everyone.
Streaming is worth the extra implementation effort. Instead of making users wait for a complete response to load all at once, streaming lets them watch it build word by word in real time. It feels faster even when the total time is identical. The code is a bit more involved but the improvement to the experience is noticeable.
Prompt engineering makes a bigger difference than I initially gave it credit for. I wasted a lot of time tweaking code when the actual problem was that my prompts were not good enough. Being specific matters enormously. Asking the AI to write a product description is vague. Asking it to write a 50 word product description for a specific item while highlighting particular qualities gives you something usable. Including examples in your prompts helps, system messages are useful for shaping the AI's overall behavior, and testing across different inputs is essential because what works cleanly in one case can fall apart in another.
On the security side, never trust user input. People will try to inject prompts to manipulate the AI into doing things it should not. Sanitize everything before it reaches OpenAI. Keep API keys in environment variables and never let them anywhere near a Git commit. That should be obvious, but I have seen it go wrong. Also implement rate limiting at the application level rather than relying entirely on OpenAI's own limits. It prevents abuse and it saves money.
Across these projects I built a chatbot generator for Nawaa where users describe what they want and the AI configures it, a website generator that produces basic sites from plain descriptions, a content assistant for Zainlee that helps with marketing copy, and a database query tool that lets you ask questions in plain English and get data back. Each one taught me something different about working with AI APIs at a practical level.
The honest reality is that OpenAI's API is genuinely powerful, but it is not magic. It fails, it costs real money, and it needs careful integration to work well. When you get it right though, it unlocks features that simply would not be possible any other way. Just go in with realistic expectations and build for failure from the start. Your users will notice the difference.
    `
  },
  {
    id: 5,
    title: "Adding Real Time Updates Without Overcomplicating Things",
    description: "Socket.IO made adding live updates easier than expected. Here's how I used it for progress tracking and notifications.",
    cover_image: "/blog/socketio-react.jpg",
    published_at: "2024-08-15",
    tags: ["Socket.IO", "React", "Real Time", "WebSockets", "Frontend"],
    slug: "realtime-features-socketio-react",
    reading_time_minutes: 7,
    content: `
Users were complaining that creating AI services in Nawaa felt slow. The process took anywhere from 30 to 60 seconds, and the entire time they just stared at a loading spinner with no indication of what was happening or whether anything was working at all. I needed to give them real progress updates, and Socket.IO felt like the right tool for it.
WebSockets let you push data from the server to the client instantly, no polling, no repeated HTTP requests. Socket.IO wraps WebSockets and handles fallbacks for older browsers automatically, and the setup is straightforward enough that it did not feel like a heavy investment to get started.
On the backend, you create a Socket.IO instance and listen for connections. As each client connects, you can emit events directly to them. For the service creation flow, I emit a progress update at each meaningful step, something like starting the AI configuration, generating chatbot responses, deploying the service, and finally signaling completion. Each update goes to that specific user's socket connection, so nobody else sees what is not meant for them.
On the React side, the socket connection opens when the component mounts and listens for incoming progress events. When one arrives, it updates the state and the UI reflects it right away. One thing worth being careful about is cleaning up the socket connection when the component unmounts. Skip that step and you will end up with memory leaks and some genuinely confusing bugs.
A few problems came up along the way. Reconnection was one of them. Users drop connections for all sorts of reasons, bad wifi, a phone going to sleep, whatever. Socket.IO handles the reconnection itself automatically, but you still need to think through what happens when someone reconnects in the middle of an ongoing process. Multiple tabs was another wrinkle. Each tab opens its own socket connection, so I had to add logic on the backend to avoid duplicating work when that happened. Authentication also needed attention since you cannot just let anyone connect. I pass the JWT token when establishing the socket connection and verify it server side before anything else happens.
Once Socket.IO was in place I found other uses for it pretty naturally. Notifications for things like new messages or a service becoming ready, live status updates showing whether a service is online, and a real time metrics view in the admin dashboard.
Performance was not really an issue, with one exception. Sending updates too frequently, like every 100 milliseconds, is overkill and just wastes bandwidth. Throttling to somewhere between 500 milliseconds and a full second is more than fast enough for what users actually notice.
Was it worth it? Definitely. Users can now see exactly what is happening during service creation, and the app feels more alive even though the underlying process takes the same amount of time. That perception of responsiveness matters more than people sometimes give it credit for. The whole implementation took a day or two, which feels like a reasonable trade for the improvement in experience it delivered.
If you need real time updates in your app, Socket.IO is a solid choice. It is not complicated once you spend a little time with it.
    `
  },
  {
    id: 6,
    title: "Making Next.js Sites Actually Fast",
    description: "The Zainlee website was slow. Here's what I did to fix it and get better Lighthouse scores without overthinking it.",
    cover_image: "/blog/nextjs-performance.jpg",
    published_at: "2024-07-30",
    tags: ["Next.js", "Performance", "Optimization", "SEO", "Web Vitals"],
    slug: "nextjs-performance-optimization",
    reading_time_minutes: 11,
    content: `
The Zainlee Technologies website was sitting at a Lighthouse score in the mid 60s. Not terrible, but not good either, and honestly it did feel sluggish when you used it. The client wanted it faster, so I dug in.
Running Lighthouse and PageSpeed Insights made the problems pretty clear. Images were massive, with the hero image alone coming in at over 2MB. Too much JavaScript was loading upfront before it was actually needed. Fonts were causing visible layout shifts. And there was no real caching strategy in place.
Images were the easiest win by a significant margin. Next.js has a built in Image component that handles optimization automatically, so the fix was mostly just swapping out regular img tags. The component serves WebP format on its own, resizes images for different screen sizes, lazy loads anything below the fold, and prevents layout shift. That hero image dropped from over 2MB down to around 200KB. The impact on load time was immediate and obvious.
The one thing to know going in is that you need to specify width and height explicitly. Next.js uses those to calculate aspect ratios and avoid layout shift. It feels a bit fussy at first but it makes sense once you understand why it needs them.
Code splitting was the next thing to tackle. The site was dumping all of its JavaScript onto the first page load, including code for things that were not needed until much later. Dynamic imports solved this. For components that are not immediately visible, things like modals or a chat widget, I used next/dynamic so they only load when they are actually needed. The initial bundle size came down noticeably.
For caching, Next.js has Incremental Static Regeneration, which lets you cache pages and revalidate them on a schedule. For content that does not change frequently this is close to ideal. I set revalidation to 3600 seconds, so one hour, for most pages. They serve instantly from cache, and Next.js quietly rebuilds them in the background on that interval. Users get fast page loads with content that is still reasonably fresh.
The font situation was straightforward to fix once I knew where to look. Google Fonts were loading externally and causing layout shifts in the process. Next.js 13 and above has built in font optimization through next/font/google. Importing fonts that way gets them automatically optimized and self hosted, which eliminated the layout shift and also sped up font loading since they were no longer coming from Google's servers.
The results were worth the effort. Lighthouse went from the mid 60s up to above 90. More importantly, the site actually feels fast now. Pages load almost instantly and the janky shifting that was happening before is gone. SEO benefited too, since Google factors page speed into rankings, and we saw improvements there after the changes went live.
The broader lesson from this is that most Next.js performance work is not complicated. The built in tools handle the heavy lifting if you actually use them. The Image component, next/font, dynamic imports, and ISR together cover the vast majority of what matters. These basics honestly get you about 90 percent of the way there.
The remaining 10 percent, pushing from 90 to a perfect 100, involves micro optimizations that are rarely worth the time for most projects. Diminishing returns set in fast at that level. Start with images, code splitting, and caching. That is where the real gains live.
    `
  }
];
