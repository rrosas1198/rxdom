import { DOMException } from "src/exceptions";
import { Node, NodeTypeEnum, NodeUtils } from "../node";
import { Element } from "./element";

export class ElementUtils {
    static appendChild(ancestor: Node, node: Node, validateAncestors?: boolean) {
        if (!(node.nodeType === NodeTypeEnum.ELEMENT_NODE && !ancestor.isSameNode(node))) {
            return NodeUtils.appendChild(ancestor, node, validateAncestors);
        }

        if (validateAncestors && NodeUtils._isAncestorOf(node, ancestor)) {
            throw new DOMException("Failed to execute 'appendChild' on 'Node': The new node is an ancestor of this node.");
        }

        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }

        NodeUtils.appendChild(ancestor, node, true);

        return node;
    }

    static removeChild(ancestor: Node, node: Node) {
        if (node.nodeType === NodeTypeEnum.ELEMENT_NODE) {
            const children = (node.parentNode as Element).children;
            const index = children.indexOf(node as Element);

            if (index >= 0) {
                children.splice(index, 1);
            }
        }

        return NodeUtils.removeChild(ancestor, node);
    }
}
