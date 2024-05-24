import { DOMException } from "src/exceptions";
import { Node } from "./node";
import { NodeTypeEnum } from "./node.enums";

export class NodeUtils {
    static appendChild(ancestor: Node, node: Node, validateAncestors?: boolean) {
        if (ancestor.isSameNode(node)) {
            throw new DOMException("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
        }

        if (validateAncestors && NodeUtils._isAncestorOf(node, ancestor)) {
            throw new DOMException("Failed to execute 'appendChild' on 'Node': The new node is an ancestor of this node.");
        }

        if (node.nodeType === NodeTypeEnum.DOCUMENT_FRAGMENT_NODE) {
            for (const child of node.childNodes.slice()) {
                ancestor.appendChild(child);
            }
            return node;
        }

        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }

        node.parentNode = ancestor;
        ancestor.childNodes.push(node);

        return node;
    }

    static removeChild(ancestor: Node, node: Node) {
        const index = ancestor.childNodes.indexOf(node);

        if (index < 0) {
            throw new DOMException("Failed to remove node. Node is not child of parent.");
        }

        ancestor.childNodes.splice(index, 1);

        return node;
    }

    static _isAncestorOf(ancestor: Node | null, reference: Node | null) {
        if (!ancestor || !reference) {
            return false;
        }

        if (ancestor === reference) {
            return true;
        }

        if (ancestor.childNodes.length < 0) {
            return false;
        }

        let parent: Node | null = reference.parentNode;

        while (parent) {
            if (ancestor === parent) {
                return true;
            }
            parent = parent.parentNode;
        }

        return false;
    }
}
