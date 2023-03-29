# Styling Styleguides

### Don't: Import anything outside of `styles/utils` in a component

All components should be isolated and the rest of the `styles` folder should only include styles that apply globally.

### Do: Use `@use '~/blah'` to import utility declarations

References should then be prefixed with the source namespace. For example, when referencing a mixin, import the mixins file via `@use '~/mixins'` then use it with `@include mixins.whatever`.

### Don't: Declare actual CSS in `utils`

Once again, style rules should strictly be isolated to the appropriate component or global style. Declarations in `utils` should not generate any CSS on their own unless referred to explicitly.

### Do: Use placeholders for shared styles

In situations where common styles are shared across multiple blocks/components, create a placeholder and extend it from the relevant selectors.
