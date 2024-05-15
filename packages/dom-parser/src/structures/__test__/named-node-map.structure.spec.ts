import { beforeEach, describe, expect, it } from "vitest";
import { IAttribute, NamedNodeMap } from "../named-node-map.structure";

describe("namedNodeMap", () => {
    // const nodeMap = new NamedNodeMap();
    let nodeMap: NamedNodeMap;

    beforeEach(() => {
        nodeMap = new NamedNodeMap();
    });

    it("should be empty initially", () => {
        expect(nodeMap.length).toBe(0);
    });

    it("should add a named item", () => {
        const attr: IAttribute = { name: "attr1", value: "value1" };
        const replaced = nodeMap.setNamedItem(attr);

        expect(replaced).toBeNull();
        expect(nodeMap.length).toBe(1);
        expect(nodeMap.item(0)).toBe(attr);
        expect(nodeMap.getNamedItem("attr1")).toBe(attr);
    });

    it("should replace an existing named item", () => {
        const attr1: IAttribute = { name: "attr1", value: "value1" };
        const attr2: IAttribute = { name: "attr1", value: "value2" };

        nodeMap.setNamedItem(attr1);

        const replaced = nodeMap.setNamedItem(attr2);

        expect(replaced).toBe(attr1);
        expect(nodeMap.length).toBe(1);
        expect(nodeMap.item(0)).toBe(attr2);
    });

    it("should remove a named item", () => {
        const attr: IAttribute = { name: "attr1", value: "value1" };

        nodeMap.setNamedItem(attr);

        const removed = nodeMap.removeNamedItem("attr1");

        expect(removed).toBe(attr);
        expect(nodeMap.length).toBe(0);
    });

    it("should return null for invalid names", () => {
        const invalidAttr: IAttribute = { name: "123", value: "value1" };

        const replaced = nodeMap.setNamedItem(invalidAttr);

        expect(replaced).toBeNull();
        expect(nodeMap.length).toBe(0);
    });

    it("should iterate over items", () => {
        const attr1: IAttribute = { name: "attr1", value: "value1" };
        const attr2: IAttribute = { name: "attr2", value: "value2" };

        nodeMap.setNamedItem(attr1);
        nodeMap.setNamedItem(attr2);

        const items: IAttribute[] = [];

        for (const item of nodeMap) {
            items.push(item);
        }

        expect(items).toEqual([attr1, attr2]);
    });
    it("should handle removing non-existent items", () => {
        const removed = nodeMap.removeNamedItem("nonexistent");
        expect(removed).toBeNull();
        expect(nodeMap.length).toBe(0);
    });

    it("should return null when getting non-existent items", () => {
        const item = nodeMap.getNamedItem("nonexistent");
        expect(item).toBeNull();
    });

    it("should return null for item() with invalid index", () => {
        const item = nodeMap.item(-1);
        expect(item).toBeNull();
    });

    it("should adjust indices correctly after removal", () => {
        const attr1: IAttribute = { name: "attr1", value: "value1" };
        const attr2: IAttribute = { name: "attr2", value: "value2" };
        const attr3: IAttribute = { name: "attr3", value: "value3" };

        nodeMap.setNamedItem(attr1);
        nodeMap.setNamedItem(attr2);
        nodeMap.setNamedItem(attr3);
        nodeMap.removeNamedItem("attr2");

        expect(nodeMap.length).toBe(2);
        expect(nodeMap.item(0)).toBe(attr1);
        expect(nodeMap.item(1)).toBe(attr3);
    });

    it("should handle setting items with names that are numbers with dots", () => {
        const attr: IAttribute = { name: "1.23", value: "value1" };
        const replaced = nodeMap.setNamedItem(attr);

        expect(replaced).toBeNull();
        expect(nodeMap.length).toBe(1);
        expect(nodeMap.item(0)).toBe(attr);
    });

    it("should not allow setting items with names that are only numbers", () => {
        const attr: IAttribute = { name: "123", value: "value1" };
        const replaced = nodeMap.setNamedItem(attr);

        expect(replaced).toBeNull();
        expect(nodeMap.length).toBe(0);
    });

    it("should handle setting and removing items with the same name multiple times", () => {
        const attr: IAttribute = { name: "attr1", value: "value1" };

        nodeMap.setNamedItem(attr);
        nodeMap.setNamedItem(attr);
        expect(nodeMap.length).toBe(1);

        nodeMap.removeNamedItem("attr1");
        nodeMap.removeNamedItem("attr1");
        expect(nodeMap.length).toBe(0);
    });

    it("should maintain correct length after multiple additions and removals", () => {
        for (let i = 0; i < 10; i++) {
            nodeMap.setNamedItem({ name: `attr${i}`, value: `value${i}` });
        }

        expect(nodeMap.length).toBe(10);

        for (let i = 0; i < 5; i++) {
            nodeMap.removeNamedItem(`attr${i}`);
        }

        expect(nodeMap.length).toBe(5);
    });

    it("should not allow setting items with empty names", () => {
        const attr: IAttribute = { name: "", value: "value1" };
        const replaced = nodeMap.setNamedItem(attr);

        expect(replaced).toBeNull();
        expect(nodeMap.length).toBe(0);
    });
});
