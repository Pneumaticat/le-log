var _c = document.createElement("span");
_c.className = "cursor";
_c.textContent = "_";

class DisplayConsole {
    static entry = document.getElementById("entry")
    static cursor = _c
    static displayCursor() {
        this.entry.appendChild(this.cursor);
    }
    static removeCursor() {
        if (this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
    }
    static typeCharacters(text) {
        var _this = this;
        var index = 0;
        var resolver;

        return new Promise(function typeCharacter(resolve, reject) {
            // Such hack.
            resolver = resolver || resolve;
            if (index < text.length) {
                _this.entry.textContent += text[index++];
                setTimeout(typeCharacter, 25);
            } else {
                resolver();
            }
        });
    }
    static displayCommand(commandToType, output) {
        var _this = this;
        _this.removeCursor();
        return new Promise<void>(function (resolve, reject) {
            _this.typeCharacters(commandToType).then(function () {
                // Only add newline + output if output is not empty
                if (output !== "") {
                    _this.entry.textContent += "\n\n" + output + "\n\n> ";
                } else {
                    _this.entry.textContent += "\n\n> ";
                }
                _this.displayCursor();
                resolve();
            });
        });
    }
    static removeDevConsoleWarning() {
        var devConsoleEl = document.getElementById("dev-console-info");
        if (devConsoleEl.parentNode) {
            devConsoleEl.parentNode.removeChild(devConsoleEl);
        } else {
            throw new Error("Dev console already removed, cannot remove it again.");
        }
    }
    static clear() {
        this.entry.textContent = "";
    }
    static displayText(text) {
        this.entry.textContent += text;
    }
}

export = DisplayConsole;