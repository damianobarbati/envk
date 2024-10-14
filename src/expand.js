/*
test set on regex101:
$HELLO${HOLA}${SALUT:-salut}
${SALUT:-salut}$HELLO$HOLA
${SALUT:-salut}\$HELLO$HOLA\$done
*/
const expand = (key, value, envs) => {
  const expanded_value = value.replaceAll(/(\\?\${?[A-Z0-9_]+(:-([^}]+))?}?)/gi, (match) => {
    // if \$ then do not expand
    if (match.startsWith("\\")) {
      return match.slice(1);
    }

    const { key, default_value } = /\${?(?<key>[A-Z0-9_]+)(:-(?<default_value>[^}]+))?}?/gi.exec(match).groups;

    const replacement = envs[key] ?? default_value;
    return replacement;
  });

  return expanded_value;
};

module.exports = expand;
