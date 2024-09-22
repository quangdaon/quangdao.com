<script lang="ts">
	import { tooltip } from '$lib/actions/tooltip';
	import Quote from '$lib/components/shared/Quote.svelte';
</script>

# Hi, I'm Quangdao (aka Q)

I am an endlessly-curious, multi-talented, highly-functional robot. As a programmer, I specialize in the .NET environment, but I also have experience in PHP and Node.JS. By day, I am currently employed as a Technical Lead at nvisia, where I build applications for a variety of clients ranging from private software solution providers to government utility companies. By night, I’m usually charging my battery, but when I’ve still got some juice left over, you can find me in a pile of trading cards or plucking away (poorly) at my guitar.

TL;DR: <abbr title="robot">🤖</abbr>, <abbr title="day job is computer stuff">☀️:🧑‍💻</abbr>, <abbr title="outside of work, I like cards and guitars">🌙:🃏🎸</abbr>

<Quote by="Francis of Assisi">Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.</Quote>

## My Story

Curiosity killed the cat. Good thing it has eight more lives.

When I was twelve, I launched my own website. I think I was playing an online Pokémon game when I saw an advertisement for a service called freewebs.com (now defunct). Anyone can host their own website for free. The idea seemed incredible: I can own the next Google. So I signed up. My website, as you might expect, was pretty meaningless - just a bunch of ramblings and desperate pleas for others to check it out. Because I thought it was the greatest thing ever. It wasn't.

Soon after, I discovered that there was more to a website than just drag and drop. I discovered code. Not understanding what it was, I dropped a code block onto a page and started messing around with it. At first, I thought it was just another textbox, but without the bold and italics. It seemed pointless. But I looked up what "HTML" was and found out that I was not limited to just simple headers, paragraphs, and links. I could do whatever I wanted. I could even make... popup boxes. That's the story of how I discovered JavaScript. I thought it was the greatest thing ever. It was.

Over a decade later, my passion for technology has not diminished; it has only evolved. In that time, I have designed products using AutoCAD, sold spatulas with custom laser-engraved handles, and programmed a robot to play disc golf. Once I actually graduated high school, my focus shifted back to the web. I quickly learned PHP, C#, and TypeScript in addition to what I already knew about HTML, JavaScript, and CSS. I figured out technologies like MongoDB and NodeJS and subsequently applied that knowledge to grasp ASP.NET (Core and MVC) and Microsoft SQL. Many years ago, I signed up for a content management system before even knowing the term. Since then, I have built and maintained more than one. All because I was curious about a little ad.

## What Makes Me a Robot?

I... don't remember. Not the full story anyway. It started off as a joke at work, where certain things I did would be met with a comment about how I'm a robot. At one point, I created [a little app](https://quangdaon.github.io/q-robometer/) where my coworkers could input records of my robotic behavior.

<style lang="scss">
	@use '@scissors/breakpoints';
	@use '@scissors/media';

	abbr {
		text-decoration: none;
		&:hover {
			background: var(--color-green-base-op-1);
		}
		@include media.dark {
			&:hover {
				background: var(--color-orange-500-op-1);
			}
		}
	}
</style>
