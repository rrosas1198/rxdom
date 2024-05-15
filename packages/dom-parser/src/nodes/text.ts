import { NodeTypeEnum } from "src/enums";
import { Node } from "./node";

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
