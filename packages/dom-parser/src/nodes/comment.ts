import { NodeTypeEnum } from "src/enums";
import { Node } from "./node";

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
