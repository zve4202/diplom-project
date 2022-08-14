function slugify(text) {
    const dirtyString = String(transliterate(text))
        .toLowerCase()
        .replace("&", " and ");
    let result = "";
    if (/[^a-z0-9\-]+/g.test(dirtyString)) {
        const chars = dirtyString.split("");
        for (const char of chars) {
            const c = char.charCodeAt();
            if (!((c >= 48 && c <= 57) || (c >= 97 && c <= 122))) {
                result += "_";
            } else {
                result += char;
            }
        }
    } else {
        result = dirtyString;
    }

    if (/^-/g.test(result)) {
        result = result.slice(1);
    }
    if (/-$/g.test(result)) {
        result = result.slice(0, -1);
    }
    if (/'/g.test(result)) {
        result = result.replace("'", "");
    }
    if (/"/g.test(result)) {
        result = result.replace(`"`, "");
    }
    if (/__/g.test(result)) {
        result = result.replace("__", "_");
    }
    //   if (/_$/g.test(result)) {
    //     result = result.slice(0, -1);
    //   }

    return result;
}

function transliterate(text) {
    const chars = String(text).split("");
    const lowerChars = String(text).toLowerCase().split("");
    let result = "";

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const lowerChar = lowerChars[i];

        const isLower = lowerChar !== char;
        switch (lowerChar) {
            case "а":
                result += isLower ? "a" : "A";
                break;

            case "б":
                result += isLower ? "b" : "B";
                break;

            case "в":
                result += isLower ? "v" : "V";
                break;

            case "г":
                result += isLower ? "g" : "G";
                break;

            case "д":
                result += isLower ? "d" : "D";
                break;

            case "е":
                result += isLower ? "e" : "E";
                break;

            case "ё":
                result += isLower ? "yo" : "Yo";
                break;

            case "ж":
                result += isLower ? "zh" : "Zh";
                break;

            case "з":
                result += isLower ? "z" : "Z";
                break;

            case "и":
                result += isLower ? "i" : "I";
                break;

            case "й":
                result += isLower ? "y" : "Y";
                break;

            case "к":
                result += isLower ? "k" : "K";
                break;

            case "л":
                result += isLower ? "l" : "L";
                break;

            case "м":
                result += isLower ? "m" : "M";
                break;

            case "н":
                result += isLower ? "n" : "N";
                break;

            case "о":
                result += isLower ? "o" : "O";
                break;

            case "п":
                result += isLower ? "p" : "P";
                break;

            case "р":
                result += isLower ? "r" : "R";
                break;

            case "с":
                result += isLower ? "s" : "S";
                break;

            case "т":
                result += isLower ? "t" : "T";
                break;

            case "у":
                result += isLower ? "u" : "U";
                break;

            case "ф":
                result += isLower ? "f" : "F";
                break;

            case "х":
                result += isLower ? "h" : "H";
                break;

            case "ц":
                result += isLower ? "ts" : "Ts";
                break;

            case "ч":
                result += isLower ? "ch" : "Ch";
                break;

            case "ш":
                result += isLower ? "sch" : "Sch";
                break;

            case "щ":
                result += isLower ? "shch" : "Shch";
                break;

            case "ъ":
                result += isLower ? "" : "";
                break;

            case "ы":
                result += isLower ? "i" : "i";
                break;

            case "ь":
                result += isLower ? "" : "";
                break;

            case "э":
                result += isLower ? "e" : "E";
                break;

            case "ю":
                result += isLower ? "yu" : "Yu";
                break;

            case "я":
                result += isLower ? "ya" : "Ya";
                break;
            default:
                result += char;
                break;
        }
    }
    return result;
}

module.exports = {
    transliterate,
    slugify
};
