/* eslint-disable no-case-declarations */
/* eslint-disable regexp/no-unused-capturing-group */
import { Node, NodeTypeEnum } from "../node";
import { NamedNodeMap } from "./element.structures";
import { NamespaceURIEnum } from "./element.enums";
import { ElementUtils } from "./element.utils";

const SELF_CLOSING_TAG_REGEX = /^(AREA|META|BASE|BR|COL|EMBED|HR|IMG|INPUT|LINK|PARAM|SOURCE|TRACK|WBR|COMMAND|KEYGEN|MENUITEM|DOCTYPE|!DOCTYPE)$/i;

export class Element extends Node {
    #_tagName: string;
    #_children: Element[] = [];
    #_attributes = new NamedNodeMap();
    #_namespaceURI: NamespaceURIEnum | null = null;

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

    get attributes() {
        return this.#_attributes;
    }

    get namespaceURI() {
        return this.#_namespaceURI!;
    }

    set namespaceURI(value: NamespaceURIEnum) {
        this.#_namespaceURI = value;
    }

    get children() {
        return this.#_children;
    }

    get outerHTML() {
        return this.#_toStringNode(this);
    }

    getAttribute(name: string) {
        return this.#_attributes.getNamedItem(name);
    }

    setAttribute(name: string, value: string = ""): void {
        this.#_attributes.setNamedItem({ name, value });
    }

    appendChild(node: Node, validateAncestors?: boolean): Node {
        return ElementUtils.appendChild(this, node, validateAncestors);
    }

    removeChild(node: Node): Node {
        return ElementUtils.removeChild(this, node);
    }

    #_toStringNode(root: Node) {
        switch (root.nodeType) {
            case NodeTypeEnum.ELEMENT_NODE:
                const element = root as Element;
                const tagName = element.tagName;

                if (SELF_CLOSING_TAG_REGEX.test(tagName)) {
                    return `<${tagName}${this.#_toStringAttributes(element)}>`;
                }

                let innerHTML = "";

                for (const child of root.childNodes) {
                    innerHTML += this.#_toStringNode(child);
                }

                return `<${tagName}${this.#_toStringAttributes(element)}>${innerHTML}</${tagName}>`;
            case Node.DOCUMENT_FRAGMENT_NODE:
                let html = "";
                for (const child of root.childNodes) {
                    html += this.#_toStringNode(child);
                }
                return html;
            case NodeTypeEnum.COMMENT_NODE:
                return `<!--${root.textContent}-->`;
            case NodeTypeEnum.TEXT_NODE:
                return root.textContent;
            default:
                return "";
        }
    }

    #_toStringAttributes(element: Element) {
        let attributes = "";

        for (const { name, value } of element.#_attributes) {
            attributes += ` ${name}="${value}"`;
        }

        return attributes;
    }
}
