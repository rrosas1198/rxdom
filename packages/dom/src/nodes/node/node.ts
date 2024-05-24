import { DOMException } from "src/exceptions";
import { NodeTypeEnum } from "./node.enums";

export class Node {
    static readonly ELEMENT_NODE = NodeTypeEnum.ELEMENT_NODE;
    static readonly TEXT_NODE = NodeTypeEnum.TEXT_NODE;
    static readonly COMMENT_NODE = NodeTypeEnum.COMMENT_NODE;
    static readonly DOCUMENT_FRAGMENT_NODE = NodeTypeEnum.DOCUMENT_FRAGMENT_NODE;

    #_nodeType!: NodeTypeEnum;
    #_parentNode: Node | null = null;
    #_childNodes: Node[] = [];

    get parentNode() {
        return this.#_parentNode;
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
        if (this.isSameNode(node)) {
            throw new DOMException("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
        }

        if (validateAncestors && this._isAncestorOf(node, this)) {
            throw new DOMException("Failed to execute 'appendChild' on 'Node': The new node is an ancestor of this node.");
        }

        if (node.nodeType === NodeTypeEnum.DOCUMENT_FRAGMENT_NODE) {
            for (const child of node.#_childNodes.slice()) {
                this.appendChild(child);
            }
            return node;
        }

        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }

        node.#_parentNode = this;
        this.#_childNodes.push(node);

        return node;
    }

    removeChild(node: Node) {
        const index = this.#_childNodes.indexOf(node);

        if (index < 0) {
            throw new DOMException("Failed to remove node. Node is not child of parent.");
        }

        this.#_childNodes.splice(index, 1);

        return node;
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

    _isAncestorOf(ancestorNode: Node | null, referenceNode: Node | null) {
        if (!ancestorNode || !referenceNode) {
            return false;
        }

        if (ancestorNode === referenceNode) {
            return true;
        }

        if (ancestorNode.childNodes.length < 0) {
            return false;
        }

        let parent: Node | null = referenceNode.parentNode;

        while (parent) {
            if (ancestorNode === parent) {
                return true;
            }
            parent = parent.parentNode;
        }

        return false;
    }
}
