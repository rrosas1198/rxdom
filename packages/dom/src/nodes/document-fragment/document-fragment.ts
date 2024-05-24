import { Element, ElementUtils } from "../element";
import { Node, NodeTypeEnum } from "../node";

export class DocumentFragment extends Node {
    #_children: Element[] = [];

    get nodeType() {
        return NodeTypeEnum.DOCUMENT_FRAGMENT_NODE;
    }

    get children() {
        return this.#_children;
    }

    get textContent(): string {
        let result = "";

        for (const child of this.childNodes) {
            if (child.nodeType === NodeTypeEnum.ELEMENT_NODE || child.nodeType === NodeTypeEnum.TEXT_NODE) {
                result += child.textContent;
            }
        }

        return result;
    }

    set textContent(content: string) {
        this.childNodes.forEach(child => this.removeChild(child));
        this.children.forEach(child => this.removeChild(child));
        this.appendChild(this.ownerDocument.createTextNode(content));
    }

    appendChild(node: Node, validateAncestors?: boolean): Node {
        return ElementUtils.appendChild(this, node, validateAncestors);
    }

    removeChild(node: Node): Node {
        return ElementUtils.removeChild(this, node);
    }
}
