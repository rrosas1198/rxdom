export interface IAttribute {
    readonly name: string;
    value: string;
}

export class NamedNodeMap {
    #_items: IAttribute[] = [];

    get length() {
        return this.#_items.length;
    }

    get [Symbol.toStringTag]() {
        return "NamedNodeMap";
    }

    item(index: number): IAttribute | null {
        return index >= 0 && this.#_items[index] ? this.#_items[index] : null;
    }

    getNamedItem(name: string): IAttribute | null {
        return this.#_items.find(item => item.name === name) || null;
    }

    setNamedItem(item: IAttribute): IAttribute | null {
        if (!item.name || !this.#_isValidName(item.name)) return null;

        const index = this.#_items.findIndex(itm => itm.name === item.name);
        const toBeReplaced = this.item(index);

        if (!!toBeReplaced) {
            this.#_items.splice(index, 1, item);
        } else {
            this.#_items.push(item);
        }

        return toBeReplaced;
    }

    removeNamedItem(name: string): IAttribute | null {
        const index = this.#_items.findIndex(item => item.name === name);
        const toBeRemoved = this.item(index);

        if (!!toBeRemoved) {
            this.#_items.splice(index, 1);
        }

        return toBeRemoved;
    }

    #_isValidName(name: string) {
        return !!name && (Number.isNaN(Number.parseFloat(name)) || name.includes("."));
    }

    *[Symbol.iterator](): IterableIterator<IAttribute> {
        for (const item of this.#_items) {
            yield item;
        }
    }
}
