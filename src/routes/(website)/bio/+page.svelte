<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	interface Bio {
		title: string;
		content: string;
		label: string;
	}

	const bios: Bio[] = [
		{
			label: 'Shortest',
			title: '👋',
			content: '🤖,☀️:💻,🌙:🃏🎸'
		},
		{
			label: 'TL;DR',
			title: `Hi, I'm Q`,
			content:
				'I am a programmer that likes cards and guitars.'
		},
		{
			label: 'Standard',
			title: `Hi, I'm Quangdao (aka Q)`,
			content:
				'I am an endlessly-curious, multi-talented, highly-functional robot. As a programmer, I specialize in the ASP.NET Core environment, but I also have experience in PHP and Node.JS. By day, I am currently employed as a Technical Lead at nvisia, where I build applications for a variety of clients ranging from private software solution providers to government utility companies. By night, I’m usually charging my battery, but when I’ve still got some juice left over, you can find me in a pile of trading cards or plucking away (poorly) at my guitar. I have also been known to take a joke too far.'
		}
	];

	let bioIndex = bios.findIndex((e) => e.label === 'Standard');

	$: bio = bios[bioIndex];
</script>

<PageLayout>
	<h1 class="title" slot="title">
		<span>{bio.title}</span>

		<div class="bio-length">
			<label>
				<span>Bio Length:</span>
        <div class="selector">
          <input type="range" min={0} max={bios.length - 1} bind:value={bioIndex} />
          {bio.label}
        </div>
			</label>
		</div>
	</h1>
	<p>{bio.content}</p>
</PageLayout>

<style lang="scss">
	.title {
		display: flex;
		justify-content: space-between;
	}
	.bio-length {
    font-weight: normal;
		label {
			font-size: 1.2rem;
			display: inline-flex;
			align-items: center;
			span {
				display: inline-block;
				margin-right: 0.5rem;
			}
		}
    .selector {
      text-align: center;
      font-size: 0.75em;
      input {
        display: block;
      }
    }
	}
</style>
