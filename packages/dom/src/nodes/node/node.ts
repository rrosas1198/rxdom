import { Document } from "../document";
import { NodeTypeEnum } from "./node.enums";
import { NodeUtils } from "./node.utils";

export class Node {
    static readonly ELEMENT_NODE = NodeTypeEnum.ELEMENT_NODE;
    static readonly TEXT_NODE = NodeTypeEnum.TEXT_NODE;
    static readonly COMMENT_NODE = NodeTypeEnum.COMMENT_NODE;
    static readonly DOCUMENT_FRAGMENT_NODE = NodeTypeEnum.DOCUMENT_FRAGMENT_NODE;

    #_nodeType!: NodeTypeEnum;
    #_parentNode: Node | null = null;
    #_childNodes: Node[] = [];
    #_ownerDocument: Document | null = null;

    get ownerDocument() {
        return this.#_ownerDocument!;
    }

    set ownerDocument(value: Document) {
        this.#_ownerDocument = value;
    }

    get parentNode() {
        return this.#_parentNode!;
    }

    set parentNode(node: Node) {
        this.#_parentNode = node;
    }

    get nodeName() {
        return "";
    }

    get nodeType() {
        return this.#_nodeType;
    }

    get nodeValue() {
        return null!;
    }

    set nodeValue(_value: string) {
        //
    }

    get childNodes() {
        return this.#_childNodes;
    }

    // Sub-classes should implement this method.
    get textContent() {
        return null!;
    }

    // Sub-classes should implement this method.
    set textContent(_value: string) {
        //
    }

    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }

    appendChild(node: Node, validateAncestors?: boolean) {
        return NodeUtils.appendChild(this, node, validateAncestors);
    }

    removeChild(node: Node) {
        return NodeUtils.removeChild(this, node);
    }

    hasChildNodes() {
        return this.#_childNodes.length > 0;
    }

    isSameNode(node: Node) {
        return this === node;
    }

    toString() {
        return `[object ${this.constructor.name}]`;
    }
}
