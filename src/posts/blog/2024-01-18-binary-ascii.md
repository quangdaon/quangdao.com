---
title: How to Decipher ASCII Binary Messages
description: 01001100 01100101 01110100 00100111 01110011 00100000 01100100 01100101 01100011 01101111 01100100 01100101 00100000 01100010 01101001 01110100 01110011
tags: [tutorial, binary, ascii, encoding]
categories: [Technology]
date: '2024-01-18'
---

<script>
	import BaseConverter from '$lib/components/diagrams/binary/BaseConverter.svelte';
	import AsciiTable from '$lib/components/diagrams/binary/AsciiTable.svelte';
	import TextEncoder from '$lib/components/diagrams/binary/TextEncoder.svelte';
</script>

Have you ever come across a message that looks like this?

> 01000101 01100001 01110011 01110100 01100101 01110010 00100000 01000101 01100111 01100111 00100000 01001000 01100101 01110010 01100101


Sometimes they might be missing the spaces to obfuscate the fact that each grouping of ones and zeroes represent something distinct, but either way, this is a string of “binary” digits. Binary can be used to encode “secret” messages. However, it’s not a particularly secure method. So while there is no shortage of free online binary translators, let us keep riding this [train of completely useless skills](https://www.quangdao.com/blog/how-to-draw-svgs-in-code) and learn how to decode binary messages by hand.

### What is Binary?

Binary, also known as Base-2, is a numeric system that uses two symbols (0 and 1) per digit to represent numbers, as opposed to decimal (Base-10), our normal counting system, which uses ten symbols (0-9). For example, 1 in binary is equal to 1 in decimal, but 10 in binary is 2 in decimal. In decimal, each digit to the left increases the magnitude of the digit by a power of 10. Then you add the value of each digit multiplied by its magnitude to get the final number. In other words 7,043 is equal to $(7 × 10^3) + (0 × 10^2) + (4 × 10^1) + (3 × 10^0)$ or $(7 × 1000) + (0 × 100) + (4 × 10) + (3 × 1)$ or $7000 + 0 + 40 + 3$. Binary works the same way, but in powers of 2. Starting from the right side, the first digit represents 1, the second 2, then 4, and 8, and so on. So the binary expression 110 is the same as $(1 × 2^2) + (1×2^1) + (0×2^0)$,  $(1 × 4) + (1 × 2) + (0 × 1)$, or $4 + 2 + 0$, which equals 6 in decimal.

In decimal, if I add a zero to the beginning of a number, such as 07,043, the value of the number doesn’t change. Technically, the left zero here represents $0 × 10^4$, but anything multiplied by `0` equals `0`. No matter how many zeroes are added to the left of a decimal number, its value remains the same. The same rule applies to binary, where leading zeros do not affect the value of an expression. This is more relevant because binary is often represented in terms of bytes. While there are specific reasons for this as far as how bytes are used in computing, for our purposes we can just think of a byte as a binary number with a set amount of digits. Most commonly, there are eight “bits” or digits in a byte, but a binary expression that looks like `00000110` is exactly the same as the `110` from earlier.

<BaseConverter baseIn={2} baseOut={10} />

### What is ASCII?

ASCII is a character code that computers use to represent characters like numbers, letters, and symbols. For example, the value of 48 translates to the literal character “0” for the number zero. In ASCII, capital letters are represented by the numbers 65-90, while lowercase letters are 97-122. You can think of the letters as being represented by the numbers 1-26, and then add 64 for its uppercase ASCII value, and 96 for its lowercase.

<details>
  <summary>Show ASCII Chart</summary>
  <AsciiTable/>
</details>

### Combining the Two

Memorizing the numbers 64 and 96 as “keys” is one way of being able to translate from ASCII codes, but there is a trick we can use in binary. Conveniently, 64 and 96, respectively, are `01000000` and `01100000`. This means that you can convert a letter to its numeric value, fill that into the five zeroes of either expression, and you will have its ASCII character codes.

If that doesn’t make sense, imagine if we came up with our own encoding system. In our system, the capital letters are represented by the decimal numbers 101-126 and the lowercase letters are 201-226. Here, we simply need to identify what position of the alphabet a letter is in and then add 100 or 200 to get its code. For example, E=5. With this knowledge, we can see that 105 is a capital E and 205 is a lowercase e.

In binary, 5 is translated to 0101. To get the character code for a lowercase e, we add $01100000 + 0101$, to get `01100101`. Conversely, we can use this knowledge to infer that a binary expression that starts with 010 is an uppercase letter, and 011 represents a lowercase letter. Let's take 01001110. We can guess that it's going to be a capital letter by the fact that it start with 010. So what does the remaining 01110 tell us? This is equivalent to $(0 × 16) + (1 × 8) + (1 × 4) + (1 × 2) + (0 × 1)$, or 14. The 14th letter of the alphabet is n, so `01001110` is an uppercase N.

### Filling in the Blanks

Controls, punctuation, and other symbols can also be encoded in ASCII. However, the letters are the most important part of a binary message, and if you can decode them, you will likely obtain the core meaning of the message and can infer the symbols.

Suppose we had a message that looks like this:

> 01001001 00100000 01101100 01101001 01101011 01100101 00100000 01110100 01101111 00100000 01110011 01101100 01100101 01100101 01110000 00100001

Let's pretend we don't have an ASCII table readily available to us. Using what we know, and using `_` to indicate the missing pieces, we already have a message that looks like this:

> I\_like\_to\_sleep\_

Just from that, we can conclude that `00100000` is likely the space character, and `00100001` is some sort of punctuation. We don’t know what kind of punctuation it is so let’s say we assume it is a period. In actuality, `00100001` is an exclamation point (!); however, this fact doesn’t change the core meaning of the sentence, in that the author of the quote likes to sleep.

### Conclusion

Similar to [drawing SVGs by hand](https://www.quangdao.com/blog/how-to-draw-svgs-in-code), knowing how to manually decode binary ASCII messages is likely never going to be relevant in the day-to-day lives of most people. However, in the process of learning how binary encoding works, we were able to explore some fundamental concepts of basic cryptography. Cryptographers often have to decode messages by discovering patterns and inferring the missing pieces. Modern cryptographic algorithms also encrypt text by first translating them into bytes via a derivative of ASCII such as UTF-8. They will do some mumbo jumbo math stuff in between, but ultimately returns the ciphertext as some encoding of the resulting bytes. This commonly tends to be Base-64 rather than binary, but the idea remains the same.

While the skill of decoding binary may prove to be of little direct value, understanding the basics of encoding opens doors to a whole new world. As one last gift for you to embark on this adventure, here is my contribution to the unending sea of binary translators.

<TextEncoder base={2} />
