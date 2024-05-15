import { NodeTypeEnum } from "../enums";
import { DOMException } from "../exceptions";

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

    appendChild(node: Node) {
        if (this.isSameNode(node)) {
            throw new DOMException("Failed to execute 'appendChild' on 'Node': Not possible to append a node as a child of itself.");
        }

        if (node.nodeType === NodeTypeEnum.DOCUMENT_FRAGMENT_NODE) {
            for (const child of node.#_childNodes.slice()) {
                this.appendChild(child);
            }
            return node;
        }

        if (node.parentNode) {
            const index = node.parentNode.#_childNodes.indexOf(node);
            if (index >= 0) {
                node.parentNode.#_childNodes.splice(index, 1);
            }
        }

        this.#_childNodes.push(node);

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
}
