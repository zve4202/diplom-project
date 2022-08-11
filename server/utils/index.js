function slugify(text) {
    const dirty_string = String(transliterate(text))
        .toLowerCase()
        .replace("&", " and ");
    let result = "";
    if (/[^a-z0-9\-]+/g.test(dirty_string)) {
        const chars = dirty_string.split("");
        for (const char of chars) {
            const c = char.charCodeAt();
            if (!((c >= 48 && c <= 57) || (c >= 97 && c <= 122))) {
                result += "_";
            } else {
                result += char;
            }
        }
    } else {
        result = dirty_string;
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
    const letters = String(text).split("");
    const lowerletters = String(text).toLowerCase().split("");
    let result = "";

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const lower_letter = lowerletters[i];

        const is_lower = lower_letter !== letter;
        switch (lower_letter) {
            case "а":
                result += is_lower ? "a" : "A";
                break;

            case "б":
                result += is_lower ? "b" : "B";
                break;

            case "в":
                result += is_lower ? "v" : "V";
                break;

            case "г":
                result += is_lower ? "g" : "G";
                break;

            case "д":
                result += is_lower ? "d" : "D";
                break;

            case "е":
                result += is_lower ? "e" : "E";
                break;

            case "ё":
                result += is_lower ? "yo" : "Yo";
                break;

            case "ж":
                result += is_lower ? "zh" : "Zh";
                break;

            case "з":
                result += is_lower ? "z" : "Z";
                break;

            case "и":
                result += is_lower ? "i" : "I";
                break;

            case "й":
                result += is_lower ? "y" : "Y";
                break;

            case "к":
                result += is_lower ? "k" : "K";
                break;

            case "л":
                result += is_lower ? "l" : "L";
                break;

            case "м":
                result += is_lower ? "m" : "M";
                break;

            case "н":
                result += is_lower ? "n" : "N";
                break;

            case "о":
                result += is_lower ? "o" : "O";
                break;

            case "п":
                result += is_lower ? "p" : "P";
                break;

            case "р":
                result += is_lower ? "r" : "R";
                break;

            case "с":
                result += is_lower ? "s" : "S";
                break;

            case "т":
                result += is_lower ? "t" : "T";
                break;

            case "у":
                result += is_lower ? "u" : "U";
                break;

            case "ф":
                result += is_lower ? "f" : "F";
                break;

            case "х":
                result += is_lower ? "h" : "H";
                break;

            case "ц":
                result += is_lower ? "ts" : "Ts";
                break;

            case "ч":
                result += is_lower ? "ch" : "Ch";
                break;

            case "ш":
                result += is_lower ? "sch" : "Sch";
                break;

            case "щ":
                result += is_lower ? "shch" : "Shch";
                break;

            case "ъ":
                result += is_lower ? "" : "";
                break;

            case "ы":
                result += is_lower ? "i" : "i";
                break;

            case "ь":
                result += is_lower ? "" : "";
                break;

            case "э":
                result += is_lower ? "e" : "E";
                break;

            case "ю":
                result += is_lower ? "yu" : "Yu";
                break;

            case "я":
                result += is_lower ? "ya" : "Ya";
                break;
            default:
                result += letter;
                break;
        }
    }
    return result;
}

function generateUserData() {
    return {
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`
    };
}

module.exports = {
    transliterate,
    slugify,
    generateUserData
};
