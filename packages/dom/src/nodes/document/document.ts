import { Comment } from "../comment";
import { Element, NamespaceURIEnum } from "../element";
import { Node } from "../node";
import { Text } from "../text";

export class Document extends Node {
    createTextNode(content: string) {
        return new Text(content);
    }

    createComment(content: string) {
        return new Comment(content);
    }

    createDocumentFragment() {
        throw new Error("Method not implemented.");
    }

    createElement(name: string) {
        return this.createElementNS(NamespaceURIEnum.HTML, name);
    }

    createElementNS(namespaceURI: NamespaceURIEnum, tagName: string) {
        const element = new Element(tagName);
        element.namespaceURI = namespaceURI;
        return element;
    }
}
