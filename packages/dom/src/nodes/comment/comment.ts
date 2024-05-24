import { Node, NodeTypeEnum } from "../node";

export class Comment extends Node {
    constructor(content: string = "") {
        super();
        this.textContent = content;
    }

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
