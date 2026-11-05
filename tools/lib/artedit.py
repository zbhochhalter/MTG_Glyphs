# helper for batch edits of art files during review (not used at build time)
import re, sys
def load(p): return open(p).read()
def rep(s, name, new):
    i = s.index(f"    {name}: () =>")
    m = re.compile(r"\n    (//|[\w'\"-]+: \(\) =>)").search(s, i + 10)
    end = m.start() + 1 if m else s.rindex("\n  },")+1
    return s[:i] + new.rstrip() + "\n" + s[end:]
def wrap(s, name, o):
    i = s.index(f"    {name}: () => [")
    s = s[:i] + s[i:].replace("() => [", "() => X([", 1)
    m = re.compile(r"\n    \],").search(s, i)
    return s[:m.start()] + f"\n    ], {o})," + s[m.end():]
