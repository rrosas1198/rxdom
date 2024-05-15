export interface IAttribute {
    readonly name: string;
    value: string;
}

export class NamedNodeMap {
    #_length: number = 0;
    #_attributes: { [key: string]: IAttribute } = {};

    [index: number]: IAttribute;

    get length() {
        return this.#_length;
    }

    get [Symbol.toStringTag]() {
        return "NamedNodeMap";
    }

    item(index: number): IAttribute | null {
        return index >= 0 && this[index] ? this[index] : null;
    }

    getNamedItem(name: string): IAttribute | null {
        return this.#_attributes[name] || null;
    }

    setNamedItem(attr: IAttribute): IAttribute | null {
        Object.assign(this.#_attributes, { [attr.name]: attr });
        return attr;
    }

    removeNamedItem(name: string): IAttribute | null {
        const item = this.getNamedItem(name);

        if (!!item) {
            delete this.#_attributes[item.name];
        }

        return item;
    }

    *[Symbol.iterator](): IterableIterator<IAttribute> {
        for (let index = 0, max = this.length; index < max; index++) {
            yield this[index];
        }
    }
}
