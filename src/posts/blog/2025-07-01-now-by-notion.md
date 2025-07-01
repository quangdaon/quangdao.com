---
title: /now - Powered by Notion
description: I am jumping on the Now page train, and am using Notion to do it.
tags: [api, tutorial, sveltekit, website-updates]
categories: [Technology]
date: '2025-07-01'
---

<script>
	import Quote from '$lib/components/shared/Quote.svelte';
</script>

I first heard about this movement to create a ["Now" page](https://nownownow.com/about) around half a year ago. If you are not familiar, it is a movement popularized by [Derek Sivers](https://sive.rs/nowff) in 2015. The idea is similar to the typical "About" or "Bio" page you might find on someone's website, except with an emphasis on what they are focused on [right _now_](/now).

I am normally not one to chase trends. If anything, I like finding ways to go _against_ the grain. For some reason, this particular idea spoke to me, and so I thought about giving it a go. Here's the problem though -- I, like many humans, am stricken with a multitude of fatal flaws. One of these flaws includes the inability to be consistent and keep my stuff up-to-date. With the way my site is set up, making an update to my Now page means pulling down my codebase, finding and editing a file, and pushing it back up. That is not a lot of work by any means; obviously I am perfectly satisfied with that process for writing a blog post or I would not have set it up this way. But for quick updates about things going on in my life, it is a bit of a chore. Goodness knows that if I took this route, my Now page would be five years out of date by August. However, there is one tool I use daily that could help me maintain this page.

## Plan A

If you read the title of this post, you may already know what I am talking about. [Notion](https://www.notion.com/) is a productivity tool for organizing notes and ideas. Their database-like structure makes it easy to keep things organized.

Originally, my plan was to manage the content of my Now page in the repo. But to add a layer of upkeep and accountability, I was going to set up a tracker in Notion to log my activities within each engagement. It would be like a daily journal and also give me some insight into just how much time I am spending on all my hobbies. If a section does not have an activity logged in two weeks -- poof -- it stops showing on the page.

As I was building this feature, something struck me: why am I not just managing _all_ of this in Notion? Just when I was about done building a Now page that dynamically hid sections without any activity for two weeks, I scrapped the whole thing and started over.

## Plan B

Well, not exactly the _whole_ thing. I still had the bare essentials to hook up to Notion. Before we get into the code, let's talk about how my Notion tracker is structured. Here is the schema for the relevant parts of my Notion setup:

- **"Now" Tracker**
	- **Passions** (database)
		- **Title**
		- **Display Mode** (select)
			- Default
			- Always Hide
			- Always Show
		- **Activities** (relation - multi)
		- **Latest Activity** (rollup on Activities.Date, pulling the latest)
		- **Sort Order** (number)
	- **Assets** (database)
		- **Passions** (relation - multi)
	- **Activities** (database - Calendar)
		- **Date** (date)
		- **Passion** (relation - single)
		- **Assets** (relation - multi)

### Passions

"Passions" is the top-level database that tracks everything I want to show on my Now page. Originally, I called it "Hobbies," but I wanted to be more general. I am still a bit iffy on the name but it works for now. Each "passion" is rendered as a section on the page, with content pulled directly from its Notion page.

The Display Mode property controls how it shows on the page. By default, it follows the original plan - if there was an activity logged for this in the last two weeks, show it, otherwise don't. "Always Show" forces the section to appear on my Now Page. This is for cases that are not event-bound, like programming, which I do for a living. "Always Hide" is a way for me to hide sections I want to track but not render. I envision this being for things I do not have content prepared for but have started tracking activity on. At this point, nothing is hidden, but I figured if I was going to add an Always Show, I should have an Always Hide.

### Assets

Assets are components or resources associated with a passion. Some examples of these include video games I am playing, songs I am learning on guitar, or communities I am involved in. I am not actually using these on the page right now, but I may incorporate them later to get finer control over dynamically hiding stale content.

### Activities

This one is simple: it is a log of when I engage with a particular passion. That's all.

## Retrieving Content from Notion

Thanks to Notion publishing a JavaScript SDK, integrating with my database is a piece of cake.

```ts
export const getNotionPassions = async () => {
	const client = new Client({ auth: NOTION_TOKEN });
	const today = new Date();
	const threshold = +NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS; // 14
	const dateThreshold = new Date(today.setDate(today.getDate() - threshold));

	const results = await client.databases.query({
		database_id: NOTION_HOBBIES_DATABASE_ID,
		filter: {
			/* ... */
		},
		sorts: [
			/* ... */
		]
	});

	return results;
};
```

Rendering the content, however, is a different story. For one, Notion treats database pages as blocks with child blocks, which are not included with the database query response. This in itself is not a big deal; it just takes a bit of finesse to load all the necessary content.

```ts
export const getNotionPassion = async (pageId: string) => {
	const client = new Client({ auth: NOTION_TOKEN });

	const results = await client.blocks.children.list({
		block_id: pageId
	});

	return results;
};

const processActivity = async (entry: PageObjectResponse): Promise<Activity | null> => {
	const name = entry.properties['Name'];

	if (name.type !== 'title') return null;

	const page = await getNotionPassion(entry.id);

	return {
		notionId: entry.id,
		title: name.title[0].plain_text,
		content: renderContent(page)
	};
};

export const getActivities = async (): Promise<ActivitiesResponse> => {
	const passions = await getNotionPassions();
	const editTs = passions.results.map((h) => new Date((h as PageObjectResponse).last_edited_time));

	const promises: Promise<Activity | null>[] = passions.results.map((h) =>
		processActivity(h as PageObjectResponse)
	);

	const activities = (await Promise.all(promises)).filter((e) => e !== null);
	const lastUpdated = [...editTs].toSorted((a, b) => +b - +a)[0];

	const result = {
		lastUpdated,
		activities
	};

	return result;
};
```

The main trouble is that the response from Notion's Blocks API is not actually the content itself. Rather, it _describes_ the content. Which means that turning the blocks into HTML would require a bit of elbow grease. I will not be going through every step of it here. If you are interested, my website is fully open source and you can [check out the rendering code on GitHub](https://github.com/quangdaon/quangdao.com/blob/main/src/lib/integrations/notion/rendering.ts).

At this point, I have all the data to create the view (and am even doing some of that on what is supposed to be the backend). That means that the page is now technically complete. But there was one major issue remaining...

## Roadblock #1 - Performance

As I was integrating with Notion's API, it became very clear that the speed was not up to my standards. Performance is not everything, but taking several seconds to load every single request to the page was just unacceptable. To say that I would not know how to handle the load in their shoes would be empty sympathy. After all, it is kind of my job to build performant, scalable applications. But my background does give me enough authority to say that building fast APIs can definitely be a challenge.

In any case, I was not happy with how long my Now page was taking to load, and had to figure out a way around that. So I came up with a plan. Anyone who has had to deal with performance while integrating with a third party will know that the obvious solution is to cache the response. When I first built this blog in SvelteKit, I wanted it to be self-contained. Unless I absolutely _had_ to, I was not interested in integrating with something like Redis for a persistent caching mechanism. So I started off by implementing an in-memory cache by storing the response and "last checked" timestamp in a module-scope variable.

The lifetime of a cache is very important to get right -- if it is too short, then your users will not see the benefits of caching. But if it is too long, your content has the potential to go stale. There was, however, one trick that would allow me to get around some of those drawbacks: Notion Webhooks.

Putting it all together, here was my plan: when the Now page is requested, check the cache. If the cache is neither empty nor stale, simply return the cached data. Then, my Notion API integration would be set up with a Webhook that calls a separate endpoint, `/api/now/refresh`, each time I update any content in my "Now" Tracker. That endpoint kicks off the process to retrieve the latest content from Notion in the background. If a user hits the Now page while this process is running, they would still see the previous cached content, resulting in no downtime in the performance. To accommodate this architecture, here were the changes I needed to make to the code:

```ts
// Helper Functions
const isCacheStale = (date: Date) => {
	const threshold = new Date();
	threshold.setDate(threshold.getDate() - +NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS); // 14 days

	return date < threshold;
};

export const getActivities = async (): Promise<ActivitiesResponse> => {
	if (cache.data && cache.lastChecked && !isCacheStale(cache.lastChecked)) {
		return cache.data;
	}

	const result = await refreshActivities(); // Same as original getActivities function above, except results are saved to "cache.data"

	return result;
};

// Handler for /api/now
export async function GET() {
	const result = await getActivities();

	return json(result);
}

// Handler for /api/now/refresh
export async function POST() {
	refreshActivities(); // This is a promise - Kick off process in the background, then immediately respond with a 202
	return new Response(null, { status: 202 }); // 202 = Accepted, to let the caller know that work is happening, but not completed
}
```

This workflow was fairly easy to test in local development -- I simply had to send a POST request to my localhost each time I want to simulate a refresh webhook from Notion. However, there was a piece missing from the puzzle to actually get this working with Notion.

## Roadblock #2 - Notion Webhook Validation

In order for Notion to start sending stuff through my webhook, it first needs to verify my endpoint. How it does this is by sending an initial request with a token in the body, which needs to be added back to the webhook configuration. Simple enough -- I just need to set the endpoint up to print the token to my output log and copy it to the config.

I also wanted to take advantage of Notion's process for verifying the request to protect my own endpoint. Here is the problem though -- this verification process is very much intended to make use of some sort of persistence mechanism. You get a request from Notion with the verification token, which is then stored and later used to verify future requests. As I mentioned, my blog is fully contained within each instance. Which means that each time I restart the app, which happens whenever I deploy changes, like publishing new post, it "forgets" the verification token. To get around this, I managed to come up with a bit of a hack.

My new process for validating Notion webhook requests will require a two-stage deployment, at least upon the release of this feature. The first deployment will get the code changes out there. Then I can send Notion's initial verification request and see the token logged. In addition to sending the token back to Notion to verify the webhook, I can also store that token as an environment variable. Since those are statically built, I would need to redeploy my app for that to take effect, hence the two-stage deployment. But once that token is saved, I can use it to validate all future requests, in accordance to Notion's guidelines.

```ts
// Helper Functions
export const validateNotionWebhook = (token: string, body: string, signature: string): boolean => {
	const secret = NOTION_WEBHOOK_TOKEN;

	if (!secret || token) {
		// This is during the initial verification process
		console.log(`Token sent: ${token}`);
		return false;
	}

	const signedToken = createHmac('sha256', secret).update(body).digest('hex');
	const calculatedSignature = `sha256=${signedToken}`;

	if (dev) console.log(calculatedSignature); // To use the signature for testing purposes locally

	try {
		const isTrustedPayload = timingSafeEqual(
			Buffer.from(calculatedSignature),
			Buffer.from(signature)
		);

		return isTrustedPayload;
	} catch (err) {
		console.error(err);
		return false;
	}
};

// Handler for /api/now/refresh
export async function POST({ request }) {
	const rawBody = await request.text();
	const { verification_token: token } = JSON.parse(rawBody);

	const signature = request.headers.get('X-Notion-Signature') ?? '';

	const isValid = validateNotionWebhook(token, rawBody, signature);

	if (!isValid) {
		return error(403, { message: 'Forbidden' });
	}

	refreshActivities();
	return new Response(null, { status: 202 });
}
```

## Roadblock #3 - Netlify Functions

Locally, this was perfect. I had to cheat a bit because Notion cannot communicate directly with my local server, but when I made a change and then manually hit my refresh endpoint, it worked flawlessly. But as soon as I deployed my changes to a preview environment, everything went haywire. You see, I have not mentioned this yet, but this website is hosted on [Netlify](https://www.netlify.com/). As an aside, despite the issues I ran into while working on this project, I still highly recommend Netlify as a platform for hosting static websites. But the way SvelteKit works with Netlify is that dynamic routes are deployed as Functions, which work a little differently from a local Vite server.

On the preview site, I was able to make it through Notion's verification process. Even the validation on my side worked -- a request to my refresh endpoint will not go through without a proper signature. Unfortunately, it was the refresh process itself that was broken. I do not quite understand why this happens, but for whatever reason, the request I make to Notion times out on my preview deployment. If I had to guess, my assumption is that is has to do with how background processes work in a serverless function. There was an easy fix for this - I awaited the call. Of course, 202 is no longer the correct status code as it's executing the full process within the lifetime of the request, so I switched this to return a 204 once it was done. This does open up the potential for the request to time out if the refresh takes longer than ten seconds, but hopefully that will not be an issue.

With that update, things appeared to work at first. I was able to make a change in Notion, and after a few minutes, see the refresh process in my server logs. However, no matter how many times I refreshed my Now page, it was still serving the old content.

Initially I thought there was some weird caching thing going on on top of my own cache, but that wasn't the case. Each route becomes a separate function, which I came to learn runs in its own isolated environments. Which means that the module-scoped cache variable I was using was declared independently by each endpoint. In other words, the cache that `/api/now` was loading from was not the same cache that `/api/now/refresh` was saving to. On my local development server, this was not a problem because it was just running as a single SvelteKit app. Luckily, the fix was fairly simple -- each _route_ was a separate function, not each _handler_. So all I really needed to do was merge my refresh endpoint into the same route as my GET endpoint, and that allowed them both to be deployed within the same context.

Finally after all of that, everything was working. The content was cached, so the page loaded in a reasonable amount of time. It would automatically refresh shortly after I made changes in Notion. Life was great. It was not until I left it running for a while that I found out about a last major issue. Apparently Notion treats all non-200 responses as failures, and after a certain amount of them, it automatically paused my webhook. This is actually just speculation, as I could not find any details on the failures, and my Netlify logs all indicated successful refreshes. But changing my endpoint from responding with a 204 to a 200 fixed these silent failures.

```ts
// Handler for /api/now
export async function GET() {
	const result = await getActivities();

	return json(result);
}

export async function POST({ request }) {
	const rawBody = await request.text();
	const { verification_token: token } = JSON.parse(rawBody);

	const signature = request.headers.get('X-Notion-Signature') ?? '';

	const isValid = validateNotionWebhook(token, rawBody, signature);

	if (!isValid) {
		return error(403, { message: 'Forbidden' });
	}

	await refreshActivities();
	return new Response(null, { status: 200 });
}
```

## _Now_ What?

What I like about the Now page idea is that it forces you to reflect on your priorities. And I will be honest -- manually keeping a	 list of my priorities up to date is not exactly one of mine right now. Notion helps bridge that gap, by providing an easy-to-edit platform, and also giving me something small to do every day as a reminder that I have this Now page. Every time I log an activity towards one of my hobbies, it gently nudges me and asks "hey, is the information you're sharing on your Now page still accurate?"

<Quote by="Mother Teresa">
Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.
</Quote>
