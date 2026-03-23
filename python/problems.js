const PROBLEMS = [
  {
    id: 1,
    title: "Greeting",
    difficulty: "easy",
    description:
      'You have a variable <code>name</code>. Print <code>Hello, (name)!</code> using string concatenation.',
    examples: 'If name = \'Athena\', print:\nHello, Athena!',
    starter: "name = 'Athena'\n\n# Print a greeting using the name variable\n",
    tests: `
name = 'Athena'
# Expected output:
# Hello, Athena!
`,
    expected: "Hello, Athena!",
  },
  {
    id: 2,
    title: "Spell It Out",
    difficulty: "easy",
    description:
      "Use a <code>for</code> loop to print each character of a word on its own line.",
    examples: "If word = 'hello', print:\nh\ne\nl\nl\no",
    starter: "word = 'hello'\n\n# Print each character on its own line\n",
    tests: `
word = 'hello'
# Expected output:
# h
# e
# l
# l
# o
`,
    expected: "h\ne\nl\nl\no",
  },
  {
    id: 3,
    title: "Loud Word",
    difficulty: "easy",
    description:
      "Given a word, build a new string that is the uppercase version using <code>.upper()</code> inside a loop, then print it. Don't just do <code>print(word.upper())</code> — build it character by character with <code>+=</code>.",
    examples: "If word = 'hello', print:\nHELLO",
    starter: "word = 'hello'\nresult = ''\n\n# Loop through each character and build the uppercase version\n\nprint(result)",
    tests: `
word = 'hello'
result = ''
# Expected output:
# HELLO
`,
    expected: "HELLO",
  },
  {
    id: 4,
    title: "Count a Letter",
    difficulty: "easy",
    description:
      "Count how many times the letter <code>'l'</code> appears in a word. Use a <code>for</code> loop and an <code>if</code> statement. Print the count at the end.",
    examples: "If word = 'hello', print:\n2",
    starter: "word = 'hello'\ncount = 0\n\n# Count how many times 'l' appears\n\nprint(count)",
    tests: `
word = 'hello'
count = 0
# Expected output:
# 2
`,
    expected: "2",
  },
  {
    id: 5,
    title: "Whisper or Shout",
    difficulty: "medium",
    description:
      'Loop through each character in a word. If the character is an uppercase letter (it equals its own <code>.upper()</code> and doesn\'t equal its own <code>.lower()</code>), print <code>SHOUT</code>. Otherwise print <code>whisper</code>.',
    examples: "If word = 'HeLLo', print:\nSHOUT\nwhisper\nSHOUT\nSHOUT\nwhisper",
    starter: "word = 'HeLLo'\n\n# For each character, print SHOUT or whisper\n",
    tests: `
word = 'HeLLo'
# Expected output:
# SHOUT
# whisper
# SHOUT
# SHOUT
# whisper
`,
    expected: "SHOUT\nwhisper\nSHOUT\nSHOUT\nwhisper",
  },
  {
    id: 6,
    title: "Remove Vowels",
    difficulty: "medium",
    description:
      "Build a new string from a word that contains only the consonants (skip a, e, i, o, u). Use <code>.lower()</code> to check each character, but keep the original character in the result.",
    examples: "If word = 'Hello World', print:\nHll Wrld",
    starter: "word = 'Hello World'\nresult = ''\n\n# Build a string with no vowels\n\nprint(result)",
    tests: `
word = 'Hello World'
result = ''
# Expected output:
# Hll Wrld
`,
    expected: "Hll Wrld",
  },
  {
    id: 7,
    title: "Secret Message",
    difficulty: "medium",
    description:
      "Loop through a message. Build a new string where every vowel (a, e, i, o, u — check using <code>.lower()</code>) is replaced with <code>*</code>. All other characters stay the same.",
    examples: "If message = 'Keep it secret', print:\nK**p *t s*cr*t",
    starter: "message = 'Keep it secret'\nresult = ''\n\n# Replace vowels with *\n\nprint(result)",
    tests: `
message = 'Keep it secret'
result = ''
# Expected output:
# K**p *t s*cr*t
`,
    expected: "K**p *t s*cr*t",
  },
  {
    id: 8,
    title: "Reverse a String",
    difficulty: "medium",
    description:
      "Build a reversed version of a word using a <code>for</code> loop. Hint: add each new character <em>before</em> the result so far.",
    examples: "If word = 'python', print:\nnohtyp",
    starter: "word = 'python'\nresult = ''\n\n# Build the reversed string\n\nprint(result)",
    tests: `
word = 'python'
result = ''
# Expected output:
# nohtyp
`,
    expected: "nohtyp",
  },
  {
    id: 9,
    title: "Letter Grade",
    difficulty: "hard",
    description:
      "Given a numeric score, print the letter grade. Use <code>if</code>/<code>elif</code>/<code>else</code>.<br>90 and above: <code>A</code><br>80-89: <code>B</code><br>70-79: <code>C</code><br>60-69: <code>D</code><br>Below 60: <code>F</code>",
    examples: "If score = 85, print:\nB",
    starter: "score = 85\n\n# Print the letter grade\n",
    tests: `
score = 85
# Expected output:
# B
`,
    expected: "B",
  },
  {
    id: 10,
    title: "Staircase",
    difficulty: "hard",
    description:
      "Print a staircase pattern. For the word <code>'abcd'</code>, print each prefix on its own line: first just <code>a</code>, then <code>ab</code>, then <code>abc</code>, then <code>abcd</code>. Use a loop and string accumulation.",
    examples: "If word = 'abcd', print:\na\nab\nabc\nabcd",
    starter: "word = 'abcd'\nresult = ''\n\n# Print each prefix\n",
    tests: `
word = 'abcd'
result = ''
# Expected output:
# a
# ab
# abc
# abcd
`,
    expected: "a\nab\nabc\nabcd",
  },
];
