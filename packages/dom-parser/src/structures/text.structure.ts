import { Node, NodeTypeEnum } from "./node.structure";

export class Text extends Node {
    get nodeName() {
        return "#text";
    }

    get nodeType() {
        return NodeTypeEnum.TEXT_NODE;
    }

    toString() {
        return "[object Text]";
    }
}
