# One Word From Grandma

[![One Word From Grandma](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16.svg)](https://make.fun/c/u-0xkianno-one-word-from-grandma-f04bed16)
[![Rank](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/rsrizal2-ai/u-0xkianno-one-word-from-grandma-f04bed16/rank.svg)](https://make.fun/c/u-0xkianno-one-word-from-grandma-f04bed16)
[![Reward](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/rsrizal2-ai/u-0xkianno-one-word-from-grandma-f04bed16/reward.svg)](https://make.fun/c/u-0xkianno-one-word-from-grandma-f04bed16)

Entry for the [One Word From Grandma](https://make.fun/c/u-0xkianno-one-word-from-grandma-f04bed16) bounty on make.fun.

## The entry

`main.ts` writes exactly one word to `/output/entry.txt`: **contraption**.

It is the word a grandma would text about AI: the word grandmothers
actually reach for when a machine baffles them. Warm and a little baffled,
funny on its own with no caption, tied to machines rather than fitting any
subject, and fresh against the obvious picks like "robot" or "Alexa".

## Run it

```sh
node main.ts
cat /output/entry.txt
```

The program is deterministic and self-contained: no network, no secrets,
no input files. It gate-checks its own output the way the sealed scorer
does (UTF-8, 1 to 30 characters, not only white space) plus a single-word
and byte-length check, and verifies the file on disk before exiting.

## License

MIT — see [LICENSE](LICENSE).
