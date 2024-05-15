import { Node, NodeTypeEnum } from "./node.structure";

export class Element extends Node {
    #_tagName: string;
    #_children: Element[] = [];
    #_namespaceURI: string | null = null;

    constructor(tagName: string) {
        super();
        this.#_tagName = tagName;
    }

    get nodeName() {
        return this.tagName;
    }

    get nodeType() {
        return NodeTypeEnum.ELEMENT_NODE;
    }

    get tagName() {
        return this.#_tagName;
    }

    get namespaceURI() {
        return this.#_namespaceURI;
    }

    get children() {
        return this.#_children;
    }

    // TODO: Implement
    get outerHTML() {
        return "";
    }
}
