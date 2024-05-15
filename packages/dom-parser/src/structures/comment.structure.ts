import { Node, NodeTypeEnum } from "./node.structure";

export class Comment extends Node {
    get nodeName() {
        return "#comment";
    }

    get nodeType() {
        return NodeTypeEnum.COMMENT_NODE;
    }

    toString() {
        return "[object Comment]";
    }
}
