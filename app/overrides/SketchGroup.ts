import { Group } from 'paper';

type SketchGroupChildren = {
  id: number;
  order: number;
  replacement: number;
};

type SketchGroupData = {
  children: SketchGroupChildren[];
};

class SketchGroup extends Group {
  data: SketchGroupData = { children: [] };

  add(item: paper.Item, replacement = 0): paper.Item {
    if (!this.data.children) {
      this.data.children = [];
    }
    const { children } = this.data;

    if (replacement !== 0) {
      for (
        let i = children.length - 1;
        i > children.length - 1 - replacement;
        i--
      ) {
        const replacementItem = this.getItem({ id: children[i].id });
        if (replacementItem) {
          replacementItem.visible = false;
        }
      }
    }

    children.push({ id: item.id, order: children.length + 1, replacement });

    console.log(`Item Id: ${item.id},  Order: ${children.length + 1}`);

    return this.addChild(item);
  }

  undo() {
    if (this.children.length > 0 && this.data.children.length > 0) {
      const { children } = this.data;

      const lastItem = children.pop();
      if (lastItem !== undefined) {
        const { id, replacement } = lastItem;

        const item = this.getItem({ id });

        if (replacement !== 0) {
          for (
            let i = children.length - 1;
            i > children.length - 1 - replacement;
            i--
          ) {
            console.log('ReplacementItem');
            const replacementItem = this.getItem({ id: children[i].id });
            if (replacementItem) {
              console.log('ReplacementItem Found');
              replacementItem.visible = true;
            }
          }
        }
        item.remove();
      }
    }
  }
}

export default SketchGroup;
