const keyboard = {
    elements: {
        textarea: null,
        span: null,
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        language: "en",
    },

    init() {

        this.elements.textarea = document.createElement("textarea");
        this.elements.textarea.classList.add("keyboard__output");


        this.elements.span = document.createElement("span");
        this.elements.span.classList.add("span__comment");
        this.elements.span.innerHTML = 'To change language press: Shift+Space.';
        // this.elements.span.createDocumentFragment('comment');


        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.main.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);

        document.body.appendChild(this.elements.span)
        document.body.appendChild(this.elements.textarea);
        document.body.appendChild(this.elements.main);



        document.querySelectorAll(".keyboard__output").forEach(element => {
            this.open(element.value, currentValue => {
                element.value = currentValue;
            });

            let keysPressed = {};
            element.addEventListener("keydown", (e) => {
                let code = e.keyCode;
                let b = document.querySelectorAll(`[data-code="${code}"]`)[0];
                b.classList.add("keyboard__key_active");

                keysPressed[e.keyCode] = true;

                if (keysPressed[16] === true && keysPressed[32] === true) {
                    this._changeLanguage();
                    this._toggleCapslock(false);
                } else if (code === 20) {
                    this._toggleCapslock();
                } else {
                    this._handleValue(code)
                }
                e.preventDefault();
            });

            element.addEventListener("keyup", (e) => {
                let code = e.keyCode;
                let b = document.querySelectorAll(`[data-code="${code}"]`)[0];
                b.classList.remove("keyboard__key_active");

                keysPressed[e.keyCode] = false;
                if (code === 20) {
                    this._toggleCapslock();
                }

                e.preventDefault();
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        const keyLayout = [
            [
                192, // `
                49, // 1
                50, // 2
                51, // 3
                52, // 4
                53, // 5
                54, // 6
                55, // 7
                56, // 8
                57, // 9
                48, // 0
                188, // -
                187, // =
                8, // backspace
            ], [
                9, // tab
                81, // q
                87, // w
                69, // e
                82, // r
                84, // t
                89, // y
                85, // u
                73, // i
                79, // o
                80, // p
                219, // [
                221,  // ]
                220, // \
            ], [
                20, // caps lock
                65, // a
                83, // s
                68, // d
                70, // f
                71, // g
                72, // h
                74, // j
                75, // k
                76, // l
                186, // ;
                222, // '
                13, // enter
            ], [
                16, // shift
                90, // z
                88, // x
                67, // c
                86, // v
                66, // b
                78, // n
                77, // m
                188, // ,
                190, // .
                191, // /
                38, // up
                16, // shift
            ],
            [
                17, // ctrl
                18, // alt
                32, // space
                17, // ctrl
                18, // alt
                37, // left
                40, // down
                39, // right
            ],
        ]

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        }

        keyLayout.forEach(row => {
            row.forEach(code => {
                let key = keyCodes[code].en;
                const keyElement = document.createElement("button");

                keyElement.setAttribute("type", "button");
                keyElement.setAttribute("data-code", code);
                keyElement.classList.add("keyboard__key");
                switch (code) {
                    case 8: // backspace
                        keyElement.classList.add("keyboard__key_wide");
                        keyElement.innerHTML = createIconHTML("backspace");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    case 20: // caps lock
                        keyElement.classList.add("keyboard__key_wide", "keyboard__key_activatable");
                        keyElement.innerHTML = createIconHTML("keyboard_capslock");

                        keyElement.addEventListener(("click"), () => {
                            this._handleValue(code);
                        });

                        break;

                    case 13: // 
                        keyElement.classList.add("keyboard__key_wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    case 32: // space
                        keyElement.classList.add("keyboard__key_space");
                        keyElement.innerHTML = createIconHTML("space_bar");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    case 37: // arrow left
                        keyElement.classList.add("keyboard__key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    case 38: // arrow up
                        keyElement.classList.add("keyboard__key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    case 39: // arrow right
                        keyElement.classList.add("keyboard__key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    case 40: // arrow down
                        keyElement.classList.add("keyboard__key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;

                    default:
                        keyElement.textContent = key.toLocaleLowerCase();
                        keyElement.addEventListener("click", () => {
                            this._handleValue(code);
                        });

                        break;
                }

                fragment.appendChild(keyElement);
            })

            fragment.appendChild(document.createElement("br"))

        })

        return fragment;
    },

    _changeLanguage() {
        if (this.properties.language === "en") {
            this.properties.language = "ru";
        } else {
            this.properties.language = "en";
        }

        let buttons = document.querySelectorAll("button.keyboard__key");
        let language = this.properties.language;

        buttons.forEach(function (element) {
            let code = parseInt(element.getAttribute("data-code"));
            let key = keyCodes[code][language];

            let systemCodes = [8, 20, 13, 16, 32, 37, 38, 39, 40];
            if (key !== undefined && systemCodes.indexOf(code) === -1) {
                element.textContent = key.toLocaleLowerCase();
            }
        })
    },


    _handleValue(code) {
        switch (code) {
            case 8: // backspace
                this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                this._triggerEvent("oninput");
                break;

            case 20: // caps lock
                this._toggleCapslock();
                let keyElement = document.querySelectorAll(`[data-code="${code}"]`)[0];
                keyElement.classList.toggle("keyboard__key_capslock_down", this.properties.capsLock);
                break;

            case 13: // enter
                this.properties.value += "/n";
                this._triggerEvent("oninput");
                break;

            case 16: //  shift
                break;

            case 32: // space
                this.properties.value += " ";
                this._triggerEvent("oninput");

                break;

            default:
                let key = keyCodes[code][this.properties.language];
                if (keyCodes[code].ignoreCapslock) {
                    this.properties.value += key;
                } else {
                    this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                }
                this._triggerEvent("oninput");

                break;
        }
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapslock(value) {
        if (value !== undefined) {
            this.properties.capsLock = value;
        } else {
            this.properties.capsLock = !this.properties.capsLock;
        }

        let b = document.querySelectorAll(`[data-code="20"]`)[0];
        if (this.properties.capsLock) {
            b.classList.add("keyboard__key_capslock_down");
        } else {
            b.classList.remove("keyboard__key_capslock_down");
            b.classList.remove("keyboard__key_active");
        }


        for (let key of this.elements.keys) {
            let codeStr = key.getAttribute('data-code');
            let code = parseInt(codeStr);

            if (!keyCodes[code].ignoreCapslock) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialVAlue, oninput, onclose) {
        this.properties.value = initialVAlue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }
}

window.addEventListener("DOMContentLoaded", function () {
    keyboard.init();
})


const keyCodes = {
    8: { en: 'backspace / delete', ru: 'backspace / delete', ignoreCapslock: true },
    9: { en: 'tab', ru: 'tab', ignoreCapslock: true },
    13: { en: 'enter', ru: 'enter', ignoreCapslock: true },
    16: { en: 'shift', ru: 'shift', ignoreCapslock: true },
    17: { en: 'ctrl', ru: 'ctrl', ignoreCapslock: true },
    18: { en: 'alt', ru: 'alt', ignoreCapslock: true },
    20: { en: 'caps lock', ru: 'caps lock', ignoreCapslock: true },
    27: { en: 'escape', ru: 'escape', ignoreCapslock: true },
    32: { en: 'spacebar', ru: 'spacebar', ignoreCapslock: true },
    37: { en: '<', ru: '<', ignoreCapslock: true },
    38: { en: '^', ru: '^', ignoreCapslock: true },
    39: { en: '>', ru: '>', ignoreCapslock: true },
    40: { en: 'v', ru: 'v', ignoreCapslock: true },
    48: { en: '0', ru: '0', shiftEn: ')', shiftRu: ')' },
    49: { en: '1', ru: '1', shiftEn: '!', shiftRu: '!' },
    50: { en: '2', ru: '2', shiftEn: '@', shiftRu: '"' },
    51: { en: '3', ru: '3', shiftEn: '#', shiftRu: '№' },
    52: { en: '4', ru: '4', shiftEn: '$', shiftRu: '%' },
    53: { en: '5', ru: '5', shiftEn: '%', shiftRu: ':' },
    54: { en: '6', ru: '6', shiftEn: '^', shiftRu: ',' },
    55: { en: '7', ru: '7', shiftEn: '&', shiftRu: '.' },
    56: { en: '8', ru: '8', shiftEn: '*', shiftRu: ';' },
    57: { en: '9', ru: '9', shiftEn: '(', shiftRu: '(' },
    65: { en: 'a', ru: 'ф' },
    66: { en: 'b', ru: 'и' },
    67: { en: 'c', ru: 'с' },
    68: { en: 'd', ru: 'в' },
    69: { en: 'e', ru: 'у' },
    70: { en: 'f', ru: 'а' },
    71: { en: 'g', ru: 'п' },
    72: { en: 'h', ru: 'р' },
    73: { en: 'i', ru: 'ш' },
    74: { en: 'j', ru: 'о' },
    75: { en: 'k', ru: 'л' },
    76: { en: 'l', ru: 'д' },
    77: { en: 'm', ru: 'ь' },
    78: { en: 'n', ru: 'т' },
    79: { en: 'o', ru: 'щ' },
    80: { en: 'p', ru: 'з' },
    81: { en: 'q', ru: 'й' },
    82: { en: 'r', ru: 'к' },
    83: { en: 's', ru: 'ы' },
    84: { en: 't', ru: 'ф' },
    85: { en: 'u', ru: 'г' },
    86: { en: 'v', ru: 'м' },
    87: { en: 'w', ru: 'ц' },
    88: { en: 'x', ru: 'ч' },
    89: { en: 'y', ru: 'н' },
    90: { en: 'z', ru: 'я' },
    91: { en: 'Windows Key / Left ⌘ / Chromebook Search key', ru: 'Windows Key / Left ⌘ / Chromebook Search key', ignoreCapslock: true },
    186: { en: ';', ru: 'ж', shiftEn: ':', shiftRu: 'Ж' },
    187: { en: '=', ru: '=', shiftEn: '+', shiftRu: '+', ignoreCapslock: true },
    188: { en: ',', ru: 'б', shiftEn: '<' },
    189: { en: '-', ru: '-', shiftEn: '_', shiftRu: '_', ignoreCapslock: true },
    190: { en: '.', ru: 'ю', shiftEn: '>', ignoreCapslock: true },
    191: { en: '/', ru: '/', shiftEn: '?', shiftRu: '?', ignoreCapslock: true },
    192: { en: '`', ru: '`', shiftEn: '~', ignoreCapslock: true },
    219: { en: '[', ru: 'х', shiftEn: '{', shiftRu: 'Х' },
    220: { en: '\\', ru: 'ё', shiftEn: '|', shiftRu: 'Ё' },
    221: { en: ']', ru: 'ъ', shiftEn: '}', shiftRu: 'Ъ' },
    222: { en: '\'', ru: 'э', shiftEn: '"', shiftRu: 'Э' },
};


