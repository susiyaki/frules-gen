"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsError = void 0;
class ArgsError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}
exports.ArgsError = ArgsError;
