import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const MaskEdit = forwardRef((props, ref) => {
    const { label, type, name, value, onChange, error, readOnly, ...rest } =
        props;

    const handleChange = ({ target }) => {
        if (readOnly) return;

        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return readOnly
            ? "form-control bg-secondary bg-opacity-10"
            : "form-control" + (error ? " is-invalid" : "");
    };

    const handleOnInput = (e) => {
        switch (type) {
            case "phone":
                onPhoneInput(e);
                break;
            case "index":
                onIndexInput(e);
                break;
            case "card":
                onCardInput(e);
                break;
            case "monYear":
                onMonYearInput(e);
                break;
            case "cvc":
                onCvcInput(e);
                break;

            default:
                break;
        }
    };

    function handleOnPaste(e) {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);

        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            const pastedText = pasted.getData("Text");
            if (["phone", "index", "card"].includes(type)) {
                if (/\D/g.test(pastedText)) {
                    input.value = inputNumbersValue;
                }
            } else {
                input.value = pastedText;
            }
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 8) {
            let inputValue = e.target.value.replace(/\D/g, "");
            if (inputValue.length > 0) {
                inputValue = inputValue.substring(0, inputValue.length);
                e.target.value = inputValue;
            }
        }
    };

    return (
        <div key={rest.key} className={rest.className}>
            <label htmlFor={name}>
                <span className="text-truncate">{label}</span>
            </label>
            <div className="input-group has-validation">
                <input
                    type={type === "cvc" ? "password" : "tel"}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onInput={handleOnInput}
                    onPaste={handleOnPaste}
                    onKeyDown={handleOnKeyDown}
                    className={getInputClasses()}
                    readOnly={readOnly}
                    placeholder={rest.placeholder || label}
                    title={rest.title || rest.placeholder || label}
                    ref={ref}
                />

                {error && (
                    <div
                        className="invalid-feedback text-truncate"
                        title={error}
                    >
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
});

MaskEdit.defaultProps = {
    type: "phone"
};

MaskEdit.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    readOnly: PropTypes.bool
};

MaskEdit.displayName = "MaskEdit";

export default MaskEdit;

function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, "");
}

function onPhoneInput(e) {
    const input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        /* ru */
        if (inputNumbersValue[0] === "9") {
            inputNumbersValue = "7" + inputNumbersValue;
        }

        const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
            formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
        }

        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
        }

        if (inputNumbersValue.length >= 8) {
            formattedInputValue += "-" + inputNumbersValue.substring(7, 11);
        }
    } else {
        if (input.value[0] === "+") {
            formattedInputValue = input.value;
        } else {
            formattedInputValue = "+" + input.value;
        }
        formattedInputValue = formattedInputValue.substring(0, 18);
    }
    input.value = formattedInputValue;
}

function onIndexInput(e) {
    const input = e.target;
    console.log("onIndexInput", input);

    const inputNumbersValue = getInputNumbersValue(input);
    console.log("onIndexInput", inputNumbersValue);
    const selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }
    input.value = inputNumbersValue.substring(0, 6);
}

function onCardInput(e) {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }

    if (inputNumbersValue.length >= 1) {
        formattedInputValue += inputNumbersValue.substring(0, 4);
    }

    if (inputNumbersValue.length >= 4) {
        formattedInputValue += " " + inputNumbersValue.substring(4, 8);
    }

    if (inputNumbersValue.length >= 8) {
        formattedInputValue += " " + inputNumbersValue.substring(8, 12);
    }

    if (inputNumbersValue.length >= 12) {
        formattedInputValue += " " + inputNumbersValue.substring(12, 16);
    }

    formattedInputValue = formattedInputValue.substring(0, 19);

    input.value = formattedInputValue;
}
function onCvcInput(e) {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }

    formattedInputValue = inputNumbersValue.substring(0, 3);

    input.value = formattedInputValue;
}

function onMonYearInput(e) {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }

    if (inputNumbersValue.length >= 1) {
        if (inputNumbersValue.length === 2) {
            let month = Math.max(
                1,
                Math.min(12, Number.parseInt(inputNumbersValue))
            ).toString();

            if (month.length === 1) {
                month = "0" + month;
            }
            formattedInputValue += month;
        } else {
            formattedInputValue += inputNumbersValue.substring(0, 2);
        }
    }

    if (inputNumbersValue.length > 2) {
        if (inputNumbersValue.length === 4) {
            const currYear = new Date().getFullYear() - 2000;
            const year = Math.max(
                currYear,
                Math.min(99, Number.parseInt(inputNumbersValue.substring(2, 4)))
            ).toString();
            formattedInputValue += "/" + year;
        }
        formattedInputValue += "/" + inputNumbersValue.substring(2, 4);
    }

    formattedInputValue = formattedInputValue.substring(0, 5);

    input.value = formattedInputValue;
}
