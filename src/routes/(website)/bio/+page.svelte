<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
</script>

<PageLayout>
	<h1 class="title" slot="title">
		<span>Hi, I'm Quangdao (aka Q)</span>
	</h1>
	<p>I am an endlessly-curious, multi-talented, highly-functional robot. As a programmer, I specialize in the ASP.NET Core environment, but I also have experience in PHP and Node.JS. By day, I am currently employed as a Technical Lead at nvisia, where I build applications for a variety of clients ranging from private software solution providers to government utility companies. By night, I’m usually charging my battery, but when I’ve still got some juice left over, you can find me in a pile of trading cards or plucking away (poorly) at my guitar. I have also been known to take a joke too far.</p>
</PageLayout>

<style lang="scss">
	@use '~/breakpoints';

	.title {
		@include breakpoints.large {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
