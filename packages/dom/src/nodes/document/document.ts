import { Comment } from "../comment";
import { DocumentFragment } from "../document-fragment";
import { Element, NamespaceURIEnum } from "../element";
import { Node } from "../node";
import { Text } from "../text";

export class Document extends Node {
    createTextNode(content: string) {
        const text = new Text(content);
        text.ownerDocument = this;
        return text;
    }

    createComment(content: string) {
        const comment = new Comment(content);
        comment.ownerDocument = this;
        return comment;
    }

    createDocumentFragment() {
        const documentFragment = new DocumentFragment();
        documentFragment.ownerDocument = this;
        return documentFragment;
    }

    createElement(name: string) {
        return this.createElementNS(NamespaceURIEnum.HTML, name);
    }

    createElementNS(namespaceURI: NamespaceURIEnum, tagName: string) {
        const element = new Element(tagName);
        element.ownerDocument = this;
        element.namespaceURI = namespaceURI;
        return element;
    }
}
