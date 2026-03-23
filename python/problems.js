const PROBLEMS = [
  {
    id: 1,
    title: "Hello Name",
    difficulty: "easy",
    description:
      'Write a function <code>hello(name)</code> that returns the string <code>"Hello, {name}!"</code>.',
    examples:
      'hello("Athena") → "Hello, Athena!"\nhello("World") → "Hello, World!"',
    starter: "def hello(name):\n    # Your code here\n    pass",
    tests: `
assert hello("Athena") == "Hello, Athena!", f'Expected "Hello, Athena!", got {hello("Athena")!r}'
assert hello("World") == "Hello, World!"
assert hello("") == "Hello, !"
print("All tests passed!")
`,
  },
  {
    id: 2,
    title: "Sum of a List",
    difficulty: "easy",
    description:
      "Write a function <code>sum_list(nums)</code> that returns the sum of all numbers in a list. Do not use the built-in <code>sum()</code>.",
    examples: "sum_list([1, 2, 3]) → 6\nsum_list([]) → 0",
    starter: "def sum_list(nums):\n    # Your code here\n    pass",
    tests: `
assert sum_list([1, 2, 3]) == 6
assert sum_list([]) == 0
assert sum_list([-1, 1]) == 0
assert sum_list([10]) == 10
print("All tests passed!")
`,
  },
  {
    id: 3,
    title: "FizzBuzz",
    difficulty: "easy",
    description:
      'Write a function <code>fizzbuzz(n)</code> that returns a list of strings from 1 to n. For multiples of 3 use <code>"Fizz"</code>, for multiples of 5 use <code>"Buzz"</code>, for multiples of both use <code>"FizzBuzz"</code>, otherwise use the number as a string.',
    examples: 'fizzbuzz(5) → ["1", "2", "Fizz", "4", "Buzz"]',
    starter: "def fizzbuzz(n):\n    # Your code here\n    pass",
    tests: `
assert fizzbuzz(5) == ["1", "2", "Fizz", "4", "Buzz"]
assert fizzbuzz(15)[-1] == "FizzBuzz"
assert fizzbuzz(3) == ["1", "2", "Fizz"]
print("All tests passed!")
`,
  },
  {
    id: 4,
    title: "Reverse a String",
    difficulty: "easy",
    description:
      "Write a function <code>reverse_string(s)</code> that returns the string reversed. Do not use slicing (<code>[::-1]</code>).",
    examples: 'reverse_string("hello") → "olleh"\nreverse_string("ab") → "ba"',
    starter: "def reverse_string(s):\n    # Your code here\n    pass",
    tests: `
assert reverse_string("hello") == "olleh"
assert reverse_string("a") == "a"
assert reverse_string("") == ""
assert reverse_string("ab") == "ba"
print("All tests passed!")
`,
  },
  {
    id: 5,
    title: "Count Vowels",
    difficulty: "medium",
    description:
      "Write a function <code>count_vowels(s)</code> that returns the number of vowels (a, e, i, o, u — case insensitive) in the string.",
    examples: 'count_vowels("hello") → 2\ncount_vowels("AEIOU") → 5',
    starter: "def count_vowels(s):\n    # Your code here\n    pass",
    tests: `
assert count_vowels("hello") == 2
assert count_vowels("AEIOU") == 5
assert count_vowels("bcdfg") == 0
assert count_vowels("") == 0
print("All tests passed!")
`,
  },
  {
    id: 6,
    title: "Is Palindrome",
    difficulty: "medium",
    description:
      "Write a function <code>is_palindrome(s)</code> that returns <code>True</code> if the string is a palindrome (ignoring case and non-alphanumeric characters).",
    examples:
      'is_palindrome("racecar") → True\nis_palindrome("A man a plan a canal Panama") → True',
    starter: "def is_palindrome(s):\n    # Your code here\n    pass",
    tests: `
assert is_palindrome("racecar") == True
assert is_palindrome("A man a plan a canal Panama") == True
assert is_palindrome("hello") == False
assert is_palindrome("") == True
print("All tests passed!")
`,
  },
  {
    id: 7,
    title: "Two Sum",
    difficulty: "medium",
    description:
      "Write a function <code>two_sum(nums, target)</code> that returns the indices of two numbers that add up to the target. Assume exactly one solution exists.",
    examples:
      "two_sum([2, 7, 11, 15], 9) → [0, 1]\ntwo_sum([3, 2, 4], 6) → [1, 2]",
    starter: "def two_sum(nums, target):\n    # Your code here\n    pass",
    tests: `
assert sorted(two_sum([2, 7, 11, 15], 9)) == [0, 1]
assert sorted(two_sum([3, 2, 4], 6)) == [1, 2]
assert sorted(two_sum([3, 3], 6)) == [0, 1]
print("All tests passed!")
`,
  },
  {
    id: 8,
    title: "Flatten a Nested List",
    difficulty: "hard",
    description:
      "Write a function <code>flatten(lst)</code> that takes a nested list and returns a single flat list of all elements.",
    examples:
      "flatten([1, [2, [3, 4], 5]]) → [1, 2, 3, 4, 5]\nflatten([[1, 2], [3]]) → [1, 2, 3]",
    starter: "def flatten(lst):\n    # Your code here\n    pass",
    tests: `
assert flatten([1, [2, [3, 4], 5]]) == [1, 2, 3, 4, 5]
assert flatten([[1, 2], [3]]) == [1, 2, 3]
assert flatten([]) == []
assert flatten([1, 2, 3]) == [1, 2, 3]
print("All tests passed!")
`,
  },
];
