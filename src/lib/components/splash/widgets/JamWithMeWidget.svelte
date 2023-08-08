<div class="notes">🎵</div>

<style lang="scss">
    .notes {
		transform-origin: 90% 100%;
		transition: transform 200ms;
		&:hover {
			transition: none;
			animation: wave 1s 1 forwards;
		}
	}

	@keyframes wave {
		$amt: 5deg;
		0% {
			transform: rotate(0deg);
		}
		12.5% {
			transform: rotate($amt);
		}
		37.5% {
			transform: rotate(-$amt);
		}
		62.5% {
			transform: rotate($amt);
		}
		87.5% {
			transform: rotate(-$amt);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>