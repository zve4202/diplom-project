import { Modal } from "bootstrap";

import { appTitle } from "../config.json";
import logo from "../assets/brand/favicon.ico";

const gialogYesNo = "dialog_YN__";
const buttonOK = "button_OK__";

export function yesNo(message, onAccept) {
    const root = document.querySelector("#root");
    const dialog = messageDialog(gialogYesNo, message, onAccept);
    dialog.addEventListener("click", ({ target }) => {
        if (target.name === buttonOK) {
            document.querySelector(`#${gialogYesNo}`).remove();
            onAccept();
        }
    });
    root.appendChild(dialog);
    const modalElement = new Modal(dialog);
    modalElement.toggle();
}

function createNode(tagName, props, parent = undefined) {
    const node = document.createElement(tagName);
    for (const key of Object.keys(props)) {
        const att = document.createAttribute(key);
        att.value = props[key];
        node.setAttributeNode(att);
    }
    if (parent) parent.appendChild(node);
    return node;
}

function messageDialog(dialogId, message, onAccept) {
    const root = createNode("div", {
        class: "modal fade",
        id: dialogId,
        tabindex: "-1",
        "aria-hidden": "true"
    });

    let comtent = createNode(
        "div",
        {
            class: "modal-dialog modal-dialog-centered"
        },
        root
    );

    comtent = createNode(
        "div",
        {
            class: "modal-content"
        },
        comtent
    );

    const header = createNode(
        "div",
        {
            class: "modal-header"
        },
        comtent
    );

    const title = createNode(
        "h5",
        {
            class: "modal-title",
            id: "exampleModalLabel"
        },
        header
    );

    createNode(
        "img",
        {
            class: "me-1",
            src: logo,
            alt: "",
            width: 24,
            height: 24
        },
        title
    );

    createNode("span", {}, title).innerText = appTitle;

    createNode(
        "button",
        {
            class: "btn-close",
            type: "button",
            "data-bs-dismiss": "modal",
            "aria-label": "Close"
        },
        header
    );

    const body = createNode(
        "div",
        {
            class: "modal-body text-center"
        },
        comtent
    );
    createNode("span", {}, body).innerText = message;
    const footer = createNode(
        "div",
        {
            class: "modal-footer justify-content-center"
        },
        comtent
    );

    let btn = createNode(
        "button",
        {
            type: "button",
            class: "btn btn-outline-primary",
            name: buttonOK,
            "data-bs-dismiss": "modal"
        },
        footer
    );
    btn.innerText = "Да";
    // btn.onClick = onAccept;

    btn = createNode(
        "button",
        {
            type: "button",
            class: "btn btn-outline-secondary",
            "data-bs-dismiss": "modal"
        },
        footer
    );
    btn.innerText = "Нет";

    return root;
}
